/**
 * ai-core.ts — Lõi logic thuần cho pipeline AI (grounding + soạn bài + cộng đồng).
 *
 * Ràng buộc (giữ nguyên khi sửa file này):
 * - KHÔNG import fs / path / fetch toàn cục / pg. Chỉ được phép thêm `node:crypto`
 *   cho noteCacheKey, vì server.ts không thừa hưởng crypto của module này.
 * - Toàn bộ hàm bên dưới được chuyển NGUYÊN VĂN từ server.ts, không sửa logic.
 * - File này phụ thuộc `node:crypto` → chỉ dùng ở server (KHÔNG import vào client).
 */
import crypto from "node:crypto";

// ---------------------------------------------------------------------------
// CỘNG ĐỒNG — CHIẾU SAO (TÁCH RA ĐỂ TEST ĐƯỢC, KHÔNG PHỤ THUỘC FS/PG)
// ---------------------------------------------------------------------------

export interface PresetRatingRow {
  presetId: string;
  ownerKey: string;
  rating: number;
  createdAt: string;
}

export function ratingSummary(
  rows: PresetRatingRow[],
  presetId: string,
  mineKey?: string
): { avg: number; count: number; mine: number | null } {
  const filtered = rows.filter((r) => r.presetId === presetId);
  const mine = mineKey ? filtered.find((r) => r.ownerKey === mineKey) : undefined;
  const count = filtered.length;
  const avg = count
    ? Math.round((filtered.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10
    : 0;
  return { avg, count, mine: mine ? mine.rating : null };
}

// ---------------------------------------------------------------------------
// GROUNDING — LẤY NỘI DUNG THẬT TỪ LOIGIAIHAY.COM ĐỂ SOẠN BÀI BÁM SÁT
// (phần I/O — cache/fetch — vẫn nằm ở server.ts; ở đây chỉ phần thuần)
// ---------------------------------------------------------------------------

/** Lấy danh sách link bài (article) từ HTML trang môn, kèm title. */
export function extractLessonLinks(html: string): { title: string; url: string }[] {
  const out: { title: string; url: string }[] = [];
  const re = /<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const href = m[1].trim();
    if (!/^\/?.+a\d+\.html$/.test(href)) continue; // bài có article id
    if (/pdf|sgk-?van-?[0-9]+-?tap|pdf$/i.test(href)) continue; // bỏ pdf/tập
    const rawText = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!rawText || rawText.length < 4) continue;
    const url = href.startsWith("http") ? href : "https://loigiaihay.com" + (href.startsWith("/") ? href : "/" + href);
    out.push({ title: rawText, url });
  }
  // khử trùng theo url
  const seen = new Set<string>();
  return out.filter((x) => (seen.has(x.url) ? false : (seen.add(x.url), true)));
}

/** Rút nội dung chính (article/main dài nhất), bỏ nav, script, style, footer, aside. */
export function cleanArticleText(html: string): string {
  let h = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  h = h
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<aside[\s\S]*?<\/aside>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ");

  // Chọn <article> hoặc <main> DÀI NHẤT (tránh bắt nhầm article quảng cáo rỗng)
  const candidates: string[] = [];
  const addCandidates = (tag: string) => {
    const re = new RegExp(`<${tag}[\\s\\S]*?<\\/${tag}>`, "gi");
    let m: RegExpExecArray | null;
    let bestLen = 0;
    let best = "";
    while ((m = re.exec(h)) !== null) {
      if (m[0].length > bestLen) {
        bestLen = m[0].length;
        best = m[0];
      }
    }
    if (best) candidates.push(best);
  };
  addCandidates("article");
  addCandidates("main");

  let picked = candidates.sort((a, b) => b.length - a.length)[0] || h;
  const text = picked.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > 200 ? text : " " + h + " ";
}

/** Chuẩn hoá tiếng Việt để so khớp tên bài. */
export function normTitle(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// SOẠN BÀI — CẮT ĐOẠN + ĐỌC JSON TỪ LLM
// ---------------------------------------------------------------------------

export function noteCacheKey(o: {
  subject: string;
  textbook: string;
  lessonTitle: string;
  noteStyle: string;
  loigiaihaySection: string;
  detailLevel: string;
  groundUrl?: string;
}) {
  return crypto
    .createHash("sha1")
    .update(
      [o.subject, o.textbook, o.lessonTitle, o.noteStyle, o.loigiaihaySection, o.detailLevel, o.groundUrl || ""].join("|")
    )
    .digest("hex");
}

/** Cắt đoạn nguồn liên quan tới 1 mục (theo từ khoá) để tiết kiệm token. */
export function extractSectionGround(text: string, focusKeywords: string[]): string {
  const t = normTitle(text);
  let bestPos = -1;
  let bestKw = "";
  for (const kw of focusKeywords) {
    const w = normTitle(kw);
    if (!w || w.length < 3) continue;
    const pos = t.indexOf(w);
    if (pos !== -1 && (bestPos === -1 || pos < bestPos)) {
      bestPos = pos;
      bestKw = w;
    }
  }
  if (bestPos === -1) return text.slice(0, 2400);
  const start = Math.max(0, bestPos - 220);
  return text.slice(start, start + 2800);
}

export function parseLLMJson(text: string): any {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        return JSON.parse(m[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}
