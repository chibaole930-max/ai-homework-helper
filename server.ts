import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { Pool } from "pg";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PRESET_LESSON_NOTES } from "./src/data/presets";

dotenv.config();

// ---------------------------------------------------------------------------
// KHO BÀI MẪU CHIA SẺ (Community Sample Library)
// Mọi người truy cập web đều xem được và đóng góp bài mẫu, dữ liệu đồng bộ
// qua API server. Dữ liệu được lưu VĨNH VIỄN trong PostgreSQL miễn phí
// (Supabase/Neon) qua biến môi trường DATABASE_URL. Nếu chưa cấu hình
// DATABASE_URL thì tự động dùng file JSON để lưu trong cùng một lần deploy.
// ---------------------------------------------------------------------------

interface CommunityPresetItem {
  id: string;
  type: "note" | "exercise";
  title: string;
  subject: string;
  subjectId: string;
  textbook: string;
  content: string;
  date: string;
  isFavorite: boolean;
  style?: string;
  author: string;
  likes: number;
  createdAt: string;
  fromCommunity?: boolean;
}

const COMMUNITY_DATA_FILE = path.join(process.cwd(), "data", "community-presets.json");

// Kết nối Postgres nếu có DATABASE_URL (Supabase / Neon miễn phí)
function createPgPool(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return new Pool({
    connectionString: url,
    ssl: url.includes("localhost") || url.includes("127.0.0.1")
      ? false
      : { rejectUnauthorized: false },
  });
}

const pgPool = createPgPool();

function rowToPreset(row: any): CommunityPresetItem {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    subject: row.subject,
    subjectId: row.subjectId,
    textbook: row.textbook,
    content: row.content,
    date: row.date || new Date(row.createdAt).toLocaleDateString("vi-VN"),
    isFavorite: row.isFavorite,
    style: row.style || undefined,
    author: row.author,
    likes: row.likes,
    createdAt: row.createdAt instanceof Date
      ? row.createdAt.toISOString()
      : String(row.createdAt),
    fromCommunity: row.fromCommunity,
  };
}

// Tạo bảng (nếu chưa có) và seed bài mẫu mặc định lần đầu
async function ensureCommunityTable(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS community_presets (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL DEFAULT 'note',
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      "subjectId" TEXT NOT NULL,
      textbook TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT,
      "isFavorite" BOOLEAN NOT NULL DEFAULT false,
      style TEXT,
      author TEXT NOT NULL DEFAULT 'Kho Học Liệu Mẫu',
      likes INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      "fromCommunity" BOOLEAN NOT NULL DEFAULT false
    )
  `);
  // Nếu bảng đã tồn tại nhưng schema không khớp (ví dụ tên cột in thường
  // không có dấu nháy khi tạo), xóa và tạo lại cho đúng chuẩn.
  const colCheck = await pool.query(
    `SELECT 1 FROM information_schema.columns
     WHERE table_schema='public' AND table_name='community_presets'
       AND column_name = 'subjectId'`
  );
  if (colCheck.rows.length === 0) {
    const existsCheck = await pool.query(
      `SELECT 1 FROM information_schema.tables
       WHERE table_schema='public' AND table_name='community_presets'`
    );
    if (existsCheck.rows.length > 0) {
      await pool.query("DROP TABLE community_presets");
      console.log("[Community] Bảng cũ chưa đúng schema, đã xóa để tạo lại.");
    }
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS community_presets (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL DEFAULT 'note',
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      "subjectId" TEXT NOT NULL,
      textbook TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT,
      "isFavorite" BOOLEAN NOT NULL DEFAULT false,
      style TEXT,
      author TEXT NOT NULL DEFAULT 'Kho Học Liệu Mẫu',
      likes INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      "fromCommunity" BOOLEAN NOT NULL DEFAULT false
    )
  `);
  const { rows } = await pool.query(
    "SELECT COUNT(*)::int AS c FROM community_presets"
  );
  if (rows[0].c === 0) {
    for (const p of PRESET_LESSON_NOTES) {
      await pool.query(
        `INSERT INTO community_presets
           (id, type, title, subject, "subjectId", textbook, content, date, "isFavorite", style, author, likes, "fromCommunity")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,0,false)
         ON CONFLICT (id) DO NOTHING`,
        [
          p.id,
          p.type,
          p.title,
          p.subject,
          p.subjectId,
          p.textbook,
          p.content,
          p.date,
          p.isFavorite,
          p.style || null,
          "Kho Học Liệu Mẫu",
        ]
      );
    }
    console.log("[Community] Đã seed bài mẫu mặc định vào database PostgreSQL.");
  }
}

if (pgPool) {
  ensureCommunityTable(pgPool).catch((err) => {
    console.error("[Community] Lỗi khởi tạo bảng PostgreSQL:", err);
  });
  ensurePendingTable(pgPool).catch((err) => {
    console.error("[Pending] Lỗi khởi tạo bảng PostgreSQL:", err);
  });
}

