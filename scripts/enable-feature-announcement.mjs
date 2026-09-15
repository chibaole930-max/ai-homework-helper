/**
 * Enable thông báo bản cập nhật mới trên production database.
 * Cách chạy trên Render Shell:
 *   cd /opt/render/project/src
 *   node scripts/enable-feature-announcement.mjs
 *
 * Hoặc trên Render Dashboard > Postgres > Connect > External connection,
 * rồi chạy với DATABASE_URL:
 *   DATABASE_URL="postgres://..." node scripts/enable-feature-announcement.mjs
 */

import pg from "pg";

const { Pool } = pg;

const ANNOUNCEMENT_TEXT = `📢 Bản cập nhật mới – 4 tính năng vừa ra mắt:

🧠 Thẻ Học Thông Minh: Tự tạo bộ thẻ từ vựng Tiếng Anh từ bài học, lật thẻ và ôn lại theo lịch 1→3→7→14→30 ngày.

💡 Mẹo Học Tập: 8 phương pháp học hiệu quả (Cornell 5R, active recall, mindmap, cung điện trí nhớ…) viết tiếng Việt cho học sinh.

📝 Vở Ghi Cornell 5R: Kiểu soạn bài mới – 2 cột từ khóa + nội dung, ôn thi không cần đọc lại cả tập vở.

🔔 Nhắc ôn tập thông minh: Mỗi bài lưu hiện lịch ôn 1-3-7-14-30 ngày tự động.

Vào thử ngay – tất cả đều miễn phí! 🇻🇳`;

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("❌ Thiếu biến môi trường DATABASE_URL.");
    console.error("Chạy trên Render Shell hoặc gán DATABASE_URL trước khi chạy script.");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

  try {
    const { rows } = await pool.query("SELECT value FROM site_settings WHERE key = 'site'");

    let merged;
    if (rows.length === 0) {
      merged = {
        maintenance: { enabled: false, message: "", modules: {} },
        announcement: { enabled: true, text: ANNOUNCEMENT_TEXT },
        donate: { enabled: false, qrImage: "", note: "" },
        ai: { geminiKey: "", keys: [] },
        freeUsageLimit: 2,
        notifications: { telegramBotToken: "", telegramChatId: "" },
      };
      await pool.query("INSERT INTO site_settings (key, value) VALUES ('site', $1)", [
        JSON.stringify(merged),
      ]);
      console.log("✅ Đã tạo mới site_settings & bật announcement.");
    } else {
      const current = JSON.parse(rows[0].value);
      merged = {
        ...current,
        announcement: { enabled: true, text: ANNOUNCEMENT_TEXT },
      };
      await pool.query("UPDATE site_settings SET value = $1 WHERE key = 'site'", [
        JSON.stringify(merged),
      ]);
      console.log("✅ Đã bật announcement trong site_settings hiện có.");
    }

    const verify = await pool.query("SELECT value FROM site_settings WHERE key = 'site'");
    const check = JSON.parse(verify.rows[0].value);
    console.log("📋 Verify:");
    console.log("  enabled:", check.announcement?.enabled);
    console.log("  text (đầu):", String(check.announcement?.text || "").slice(0, 70) + "...");

    console.log("\n🎉 Xong! Người dùng mở web sẽ thấy popup thông báo bản cập nhật.");
    console.log("Reset cache không cần — server đọc site_settings mỗi lần restart, nên cần deploy/restart server:");
    console.log("   Render Dashboard > ai-homework-helper > Manual Deploy > Deploy latest commit");
  } catch (err) {
    console.error("❌ Lỗi:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();