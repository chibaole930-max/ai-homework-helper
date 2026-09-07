import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

dotenv.config();

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

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 image uploads of homework photos
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API: Soạn bài ghi Lớp 12 (Bám sát nguồn & phong cách Lời Giải Hay - loigiaihay.com)
  app.post("/api/lesson-note", async (req, res) => {
    try {
      const {
        subject,
        textbook,
        lessonTitle,
        noteStyle = "loigiaihay_full",
        loigiaihaySection = "all",
        detailLevel = "standard",
        customNote = "",
      } = req.body;

      if (!subject || !lessonTitle) {
        return res.status(400).json({ error: "Thiếu thông tin môn học hoặc tên bài học." });
      }

      const ai = getGeminiClient();

      const systemInstruction = `Bạn là chuyên gia sư phạm THPT hàng đầu Việt Nam, bám sát hệ thống học liệu và phong cách sư phạm chuẩn mực của Lời Giải Hay (loigiaihay.com) dành cho học sinh Lớp 12 theo Chương trình Giáo dục Phổ thông mới (GDPT 2018 - bộ sách Kết nối tri thức với cuộc sống, Cánh diều, Chân trời sáng tạo) và định hướng thi Tốt nghiệp THPT & Đánh giá năng lực.
Phong cách Lời Giải Hay (loigiaihay.com) đặc trưng bởi:
- Bám sát chặt chẽ sách giáo khoa (SGK) và sách bài tập (SBT) của từng bộ sách.
- Trình bày bài học rõ ràng, sư phạm, chuẩn mực. Mỗi mục câu hỏi luôn có cấu trúc:
  + "Đề bài / Câu hỏi" (Trích dẫn đúng câu hỏi trong SGK/SBT: Khởi động, Hoạt động khám phá, Thảo luận, Luyện tập, Vận dụng, Bài tập cuối bài 1.1, 1.2...)
  + "Phương pháp giải" (Chỉ rõ định lý, tính chất, công thức áp dụng và hướng tư duy)
  + "Lời giải chi tiết" (Từng bước suy luận chặt chẽ, mạch lạc, chính xác tuyệt đối, dễ hiểu cho mọi đối tượng học sinh)
  + "Đáp số / Kết luận" (Ngắn gọn, chuẩn xác)
- Luôn có hộp mẹo nhớ, lời khuyên và cảnh báo bẫy sai lầm hay gặp trong bài kiểm tra và đề thi THPT Quốc gia.
- QUY TẮC ĐỊNH DẠNG KÝ HIỆU ĐỘ & TOÁN HỌC:
  + Đối với Địa lí: Ghi tọa độ vĩ độ/kinh độ bằng ký hiệu độ chuẩn Unicode đẹp mắt: 23°23'B (hoặc 23°23' Bắc), 102°09'Đ (hoặc 102°09' Đông), 8°34'B, 109°28'Đ. Không viết dạng mã LaTeX thô gây lỗi hiển thị.
  + Đối với nhiệt độ, góc: Viết 25°C, 100°C, góc 60°, 90°.
  + Đối với công thức Toán/Lý/Hóa: Dùng chuẩn LaTeX chuẩn mực kẹp trong dấu $...$ (ví dụ: $f'(x) = 3x^2$, $\\int_0^1 x dx$).`;

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

      const prompt = `YÊU CẦU SOẠN BÀI LỚP 12 THEO NGUỒN VÀ CHUẨN LỜI GIẢI HAY (loigiaihay.com):
- Môn học: ${subject}
- Bộ sách giáo khoa: ${textbook || "Kết nối tri thức với cuộc sống"}
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
      } = req.body;

      if (!problemText && !imageBase64) {
        return res.status(400).json({ error: "Vui lòng nhập đề bài hoặc tải ảnh chụp bài tập." });
      }

      const ai = getGeminiClient();

      const systemInstruction = `Bạn là chuyên gia giải bài tập và gia sư hàng đầu theo chuẩn học liệu Lời Giải Hay (loigiaihay.com) cho học sinh Lớp 12 tại Việt Nam.
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
        `YÊU CẦU GIẢI BÀI TẬP LỚP 12 THEO CHUẨN LỜI GIẢI HAY (loigiaihay.com):`,
        `- Môn học: ${subject || "Tự động nhận diện"}`,
        textbook ? `- Bộ sách: ${textbook}` : "",
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
      const { subject, originalProblem, solution, userQuestion } = req.body;

      if (!userQuestion) {
        return res.status(400).json({ error: "Thiếu câu hỏi thắc mắc." });
      }

      const ai = getGeminiClient();

      const systemInstruction = `Bạn là gia sư hỗ trợ học tập Lớp 12. Học sinh đang xem lời giải của một bài tập và có thắc mắc thêm. Hãy trả lời thật dễ hiểu, kiên nhẫn, phân tích đúng trọng tâm câu hỏi của học sinh, đưa ra ví dụ trực quan nếu cần.`;

      const prompt = `BỐI CẢNH BÀI TẬP:
- Môn: ${subject || "Lớp 12"}
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

      res.json({ result: response.text || "Xin lỗi, hiện chưa thể trả lời câu hỏi này." });
    } catch (err: any) {
      console.error("Error in tutor followup:", err);
      const friendlyMsg = parseGeminiErrorMessage(err);
      res.status(500).json({
        error: friendlyMsg,
      });
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