async function loadAllPresets(): Promise<CommunityPresetItem[]> {
  if (pgPool) {
    const { rows } = await pgPool.query(
      'SELECT * FROM community_presets ORDER BY "createdAt" DESC'
    );
    return rows.map(rowToPreset);
  }
  // Fallback: file JSON
  try {
    if (fs.existsSync(COMMUNITY_DATA_FILE)) {
      const raw = fs.readFileSync(COMMUNITY_DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("[Community] Không đọc được dữ liệu JSON, dùng seed mặc định:", err);
  }
  return PRESET_LESSON_NOTES.map((p) => ({
    ...p,
    author: "Kho Học Liệu Mẫu",
    likes: 0,
    createdAt: new Date().toISOString(),
    fromCommunity: false,
  }));
}

async function insertPreset(item: CommunityPresetItem) {
  if (pgPool) {
    await pgPool.query(
      `INSERT INTO community_presets
         (id, type, title, subject, "subjectId", textbook, content, date, "isFavorite", style, author, likes, "fromCommunity")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,0,true)`,
      [
        item.id,
        item.type,
        item.title,
        item.subject,
        item.subjectId,
        item.textbook,
        item.content,
        item.date,
        item.isFavorite,
        item.style || null,
        item.author,
      ]
    );
    return;
  }
  // Fallback: file JSON
  let list: CommunityPresetItem[] = [];
  try {
    if (fs.existsSync(COMMUNITY_DATA_FILE)) {
      list = JSON.parse(fs.readFileSync(COMMUNITY_DATA_FILE, "utf-8"));
    }
  } catch {
    list = [];
  }
  if (!Array.isArray(list)) list = [];
  list = [item, ...list];
  fs.mkdirSync(path.dirname(COMMUNITY_DATA_FILE), { recursive: true });
  fs.writeFileSync(COMMUNITY_DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}

async function bumpLikes(id: string, liked: boolean): Promise<number | null> {
  if (pgPool) {
    const sign = liked ? 1 : -1;
    const { rows } = await pgPool.query(
      `UPDATE community_presets
         SET likes = GREATEST(0, likes + $2)
       WHERE id = $1
       RETURNING likes`,
      [id, sign]
    );
    return rows.length ? rows[0].likes : null;
  }
  // Fallback: file JSON
  try {
    const raw = fs.readFileSync(COMMUNITY_DATA_FILE, "utf-8");
    const list = JSON.parse(raw);
    const item = list.find((x: any) => x.id === id);
    if (!item) return null;
    item.likes = Math.max(0, (item.likes || 0) + (liked ? 1 : -1));
    fs.writeFileSync(COMMUNITY_DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
    return item.likes;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// BÀI MẪU CHỜ DUYỆT (pending) — tự động từ AI soạn bài, hoặc chia sẻ thủ công
// - Bài mẫu chỉ vào Kho công khai sau khi admin duyệt.
// - Lưu PostgreSQL (bảng pending_presets) hoặc file JSON fallback.
// ---------------------------------------------------------------------------

interface PendingPresetItem {
  id: string;
  type: "note" | "exercise";
  title: string;
  subject: string;
  subjectId: string;
  textbook: string;
  content: string;
  date: string;
  style?: string;
  author: string;
  source: "auto" | "manual";
  createdAt: string;
}

const PENDING_DATA_FILE = path.join(process.cwd(), "data", "pending-presets.json");

async function ensurePendingTable(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pending_presets (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL DEFAULT 'note',
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      "subjectId" TEXT NOT NULL,
      textbook TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT,
      style TEXT,
      author TEXT NOT NULL DEFAULT 'Bạn ẩn danh',
      source TEXT NOT NULL DEFAULT 'manual',
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
}

function rowToPendingPreset(row: any): PendingPresetItem {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    subject: row.subject,
    subjectId: row.subjectId,
    textbook: row.textbook,
    content: row.content,
    date: row.date || new Date(row.createdAt).toLocaleDateString("vi-VN"),
    style: row.style || undefined,
    author: row.author,
    source: row.source === "auto" ? "auto" : "manual",
    createdAt:
      row.createdAt instanceof Date
        ? row.createdAt.toISOString()
        : String(row.createdAt),
  };
}

async function loadPendingPresets(): Promise<PendingPresetItem[]> {
  if (pgPool) {
    try {
      const { rows } = await pgPool.query(
        'SELECT * FROM pending_presets ORDER BY "createdAt" DESC'
      );
      return rows.map(rowToPendingPreset);
    } catch (err) {
      console.warn("[Pending] Lỗi đọc PostgreSQL:", err);
    }
  }
  try {
    if (fs.existsSync(PENDING_DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(PENDING_DATA_FILE, "utf-8"));
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("[Pending] Không đọc được file JSON:", err);
  }
  return [];
}

async function writePendingPresets(list: PendingPresetItem[]) {
  fs.mkdirSync(path.dirname(PENDING_DATA_FILE), { recursive: true });
  fs.writeFileSync(PENDING_DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}

// Kiểm tra bài đã tồn tại chưa: "pending" | "public" | null
async function findExistingPreset(title: string, subject: string) {
  const normTitle = title.trim().toLowerCase();
  const normSubject = subject.trim();

  const pending = await loadPendingPresets();
  if (
    pending.some(
      (p) => p.title.trim().toLowerCase() === normTitle && p.subject === normSubject
    )
  ) {
    return "pending";
  }

  const pub = await loadAllPresets();
  if (
    (pub as any[]).some(
      (p) => String(p.title).trim().toLowerCase() === normTitle && p.subject === normSubject
    )
  ) {
    return "public";
  }

  return null;
}

// Thêm bài chờ duyệt (có de-duplicate). Trả về null nếu trùng.
async function insertPendingPreset(
  item: PendingPresetItem
): Promise<PendingPresetItem | null> {
  const existing = await findExistingPreset(item.title, item.subject);
  if (existing) return null;

  if (pgPool) {
    try {
      await pgPool.query(
        `INSERT INTO pending_presets
           (id, type, title, subject, "subjectId", textbook, content, date, style, author, source)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          item.id,
          item.type,
          item.title,
          item.subject,
          item.subjectId,
          item.textbook,
          item.content,
          item.date,
          item.style || null,
          item.author,
          item.source,
        ]
      );
      return item;
    } catch (err) {
      console.warn("[Pending] Lỗi ghi PostgreSQL:", err);
    }
  }
  let list = await loadPendingPresets();
  list = [item, ...list];
  await writePendingPresets(list);
  return item;
}

// Admin duyệt: chuyển bài chờ duyệt vào Kho bài mẫu công khai.
async function approvePendingPreset(id: string): Promise<boolean> {
  const list = await loadPendingPresets();
  const item = list.find((x) => x.id === id);
  if (!item) return false;

  const publicItem: CommunityPresetItem = {
    id: "community-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8),
    type: item.type,
    title: item.title,
    subject: item.subject,
    subjectId: item.subjectId,
    textbook: item.textbook,
    content: item.content,
    date: item.date,
    isFavorite: false,
    style: item.style || "standard",
    author: item.author || "Kho Học Liệu Mẫu",
    likes: 0,
    createdAt: new Date().toISOString(),
    fromCommunity: true,
  };

  await insertPreset(publicItem);

  if (pgPool) {
    try {
      await pgPool.query("DELETE FROM pending_presets WHERE id = $1", [id]);
      return true;
    } catch (err) {
      console.warn("[Pending] Lỗi xóa PostgreSQL:", err);
    }
  }
  const remaining = list.filter((x) => x.id !== id);
  await writePendingPresets(remaining);
  return true;
}

// Admin duyệt TẤT CẢ bài chờ: duyệt lần lượt từng bài. Trả về số bài đã duyệt.
async function approveAllPendingPresets(): Promise<number> {
  const list = await loadPendingPresets();
  let approved = 0;
  for (const item of list) {
    const ok = await approvePendingPreset(item.id);
    if (ok) approved++;
  }
  return approved;
}

async function rejectPendingPreset(id: string): Promise<boolean> {
  if (pgPool) {
    try {
      const { rowCount } = await pgPool.query(
        "DELETE FROM pending_presets WHERE id = $1",
        [id]
      );
      if (rowCount) return true;
    } catch (err) {
      console.warn("[Pending] Lỗi xóa PostgreSQL:", err);
    }
  }
  const list = await loadPendingPresets();
  const remaining = list.filter((x) => x.id !== id);
  await writePendingPresets(remaining);
  return true;
}

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in the environment.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Fallback chain for text/multimodal generation:
// If gemini-3.8-flash is experiencing high demand (503), fall back to gemini-flash-latest, then gemini-3.1-flash-lite
const FALLBACK_MODELS = [
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
];

function parseGeminiErrorMessage(err: any): string {
  if (!err) return "Lỗi không xác định khi kết nối với AI.";
  const rawMsg = err.message || String(err);
  try {
    const jsonMatch = rawMsg.match(/\{[\s\S]*"error"[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.error) {
        if (parsed.error.code === 503 || parsed.error.status === "UNAVAILABLE") {
          return "Mô hình AI đang có lượng truy cập tăng đột biến (Mã 503). Vui lòng thử lại sau vài giây!";
        }
        if (parsed.error.code === 429 || parsed.error.status === "RESOURCE_EXHAUSTED") {
          return "Hệ thống AI đạt giới hạn tần suất yêu cầu tạm thời. Vui lòng chờ 10-15 giây rồi thử lại!";
        }
        if (parsed.error.message) {
          return `Dịch vụ AI: ${parsed.error.message}`;
        }
      }
    }
  } catch {
    // ignore parse error
  }

  if (
    rawMsg.includes("503") ||
    rawMsg.includes("high demand") ||
    rawMsg.includes("UNAVAILABLE")
  ) {
    return "Mô hình AI đang có lượng truy cập tăng đột biến. Vui lòng bấm 'Thử lại' sau vài giây!";
  }
  if (rawMsg.includes("429") || rawMsg.includes("RESOURCE_EXHAUSTED")) {
    return "Hệ thống AI đang bận do tần suất yêu cầu cao. Vui lòng thử lại sau giây lát!";
  }

  return rawMsg;
}

async function generateContentWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
    preferredModel?: string;
  }
): Promise<GenerateContentResponse> {
  const models = params.preferredModel
    ? [params.preferredModel, ...FALLBACK_MODELS.filter((m) => m !== params.preferredModel)]
    : FALLBACK_MODELS;

  let lastError: any = null;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    const maxAttempts = 2;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`[Gemini] Requesting model ${model} (attempt ${attempt}/${maxAttempts})...`);
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });

        if (response && response.text) {
          console.log(`[Gemini] Successfully generated response with model: ${model}`);
          return response;
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        console.warn(`[Gemini] Model ${model} failed on attempt ${attempt}:`, errMsg);

        const isTemporary =
          errMsg.includes("503") ||
          errMsg.includes("UNAVAILABLE") ||
          errMsg.includes("high demand") ||
          errMsg.includes("429") ||
          errMsg.includes("RESOURCE_EXHAUSTED") ||
          errMsg.includes("fetch failed");

        if (isTemporary && attempt < maxAttempts) {
          // Exponential delay before retry
          const delayMs = attempt * 1200;
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          continue;
        }

        // If this model is unavailable, break inner loop to try next model in fallback chain
        break;
      }
    }
  }

  throw lastError || new Error("Không thể kết nối đến mô hình AI sau khi đã thử các phương án dự phòng.");
}

// ---------------------------------------------------------------------------
// GIỚI HẠN SỐ LẦN SOẠN BÀI MIỄN PHÍ (3 lượt/ngày tính theo IP)
// ---------------------------------------------------------------------------

const ONLINE_SESSIONS = new Map<string, number>();
const ONLINE_TTL_MS = 5 * 60 * 1000;

// Ghi nhận phiên truy cập mới nhất cho 1 IP rồi đếm số phiên còn trong cửa sổ
// 5 phút. Bị gọi mỗi lần client heartbeat (poll /api/online).
function touchOnlineSession(ip: string): number {
  const now = Date.now();
  if (ip && ip !== "unknown") ONLINE_SESSIONS.set(ip, now);
  for (const [k, v] of ONLINE_SESSIONS) {
    if (now - v > ONLINE_TTL_MS) ONLINE_SESSIONS.delete(k);
  }
  return ONLINE_SESSIONS.size;
}

const USAGE_LIMIT_PER_DAY = 3;
const USAGE_DATA_FILE = path.join(process.cwd(), "data", "usage.json");

function usageKey(req: express.Request): string {
  const date = new Date().toISOString().slice(0, 10);
  return `${date}|${req.ip || "unknown"}`;
}

async function readUsageCount(key: string): Promise<number> {
  if (pgPool) {
    try {
      const { rows } = await pgPool.query(
        "SELECT count FROM usage_daily WHERE usage_key = $1",
        [key]
      );
      return rows.length ? Number(rows[0].count) : 0;
    } catch (err) {
      console.warn("[Usage] Không đọc được PostgreSQL:", err);
    }
  }
  try {
    if (fs.existsSync(USAGE_DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(USAGE_DATA_FILE, "utf-8"));
      return Number(parsed[key] || 0);
    }
  } catch {
    // ignore
  }
  return 0;
}

async function incrementUsage(key: string): Promise<number> {
  if (pgPool) {
    try {
      const { rows } = await pgPool.query(
        `INSERT INTO usage_daily (usage_key, count)
         VALUES ($1, 1)
         ON CONFLICT (usage_key) DO UPDATE SET count = usage_daily.count + 1
         RETURNING count`,
        [key]
      );
      return Number(rows[0].count);
    } catch (err) {
      console.warn("[Usage] Không ghi được PostgreSQL:", err);
    }
  }
  let store: Record<string, number> = {};
  try {
    if (fs.existsSync(USAGE_DATA_FILE)) {
      store = JSON.parse(fs.readFileSync(USAGE_DATA_FILE, "utf-8"));
    }
  } catch {
    store = {};
  }
  if (typeof store !== "object" || !store) store = {};
  store[key] = Number(store[key] || 0) + 1;
  try {
    fs.mkdirSync(path.dirname(USAGE_DATA_FILE), { recursive: true });
    fs.writeFileSync(USAGE_DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Usage] Không lưu được file:", err);
  }
  return store[key];
}

async function ensureUsageTable(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usage_daily (
      usage_key TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_stats (
      stats_key TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS daily_visitors (
      day TEXT NOT NULL,
      ip TEXT NOT NULL,
      PRIMARY KEY (day, ip)
    )
  `);
}

// ---------------------------------------------------------------------------
// THỐNG KÊ SỬ DỤNG THẬT (real data từ chính các request)
// - Đếm từng sự kiện thật: soạn bài, giải bài, hỏi đáp, chia sẻ, xem web.
// - Đếm số người dùng duy nhất/ngày theo IP (chống trùng bằng PRIMARY KEY).
// - Lưu PostgreSQL (site_stats + daily_visitors) hoặc file JSON fallback.
// ---------------------------------------------------------------------------

const STATS_DATA_FILE = path.join(process.cwd(), "data", "stats.json");

const STATS_EVENTS = [
  "page_view",
  "lesson_note",
  "solve_exercise",
  "tutor_followup",
  "community_share",
] as const;
type StatEvent = (typeof STATS_EVENTS)[number];

const STATS_EVENT_LABELS: Record<StatEvent, string> = {
  page_view: "Lượt xem web",
  lesson_note: "Soạn bài AI",
  solve_exercise: "Giải bài AI",
  tutor_followup: "Hỏi đáp thêm",
  community_share: "Chia sẻ bài mẫu",
};

function statDay(): string {
  return new Date().toISOString().slice(0, 10);
}

function readStatsFile(): {
  counters: Record<string, number>;
  visitors: Record<string, string[]>;
} {
  try {
    if (fs.existsSync(STATS_DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(STATS_DATA_FILE, "utf-8"));
      return {
        counters: parsed && typeof parsed.counters === "object" ? parsed.counters : {},
        visitors: parsed && typeof parsed.visitors === "object" ? parsed.visitors : {},
      };
    }
  } catch {
    // ignore
  }
  return { counters: {}, visitors: {} };
}

function writeStatsFile(store: {
  counters: Record<string, number>;
  visitors: Record<string, string[]>;
}) {
  try {
    fs.mkdirSync(path.dirname(STATS_DATA_FILE), { recursive: true });
    fs.writeFileSync(STATS_DATA_FILE, JSON.stringify(store), "utf-8");
  } catch (err) {
    console.warn("[Stats] Không lưu được file:", err);
  }
}

// Ghi nhận 1 sự kiện thật (+ ghi người dùng theo IP nếu có request)
async function bumpStat(event: string, req?: express.Request): Promise<void> {
  const day = statDay();
  const key = `${day}|${event}`;
  const ip = req?.ip || "";

  if (pgPool) {
    try {
      await pgPool.query(
        `INSERT INTO site_stats (stats_key, count) VALUES ($1, 1)
         ON CONFLICT (stats_key) DO UPDATE SET count = site_stats.count + 1`,
        [key]
      );
    } catch (err) {
      console.warn("[Stats] Không ghi được PostgreSQL:", err);
    }
    if (ip) {
      try {
        await pgPool.query(
          "INSERT INTO daily_visitors (day, ip) VALUES ($1, $2) ON CONFLICT DO NOTHING",
          [day, ip]
        );
      } catch (err) {
        console.warn("[Stats] Không ghi được visitor PostgreSQL:", err);
      }
    }
    return;
  }

  // Fallback: file JSON
  const store = readStatsFile();
  store.counters[key] = (store.counters[key] || 0) + 1;
  if (ip) {
    const list = store.visitors[day] || (store.visitors[day] = []);
    if (!list.includes(ip)) list.push(ip);
  }
  writeStatsFile(store);
}

// Gộp dữ liệu thống kê cho trang admin
async function loadStatsOverview() {
  const today = statDay();
  const dailyKeys: string[] = [];
  const base = new Date();
  base.setHours(12, 0, 0, 0);
  for (let i = 13; i >= 0; i--) {
    const d = new Date(base.getTime() - i * 86400000);
    dailyKeys.push(d.toISOString().slice(0, 10));
  }

  let counters: Record<string, number> = {};
  let visitors: Record<string, number> = {};

  if (pgPool) {
    try {
      const { rows } = await pgPool.query("SELECT stats_key, count FROM site_stats");
      counters = {};
      for (const r of rows) counters[r.stats_key] = Number(r.count);
      const vRes = await pgPool.query(
        "SELECT day, COUNT(*)::int AS c FROM daily_visitors GROUP BY day"
      );
      visitors = {};
      for (const r of vRes.rows) visitors[r.day] = Number(r.c);
    } catch (err) {
      console.warn("[Stats] Không đọc được PostgreSQL:", err);
      counters = {};
      visitors = {};
    }
  } else {
    const store = readStatsFile();
    counters = store.counters;
    visitors = {};
    for (const [day, ips] of Object.entries(store.visitors)) {
      visitors[day] = Array.isArray(ips) ? ips.length : Number(ips) || 0;
    }
  }

  const totals: Record<string, number> = {};
  let totalUniqueVisitors = 0;
  for (const ev of STATS_EVENTS) totals[ev] = 0;
  for (const [k, v] of Object.entries(counters)) {
    const ev = k.split("|")[1] as StatEvent;
    if (ev && ev in totals) totals[ev] += v;
  }
  const daily = dailyKeys.map((day) => {
    const per: Record<string, number> = {};
    for (const ev of STATS_EVENTS) {
      per[ev] = counters[`${day}|${ev}`] || 0;
      totalUniqueVisitors += visitors[day] || 0;
    }
    return { day, events: per, uniqueVisitors: visitors[day] || 0 };
  });

  const todayEvents: Record<string, number> = {};
  for (const ev of STATS_EVENTS) todayEvents[ev] = counters[`${today}|${ev}`] || 0;

  return {
    today,
    todayEvents,
    uniqueToday: visitors[today] || 0,
    totals,
    daily,
  };
}

// ---------------------------------------------------------------------------
// CÀI ĐẶT TRANG / TRANG ADMIN (bảo trì + gửi thông báo)
// - Đăng nhập admin bằng mật khẩu từ biến môi trường ADMIN_PASSWORD.
// - Chế độ bảo trì: khóa các API AI (503), người dùng thấy màn hình bảo trì.
// - Thông báo: banner toàn trang cho học sinh (có nút đóng ở frontend).
// - Lưu vĩnh viễn trong PostgreSQL (bảng site_settings) hoặc file JSON fallback.
// ---------------------------------------------------------------------------

const SITE_SETTINGS_FILE = path.join(process.cwd(), "data", "site-settings.json");

interface SiteSettings {
  maintenance: { enabled: boolean; message: string };
  announcement: { enabled: boolean; text: string };
  donate: { enabled: boolean; qrImage: string; note: string };
}

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  maintenance: { enabled: false, message: "" },
  announcement: { enabled: false, text: "" },
  donate: { enabled: false, qrImage: "", note: "" },
};

let cachedSiteSettings: SiteSettings | null = null;

async function readSiteSettings(): Promise<SiteSettings> {
  if (cachedSiteSettings) return cachedSiteSettings;
  if (pgPool) {
    try {
      const { rows } = await pgPool.query(
        "SELECT value FROM site_settings WHERE key = $1",
        ["site"]
      );
      if (rows.length) {
        const parsed = JSON.parse(rows[0].value);
        cachedSiteSettings = {
          maintenance: {
            enabled: !!parsed.maintenance?.enabled,
            message: String(parsed.maintenance?.message || ""),
          },
          announcement: {
            enabled: !!parsed.announcement?.enabled,
            text: String(parsed.announcement?.text || ""),
          },
          donate: {
            enabled: !!parsed.donate?.enabled,
            qrImage: String(parsed.donate?.qrImage || ""),
            note: String(parsed.donate?.note || ""),
          },
        };
        return cachedSiteSettings;
      }
    } catch (err) {
      console.warn("[Admin] Không đọc được PostgreSQL:", err);
    }
  }
  try {
    if (fs.existsSync(SITE_SETTINGS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(SITE_SETTINGS_FILE, "utf-8"));
      cachedSiteSettings = {
        maintenance: {
          enabled: !!parsed.maintenance?.enabled,
          message: String(parsed.maintenance?.message || ""),
        },
        announcement: {
          enabled: !!parsed.announcement?.enabled,
          text: String(parsed.announcement?.text || ""),
        },
        donate: {
          enabled: !!parsed.donate?.enabled,
          qrImage: String(parsed.donate?.qrImage || ""),
          note: String(parsed.donate?.note || ""),
        },
      };
      return cachedSiteSettings;
    }
  } catch {
    // ignore
  }
  cachedSiteSettings = {
    maintenance: { enabled: false, message: "" },
    announcement: { enabled: false, text: "" },
    donate: { enabled: false, qrImage: "", note: "" },
  };
  return cachedSiteSettings;
}

async function writeSiteSettings(settings: SiteSettings) {
  cachedSiteSettings = settings;
  const raw = JSON.stringify(settings);
  if (pgPool) {
    try {
      await pgPool.query(
        `INSERT INTO site_settings (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
        ["site", raw]
      );
      return;
    } catch (err) {
      console.warn("[Admin] Không ghi được PostgreSQL:", err);
    }
  }
  try {
    fs.mkdirSync(path.dirname(SITE_SETTINGS_FILE), { recursive: true });
    fs.writeFileSync(SITE_SETTINGS_FILE, raw, "utf-8");
  } catch (err) {
    console.warn("[Admin] Không lưu được file:", err);
  }
}

async function getMaintenanceMessage(): Promise<string> {
  const s = await readSiteSettings();
  return s.maintenance.enabled ? s.maintenance.message : "";
}

const adminTokens = new Map<string, number>();
const ADMIN_TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

function isAdminTokenValid(token: string): boolean {
  const exp = adminTokens.get(token);
  if (!exp) return false;
  if (Date.now() > exp) {
    adminTokens.delete(token);
    return false;
  }
  return true;
}

function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || !isAdminTokenValid(token)) {
    return res.status(401).json({ error: "Chưa đăng nhập hoặc phiên đăng nhập đã hết hạn." });
  }
  (req as any).adminToken = token;
  next();
}

if (pgPool) {
  ensureUsageTable(pgPool).catch((err) => {
    console.error("[Usage] Lỗi khởi tạo bảng usage_daily:", err);
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Render chạy sau proxy CDN/LB nên bật trust proxy để lấy đúng IP người dùng
  app.set("trust proxy", true);

  // Increase payload limit for base64 image uploads of homework photos
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API: Trạng thái lượt soạn bài miễn phí hôm nay (theo IP)
  app.get("/api/usage/status", async (req, res) => {
    try {
      const used = await readUsageCount(usageKey(req));
      res.json({
        limit: USAGE_LIMIT_PER_DAY,
        used,
        remaining: Math.max(0, USAGE_LIMIT_PER_DAY - used),
        date: new Date().toISOString().slice(0, 10),
      });
    } catch (err: any) {
      console.error("Error reading usage:", err);
      res.status(500).json({ error: "Không đọc được trạng thái lượt soạn bài." });
    }
  });

  // API: Số người đang online (theo phiên truy cập ~5 phút, heartbeat)
  app.get("/api/online", (req, res) => {
    try {
      const online = touchOnlineSession(req.ip || "");
      res.json({ online, windowMinutes: ONLINE_TTL_MS / 60000 });
    } catch (err: any) {
      console.error("Error reading online count:", err);
      res.status(500).json({ error: "Không đọc được số người online." });
    }
  });

  // API: Trạng thái công khai (thông báo + bảo trì) — không cần đăng nhập
  app.get("/api/site/status", async (_req, res) => {
    try {
      const settings = await readSiteSettings();
      res.json({
        maintenance: settings.maintenance,
        announcement: settings.announcement,
        donate: settings.donate,
        now: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Error reading site status:", err);
      res.status(500).json({ error: "Không đọc được trạng thái trang." });
    }
  });

  // API: Ghi nhận sự kiện sử dụng thật (chỉ cho phép page_view — các sự kiện
  // AI khác được đếm trực tiếp phía server, không cho phía client sửa được)
  app.post("/api/stats/event", async (req, res) => {
    try {
      const ev = String(req.body?.event || "");
      if (ev !== "page_view") {
        return res.status(400).json({ error: "Loại thống kê không hợp lệ." });
      }
      await bumpStat(ev, req);
      res.json({ ok: true });
    } catch (err: any) {
      console.error("Error recording stat event:", err);
      res.status(500).json({ error: "Không ghi được thống kê." });
    }
  });

  // API: Đăng nhập admin
  app.post("/api/admin/login", async (req, res) => {
    try {
      if (!process.env.ADMIN_PASSWORD) {
        return res.status(503).json({
          error: "Chưa cấu hình ADMIN_PASSWORD trên server (biến môi trường).",
        });
      }
      const { password } = req.body || {};
      if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Sai mật khẩu quản trị." });
      }
      const token = crypto.randomBytes(24).toString("hex");
      adminTokens.set(token, Date.now() + ADMIN_TOKEN_TTL_MS);
      res.json({ token, expiresIn: ADMIN_TOKEN_TTL_MS });
    } catch (err: any) {
      console.error("Admin login error:", err);
      res.status(500).json({ error: "Lỗi đăng nhập." });
    }
  });

  // API: Đăng xuất admin
  app.post("/api/admin/logout", requireAdmin, (req, res) => {
    adminTokens.delete((req as any).adminToken);
    res.json({ ok: true });
  });

  // API: Xem cài đặt (admin)
  app.get("/api/admin/settings", requireAdmin, async (_req, res) => {
    try {
      res.json(await readSiteSettings());
    } catch (err: any) {
      console.error("Error reading admin settings:", err);
      res.status(500).json({ error: "Không đọc được cài đặt." });
    }
  });

  // API: Cập nhật cài đặt (admin)
  app.post("/api/admin/settings", requireAdmin, async (req, res) => {
    try {
      const { maintenance, announcement, donate } = req.body || {};
      const current = await readSiteSettings();
      const rawQr = String(donate?.qrImage ?? current.donate.qrImage).trim();
      const next: SiteSettings = {
        maintenance: {
          enabled:
            maintenance?.enabled === undefined
              ? current.maintenance.enabled
              : !!maintenance.enabled,
          message: String(maintenance?.message ?? current.maintenance.message).slice(0, 500),
        },
        announcement: {
          enabled:
            announcement?.enabled === undefined
              ? current.announcement.enabled
              : !!announcement.enabled,
          text: String(announcement?.text ?? current.announcement.text).slice(0, 2000),
        },
        donate: {
          enabled:
            donate?.enabled === undefined ? current.donate.enabled : !!donate.enabled,
          qrImage:
            rawQr && (rawQr.startsWith("data:image/") || rawQr.startsWith("https://") || rawQr.startsWith("/"))
              ? rawQr.slice(0, 3000000)
              : "",
          note: String(donate?.note ?? current.donate.note).slice(0, 500),
        },
      };
      await writeSiteSettings(next);
      res.json(next);
    } catch (err: any) {
      console.error("Admin update failed:", err);
      res.status(500).json({ error: "Không lưu được cài đặt." });
    }
  });

  // API: Thống kê sử dụng thật (admin)
  app.get("/api/admin/stats", requireAdmin, async (_req, res) => {
    try {
      res.json(await loadStatsOverview());
    } catch (err: any) {
      console.error("Error loading stats:", err);
      res.status(500).json({ error: "Không tải được thống kê." });
    }
  });

  // API: Danh sách bài mẫu chờ duyệt (admin)
  app.get("/api/admin/pending", requireAdmin, async (_req, res) => {
    try {
      const items = await loadPendingPresets();
      res.json({ items, total: items.length });
    } catch (err: any) {
      console.error("Error loading pending presets:", err);
      res.status(500).json({ error: "Không tải được danh sách chờ duyệt." });
    }
  });

  // API: Duyệt TẤT CẢ bài mẫu chờ (admin) — đặt trước route :id để không bị nuốt
  app.post("/api/admin/pending/approve-all", requireAdmin, async (_req, res) => {
    try {
      const approved = await approveAllPendingPresets();
      const items = await loadPendingPresets();
      res.json({
        ok: true,
        message: `Đã duyệt tất cả ${approved} bài mẫu vào Kho chung.`,
        items,
        total: items.length,
        approved,
      });
    } catch (err: any) {
      console.error("Error approving all pending presets:", err);
      res.status(500).json({ error: "Không duyệt được toàn bộ bài mẫu." });
    }
  });

  // API: Duyệt bài mẫu -> đưa vào Kho cộng đồng (admin)
  app.post("/api/admin/pending/:id/approve", requireAdmin, async (req, res) => {
    try {
      const ok = await approvePendingPreset(req.params.id);
      if (!ok) {
        return res.status(404).json({ error: "Không tìm thấy bài chờ duyệt." });
      }
      const items = await loadPendingPresets();
      res.json({ ok: true, message: "Đã duyệt và đưa bài mẫu vào Kho chung.", items, total: items.length });
    } catch (err: any) {
      console.error("Error approving pending preset:", err);
      res.status(500).json({ error: "Không duyệt được bài mẫu." });
    }
  });

  // API: Bỏ qua bài mẫu chờ duyệt (admin)
  app.post("/api/admin/pending/:id/reject", requireAdmin, async (req, res) => {
    try {
      await rejectPendingPreset(req.params.id);
      const items = await loadPendingPresets();
      res.json({ ok: true, message: "Đã bỏ bài mẫu này.", items, total: items.length });
    } catch (err: any) {
      console.error("Error rejecting pending preset:", err);
      res.status(500).json({ error: "Không bỏ được bài mẫu." });
    }
  });

  // API: Soạn bài ghi Lớp 12 (Bám sát nguồn & phong cách Lời Giải Hay - loigiaihay.com)
  app.post("/api/lesson-note", async (req, res) => {
    try {
      const {
        subject,
        subjectId,
        textbook,
        lessonTitle,
        noteStyle = "loigiaihay_full",
        loigiaihaySection = "all",
        detailLevel = "standard",
        customNote = "",
        sourceUrl = "",
        grade,
      } = req.body;

      const gradeLabel = grade ? `Lớp ${grade}` : "Lớp 12";

      if (!subject || !lessonTitle) {
        return res.status(400).json({ error: "Thiếu thông tin môn học hoặc tên bài học." });
      }

      // Chế độ bảo trì: khóa AI
      const maintenanceMsg = await getMaintenanceMessage();
      if (maintenanceMsg) {
        return res.status(503).json({ error: `Hệ thống đang bảo trì: ${maintenanceMsg}` });
      }

      // Giới hạn lượt soạn bài miễn phí: 3 lượt/ngày theo IP
      const usageKeyForReq = usageKey(req);
      const used = await readUsageCount(usageKeyForReq);
      if (used >= USAGE_LIMIT_PER_DAY) {
        return res.status(429).json({
          error: `Bạn đã dùng hết ${USAGE_LIMIT_PER_DAY} lượt soạn bài miễn phí hôm nay. Hạn mức sẽ tự reset vào ngày mai.`,
          usage: { limit: USAGE_LIMIT_PER_DAY, used, remaining: 0 },
        });
      }

      const ai = getGeminiClient();

      const systemInstruction = `Bạn là chuyên gia sư phạm THPT hàng đầu Việt Nam, bám sát hệ thống học liệu và phong cách sư phạm chuẩn mực của Lời Giải Hay (loigiaihay.com) dành cho học sinh ${gradeLabel} theo Chương trình Giáo dục Phổ thông mới (GDPT 2018 - bộ sách Kết nối tri thức với cuộc sống, Cánh diều, Chân trời sáng tạo) và định hướng thi Tốt nghiệp THPT & Đánh giá năng lực.
Phong cách Lời Giải Hay (loigiaihay.com) đặc trưng bởi:
- Bám sát chặt chẽ sách giáo khoa (SGK) và sách bài tập (SBT) của từng bộ sách.
- Trình bày bài học rõ ràng, sư phạm, chuẩn mực. Mỗi mục câu hỏi luôn có cấu trúc:
  + "Đề bài / Câu hỏi" (Trích dẫn đúng câu hỏi trong SGK/SBT: Khởi động, Hoạt động khám phá, Thảo luận, Luyện tập, Vận dụng, Bài tập cuối bài 1.1, 1.2...)
  + "Phương pháp giải" (Chỉ rõ định lý, tính chất, công thức áp dụng và hướng tư duy)
  + "Lời giải chi tiết" (Từng bước suy luận chặt chẽ, mạch lạc, chính xác tuyệt đối, dễ hiểu cho mọi đối tượng học sinh)
  + "Đáp số / Kết luận" (Ngắn gọn, chuẩn xác)
- Luôn có hộp mẹo nhớ, lời khuyên và cảnh báo bẫy sai lầm hay gặp trong bài kiểm tra và đề thi THPT Quốc gia.
- QUY TẮC ĐỊNH DẠNG KÝ HIỆU ĐỘ, ĐƠN VỊ & TOÁN HỌC (RẤT QUAN TRỌNG):
  + Đối với Địa lí, Lịch sử, Văn học, GD-KTPL: Viết toàn bộ văn bản, phân tích và số liệu bằng tiếng Việt tự nhiên thông thường.
  + TUYỆT ĐỐI KHÔNG dùng dấu $...$ hay lệnh LaTeX \\text{...} cho câu văn hoặc từ ngữ tiếng Việt.
  + Số liệu thống kê, đơn vị đo lường (ví dụ: 1 500 - 2 000 mm/năm, độ ẩm > 80%, diện tích 331 212 km², dân số 100 triệu người): VIẾT BẰNG VĂN BẢN BÌNH THƯỜNG, TUYỆT ĐỐI KHÔNG đặt trong dấu $...$.
  + Tọa độ địa lí: Ghi bằng ký hiệu Unicode chuẩn đẹp mắt: 23°23'B (hoặc 23°23' Bắc), 102°09'Đ (hoặc 102°09' Đông), 8°34'B, 109°28'Đ. Không viết $23^\\circ 23'B$.
  + Nhiệt độ, góc: Viết 25°C, 100°C, góc 60°, 90°.
  + Chỉ dùng dấu $...$ duy nhất cho công thức TOÁN HỌC, VẬT LÝ, HÓA HỌC thực sự (ví dụ: $f'(x) = 3x^2$, $\\int_0^1 x dx$).`;

      let promptGoal = "";
      if (noteStyle === "loigiaihay_full" || noteStyle === "standard") {
        promptGoal = `Soạn bài học ĐẦY ĐỦ CHUẨN LỜI GIẢI HAY (loigiaihay.com) bao gồm:
1. 📘 TÓM TẮT LÝ THUYẾT TRỌNG TÂM:
   - Các mục I, II, III... Định nghĩa, định lý, tính chất, công thức quan trọng, phản ứng hóa học hoặc văn bản văn học.
   - Bảng tổng hợp công thức & ví dụ minh họa kinh điển.
2. ❓ HƯỚNG DẪN TRẢ LỜI CÂU HỎI & HOẠT ĐỘNG GIỮA BÀI (SGK):
   - Mở đầu / Khởi động: Đề bài -> Phương pháp giải -> Lời giải chi tiết.
   - Hoạt động khám phá & Câu hỏi thảo luận trong bài.
   - Luyện tập 1, 2... & Vận dụng 1, 2... (Phương pháp giải -> Lời giải chi tiết).
3. 📝 HƯỚNG DẪN GIẢI BÀI TẬP CUỐI BÀI (SGK & SBT):
   - Trích dẫn các bài tập cuối bài đặc trưng (Bài 1.1, 1.2, 1.3... theo chuẩn bộ sách ${textbook || "Kết nối tri thức"}).
   - Mỗi bài đều có: Đề bài -> Phương pháp giải -> Lời giải chi tiết -> Đáp án.
4. 💡 GHI NHỚ & MẸO LÀM BÀI (Lời Giải Hay Tips):
   - Bẫy đề thi hay gặp, lưu ý quan trọng để không mất điểm.`;
      } else if (noteStyle === "sgk_exercises") {
        promptGoal = `Chuyên mục GIẢI BÀI TẬP CUỐI BÀI SGK & SBT CHUẨN LỜI GIẢI HAY (loigiaihay.com):
- Trình bày lần lượt toàn bộ các bài tập cuối bài học trong SGK và Sách bài tập (SBT) của bộ sách ${textbook || "Kết nối tri thức"}.
- Định dạng từng bài:
  ### Bài [số bài] (SGK/SBT trang ...)
  - **Đề bài**: [Đề bài đầy đủ]
  - **Phương pháp giải**: [Nêu rõ công thức, định lý, cách tiếp cận]
  - **Lời giải chi tiết**: [Trình bày từng bước chuẩn xác, biến đổi công thức rõ ràng]
  - **Kết luận / Đáp số**: [Đáp án]`;
      } else if (noteStyle === "mindmap") {
        promptGoal = `Soạn bài học theo dạng SƠ ĐỒ TƯ DUY & HỆ THỐNG LOGIC CHUẨN HỌC LIỆU LỜI GIẢI HAY:
- Cây sơ đồ phân nhánh Markdown logic từ khóa chính đến các nhánh cấp 1, cấp 2, cấp 3.
- Bảng ma trận kiến thức so sánh các khái niệm.
- Mẹo ghi nhớ siêu tốc và liên hệ thực tiễn.`;
      } else if (noteStyle === "formula_summary") {
        promptGoal = `Soạn SỔ TAY CÔNG THỨC & GHI NHỚ CẤP TỐC (THEO NGUỒN LOIGIAIHAY):
- Toàn bộ công thức toán/lý/hóa/sinh/anh, bảng từ vựng hoặc mốc thời gian lịch sử quan trọng nhất.
- Ý nghĩa các đại lượng, đơn vị đo, điều kiện áp dụng.
- Công thức tính nhanh cho hình thức thi trắc nghiệm THPT.
- Bẫy trắc nghiệm và sai lầm thường gặp.`;
      } else if (noteStyle === "exam_prep") {
        promptGoal = `Soạn BỘ CÂU HỎI TRỌNG TÂM & ÔN THI TỐT NGHIỆP THPT (THEO LOIGIAIHAY.COM):
- Phân tích cấu trúc dạng bài trong đề thi Tốt nghiệp THPT mới (GDPT 2018).
- Bộ câu hỏi trắc nghiệm gồm: 4 câu trắc nghiệm nhiều lựa chọn, 1 câu trắc nghiệm Đúng/Sai (4 ý a, b, c, d), 1 câu trả lời ngắn.
- Lời giải chi tiết chuẩn phong cách Lời Giải Hay (có phương pháp giải, giải thích cặn kẽ tại sao đúng/sai).`;
      }

      // If specific Loigiaihay section was requested
      let sectionFilter = "";
      if (loigiaihaySection === "theory") {
        sectionFilter = "\n[YÊU CẦU ĐẶC BIỆT: Tập trung sâu vào phần TÓM TẮT LÝ THUYẾT VÀ BẢNG CÔNG THỨC]";
      } else if (loigiaihaySection === "activities") {
        sectionFilter = "\n[YÊU CẦU ĐẶC BIỆT: Tập trung giải chi tiết các CÂU HỎI KHỞI ĐỘNG, HOẠT ĐỘNG KHÁM PHÁ và CÂU HỎI THẢO LUẬN giữa bài trong SGK]";
      } else if (loigiaihaySection === "practice") {
        sectionFilter = "\n[YÊU CẦU ĐẶC BIỆT: Tập trung giải chi tiết các câu LUYỆN TẬP và VẬN DỤNG trong bài]";
      } else if (loigiaihaySection === "exercises_sgk") {
        sectionFilter = "\n[YÊU CẦU ĐẶC BIỆT: Tập trung giải trọn vẹn BÀI TẬP CUỐI BÀI TRONG SGK]";
      } else if (loigiaihaySection === "exercises_sbt") {
        sectionFilter = "\n[YÊU CẦU ĐẶC BIỆT: Tập trung giải trọn vẹn BÀI TẬP TRONG SÁCH BÀI TẬP (SBT)]";
      }

      const prompt = `YÊU CẦU SOẠN BÀI ${gradeLabel.toUpperCase()} THEO NGUỒN VÀ CHUẨN LỜI GIẢI HAY (loigiaihay.com):
- Môn học: ${subject}
- Khối lớp: ${gradeLabel}
- Bộ sách giáo khoa: ${textbook || "Kết nối tri thức với cuộc sống"}
- Nguồn chính thức bám sát (trang chủ môn học trên loigiaihay.com): ${sourceUrl || "https://loigiaihay.com/"}
- Tên bài học / Chủ đề: "${lessonTitle}"
- Phong cách soạn bài: ${noteStyle}
- Chuyên mục yêu cầu: ${loigiaihaySection}
- Mức độ chi tiết: ${detailLevel} (basic: ngắn gọn trọng tâm, standard: đầy đủ chuẩn SGK/SBT, advanced: nâng cao ôn thi đại học)
${customNote ? `- Yêu cầu bổ sung của học sinh: "${customNote}"` : ""}
${sectionFilter}

${promptGoal}

Hãy trả về bài soạn đầy đủ theo đúng phong cách sư phạm chuẩn mực của Lời Giải Hay (loigiaihay.com), trình bày bằng Markdown rõ ràng, đẹp mắt, chia các đề mục rành mạch, dùng ký hiệu khoa học / công thức toán học chuẩn xác, dễ đọc trên cả điện thoại và máy tính.`;

      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.35,
        },
      });

      const content = response.text || "Không tạo được nội dung bài học. Vui lòng thử lại.";
      await incrementUsage(usageKeyForReq);
      await bumpStat("lesson_note", req).catch(() => {});

      // Tự động đề xuất bài mẫu chờ admin duyệt (không làm hỏng response nếu lỗi)
      if (content.length > 50 && content !== "Không tạo được nội dung bài học. Vui lòng thử lại.") {
        try {
          await insertPendingPreset({
            id: "pending-auto-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8),
            type: "note",
            title: String(lessonTitle).trim().slice(0, 150),
            subject: String(subject).trim(),
            subjectId: String(subjectId || "").trim(),
            textbook: textbook ? String(textbook).trim() : "Kết nối tri thức với cuộc sống",
            content: content.slice(0, 20000),
            date: new Date().toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            style: noteStyle || "standard",
            author: "Bản soạn tự động",
            source: "auto",
            createdAt: new Date().toISOString(),
          });
        } catch (err: any) {
          console.warn("[Pending] Không tự động đề xuất được bài mẫu:", err);
        }
      }

      res.json({ result: content });
    } catch (err: any) {
      console.error("Error generating lesson note:", err);
      const friendlyMsg = parseGeminiErrorMessage(err);
      res.status(500).json({
        error: friendlyMsg,
      });
    }
  });

  // API: Giải bài tập Lớp 12 (Chuẩn Lời Giải Hay - loigiaihay.com)
  app.post("/api/solve-exercise", async (req, res) => {
    try {
      const {
        subject,
        textbook,
        problemText,
        imageBase64,
        mimeType = "image/jpeg",
        problemType = "auto",
        solutionDepth = "detailed",
        sourceUrl = "",
        grade,
      } = req.body;

      const gradeLabel = grade ? `Lớp ${grade}` : "Lớp 12";

      if (!problemText && !imageBase64) {
        return res.status(400).json({ error: "Vui lòng nhập đề bài hoặc tải ảnh chụp bài tập." });
      }

      // Chế độ bảo trì: khóa AI
      const maintenanceMsg = await getMaintenanceMessage();
      if (maintenanceMsg) {
        return res.status(503).json({ error: `Hệ thống đang bảo trì: ${maintenanceMsg}` });
      }

      const ai = getGeminiClient();

      const systemInstruction = `Bạn là chuyên gia giải bài tập và gia sư hàng đầu theo chuẩn học liệu Lời Giải Hay (loigiaihay.com) cho học sinh ${gradeLabel} tại Việt Nam.
Mọi lời giải bài tập (SGK, SBT, đề kiểm tra, đề thi thử THPT) phải tuân thủ chuẩn mực sư phạm của Lời Giải Hay:
- Văn phong: Mạch lạc, chuẩn mực, ân cần, định hướng tư duy tự học.
- Cấu trúc lời giải chuẩn mực 5 bước của Lời Giải Hay:
  1. 📌 TÓM TẮT ĐỀ BÀI & PHÂN LOẠI DẠNG TOÁN (Giả thiết, kết luận, dạng bài)
  2. 💡 PHƯƠNG PHÁP GIẢI (Nêu rõ định lý, công thức mấu chốt, dấu hiệu nhận biết)
  3. 📝 LỜI GIẢI CHI TIẾT TỪNG BƯỚC (Trình bày suy luận toán học/khoa học mạch lạc, không nhảy cóc bước tính, phân tích rõ đúng/sai nếu là trắc nghiệm)
  4. 🎯 KẾT LUẬN / ĐÁP SỐ CUỐI CÙNG (Rõ ràng, nổi bật)
  5. ⚠️ LƯU Ý & MẸO LÀM BÀI (Các bẫy đề thi hay gặp, mẹo bấm máy tính Casio nếu có, phương pháp kiểm tra lại đáp số)
  6. 🚀 1 BÀI TẬP TƯƠNG TỰ (kèm đáp số ngắn để học sinh tự luyện)
- ĐỊNH DẠNG KÝ HIỆU:
  + Tọa độ địa lí / góc / nhiệt độ: ghi rõ dạng 23°23'B (hoặc 23°23' Bắc), 102°09'Đ, 8°34'B, 109°28'Đ, 25°C, 60°, không dùng ký hiệu LaTeX thô gây lỗi hiển thị.
  + Công thức Toán, Lý, Hóa: dùng ký hiệu chuẩn LaTeX trong cặp dấu $...$ rõ ràng.`;

      let depthGuide = "";
      if (solutionDepth === "hint_only") {
        depthGuide = `CHẾ ĐỘ HƯỚNG DẪN / GỢI Ý (Không đưa đáp số ngay): Đưa ra các gợi ý từng bước, phương pháp giải, công thức cần áp dụng và câu hỏi dẫn dắt để học sinh tự làm tiếp.`;
      } else if (solutionDepth === "quick") {
        depthGuide = `CHẾ ĐỘ GIẢI NHANH: Nêu trực tiếp đáp án chính xác kèm tóm tắt lời giải ngắn gọn súc tích trong 3-5 dòng theo đúng trọng tâm.`;
      } else {
        depthGuide = `CHẾ ĐỘ LỜI GIẢI HAY CHI TIẾT (CHUẨN LOIGIAIHAY.COM):
1. 📌 TÓM TẮT ĐỀ BÀI & DẠNG TOÁN
2. 💡 PHƯƠNG PHÁP GIẢI (Công thức, định lý cốt lõi)
3. 📝 LỜI GIẢI CHI TIẾT TỪNG BƯỚC
4. ✅ KẾT LUẬN / ĐÁP SỐ
5. ⚠️ BẪY ĐỀ THI & LỜI KHUYÊN (Tips)
6. 🎯 1 CÂU HỎI TƯƠNG TỰ ĐỂ TỰ LUYỆN (kèm đáp án nhanh)`;
      }

      const promptTextParts: string[] = [
        `YÊU CẦU GIẢI BÀI TẬP ${gradeLabel.toUpperCase()} THEO CHUẨN LỜI GIẢI HAY (loigiaihay.com):`,
        `- Môn học: ${subject || "Tự động nhận diện"}`,
        `- Khối lớp: ${gradeLabel}`,
        textbook ? `- Bộ sách: ${textbook}` : "",
        sourceUrl
          ? `- Nguồn chính thức bám sát (trang chủ môn học trên loigiaihay.com): ${sourceUrl}`
          : "",
        problemType !== "auto" ? `- Dạng câu hỏi: ${problemType}` : "",
        `\n${depthGuide}\n`,
      ];

      if (problemText) {
        promptTextParts.push(`ĐỀ BÀI ĐÃ NHẬP:\n"""\n${problemText}\n"""`);
      }

      if (imageBase64) {
        promptTextParts.push(`(Hình ảnh bài tập đính kèm bên dưới. Hãy đọc kỹ toàn bộ chữ, hình vẽ, đồ thị trong ảnh để giải trọn vẹn)`);
      }

      const contentsList: any[] = [];
      if (imageBase64) {
        const cleanBase64 = imageBase64.includes("base64,")
          ? imageBase64.split("base64,")[1]
          : imageBase64;

        contentsList.push({
          inlineData: {
            mimeType: mimeType || "image/jpeg",
            data: cleanBase64,
          },
        });
      }

      contentsList.push({
        text: promptTextParts.filter(Boolean).join("\n"),
      });

      const payloadContents =
        contentsList.length === 1 && contentsList[0].text
          ? contentsList[0].text
          : { parts: contentsList };

      const response = await generateContentWithFallback(ai, {
        contents: payloadContents,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });

      const solution = response.text || "Không thể giải bài tập này. Vui lòng kiểm tra lại ảnh hoặc đề bài.";
      await bumpStat("solve_exercise", req).catch(() => {});
      res.json({ result: solution });
    } catch (err: any) {
      console.error("Error solving exercise:", err);
      const friendlyMsg = parseGeminiErrorMessage(err);
      res.status(500).json({
        error: friendlyMsg,
      });
    }
  });

  // API: Hỏi đáp mở rộng với Gia Sư AI về lời giải vừa có
  app.post("/api/tutor-followup", async (req, res) => {
    try {
      const { subject, originalProblem, solution, userQuestion, grade } = req.body;

      if (!userQuestion) {
        return res.status(400).json({ error: "Thiếu câu hỏi thắc mắc." });
      }

      const gradeLabel = grade ? `Lớp ${grade}` : "Lớp 12";

      const ai = getGeminiClient();

      const systemInstruction = `Bạn là gia sư hỗ trợ học tập ${gradeLabel}. Học sinh đang xem lời giải của một bài tập và có thắc mắc thêm. Hãy trả lời thật dễ hiểu, kiên nhẫn, phân tích đúng trọng tâm câu hỏi của học sinh, đưa ra ví dụ trực quan nếu cần.`;

      const prompt = `BỐI CẢNH BÀI TẬP:
- Môn: ${subject || gradeLabel}
- Khối lớp: ${gradeLabel}
- Đề bài gốc: ${originalProblem ? `"${originalProblem.slice(0, 1000)}"` : "(Hình ảnh / Đề bài trước)"}
- Lời giải hiện tại: ${solution ? `"${solution.slice(0, 1500)}..."` : "Đã có lời giải trước"}

CÂU HỎI THẮC MẮC CỦA HỌC SINH:
"${userQuestion}"

Hãy giải đáp cặn kẽ và ngắn gọn, truyền cảm hứng giúp học sinh hiểu sâu bản chất vấn đề.`;

      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      await bumpStat("tutor_followup", req).catch(() => {});
      res.json({ result: response.text || "Xin lỗi, hiện chưa thể trả lời câu hỏi này." });
    } catch (err: any) {
      console.error("Error in tutor followup:", err);
      const friendlyMsg = parseGeminiErrorMessage(err);
      res.status(500).json({
        error: friendlyMsg,
      });
    }
  });

  // API: Danh sách bài mẫu chia sẻ (đồng bộ mọi người dùng)
  app.get("/api/community/presets", async (_req, res) => {
    try {
      const items = await loadAllPresets();
      res.json({
        items,
        total: items.length,
        syncedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Error loading community presets:", err);
      res.status(500).json({ error: "Không tải được kho bài mẫu." });
    }
  });

  // API: Đóng góp bài mẫu mới vào kho chung
  app.post("/api/community/presets", async (req, res) => {
    try {
      const {
        subject,
        subjectId,
        textbook,
        title,
        content,
        style,
        author,
        type = "note",
      } = req.body || {};

      if (!title || !content || !subject) {
        return res.status(400).json({
          error: "Thiếu thông tin bài mẫu (cần có tên bài, môn học và nội dung).",
        });
      }

      // Chế độ bảo trì: khóa đóng góp bài mẫu
      const maintenanceMsg = await getMaintenanceMessage();
      if (maintenanceMsg) {
        return res.status(503).json({ error: `Hệ thống đang bảo trì: ${maintenanceMsg}` });
      }

      const newItem: PendingPresetItem = {
        id: "pending-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8),
        type: type === "exercise" ? "exercise" : "note",
        title: String(title).trim().slice(0, 150),
        subject: String(subject).trim(),
        subjectId: String(subjectId || "").trim(),
        textbook: String(textbook || "Kết nối tri thức với cuộc sống").trim(),
        content: String(content).slice(0, 20000),
        date: new Date().toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        style: style || "standard",
        author: String(author || "Bạn ẩn danh").trim().slice(0, 60),
        source: "manual",
        createdAt: new Date().toISOString(),
      };

      const existing = await findExistingPreset(newItem.title, newItem.subject);
      if (existing) {
        return res.status(409).json({
          error:
            existing === "pending"
              ? "Bài học này đã nằm trong hàng chờ duyệt rồi."
              : "Bài học này đã có sẵn trong Kho bài mẫu.",
        });
      }

      const saved = await insertPendingPreset(newItem);
      await bumpStat("community_share", req).catch(() => {});

      res.status(201).json({
        pending: true,
        message: "Đã nhận bài mẫu. Admin sẽ duyệt trước khi đưa lên Kho chung!",
        item: saved,
      });
    } catch (err: any) {
      console.error("Error adding community preset:", err);
      res.status(500).json({ error: "Không thể đóng góp bài mẫu. Vui lòng thử lại." });
    }
  });

  // API: Bày tỏ thích / bỏ thích một bài mẫu
  app.post("/api/community/presets/:id/like", async (req, res) => {
    try {
      const id = req.params.id;
      const liked = req.body?.liked === true;
      const newLikes = await bumpLikes(id, liked);
      if (newLikes === null) {
        return res.status(404).json({ error: "Không tìm thấy bài mẫu." });
      }
      res.json({ id, likes: newLikes });
    } catch (err: any) {
      console.error("Error liking community preset:", err);
      res.status(500).json({ error: "Không cập nhật được lượt thích." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
