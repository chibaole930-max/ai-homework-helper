# 🤖 Telegram AI Bot

Bot Telegram tích hợp Gemini AI và kết nối OpenCode server để hỗ trợ chat thông minh và yêu cầu sửa code.

## ✨ Tính năng

- 💬 Chat AI với Gemini (`gemini-2.0-flash`)
- 🛠 Kết nối OpenCode server (`http://localhost:4096`) để xử lý yêu cầu sửa code
- 📊 Lệnh kiểm tra trạng thái `/status`
- 🔒 Đăng ký quyền sửa code bằng mật khẩu `/dangky <mật khẩu>`
- 🔄 Inline buttons: ✅ Xác nhận · ❌ Từ chối · 🔄 Thử lại · 📝 Chỉnh sửa
- 🗂 Tự động đăng ký lệnh lên menu Telegram khi khởi động

## 📦 Yêu cầu

- Python 3.9+
- pip
- Token bot Telegram (từ [@BotFather](https://t.me/BotFather))
- Gemini API key
- OpenCode (dùng command `opencode serve`)

## 🚀 Cài đặt

```bash
cd C:\Users\huynh\Desktop\web\bot

# Tạo môi trường ảo
python -m venv .venv
.venv\Scripts\activate

# Cài dependencies
pip install -r requirements.txt

# Tạo file cấu hình từ mẫu
copy config.json.example config.json

# (Tùy chọn) Tạo file .env từ mẫu
copy .env.example .env
```

## ⚙️ Cấu hình

Sửa `bot/config.json`:

```json
{
  "telegram_token": "<token từ BotFather>",
  "allowed_user_ids": [],       
  "password": "hanks",          
  "opencode_url": "http://localhost:4096",
  "gemini_api_key": "<Gemini API key>",
  "gemini_model": "gemini-2.0-flash"
}
```

Hoặc dùng biến môi trường (ưu tiên hơn config file): `TELEGRAM_BOT_TOKEN`, `GEMINI_API_KEY`, `BOT_PASSWORD`, `OPENCODE_URL`.

## 🏃 Chạy bot

```bash
# Đảm bảo OpenCode server đang chạy
opencode serve

# Chạy bot (từ thư mục bot)
.venv\Scripts\activate
python main.py
```

## 🔑 Lấy Token Telegram và User ID

1. **Token bot:** Vào [@BotFather](https://t.me/BotFather) → `/newbot` → đặt tên → lấy token dạng `123456789:AA...`
2. **User ID:** Vào [@userinfobot](https://t.me/userinfobot) hoặc nhắn `/start` cho bot từ tài khoản cần kiểm tra.

## 📖 Cách dùng

- `/start` — Menu chào mừng
- `/status` — Kiểm tra OpenCode server + sức khỏe bot
- `/new <tiêu đề>` — Bắt đầu phiên làm việc mới
- `/dangky <mật khẩu>` — Đăng ký quyền sửa code cho chat này
- Nhắn tin thường — Chat AI với Gemini; nếu có quyền và nội dung giống yêu cầu sửa code ("sửa", "fix", "code", backtick, đường dẫn file...) sẽ tự chuyển sang OpenCode.

## 📤 Inline Buttons

Dưới mỗi phản hồi AI/code:
- ✅ Xác nhận — Áp dụng yêu cầu như hiện tại
- ❌ Từ chối — Hủy thao tác
- 🔄 Thử lại — Chạy lại yêu cầu gần nhất
- 📝 Chỉnh sửa — Nhập lại yêu cầu, gửi lại để chạy mới

## 🤖 Quản lý bằng PM2

```bash
npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 logs telegram-bot
pm2 restart telegram-bot
pm2 stop telegram-bot
```

## 🔒 Bảo mật

- Token & mật khẩu không bao giờ được in/log ra.
- Quyền sửa code chỉ dành cho chat đã đăng ký (lưu trong `bot/data/authorized.json`).
- Tất cả lời gọi mạng đều có timeout, không treo.

## ⚠️ Lưu ý

**KHÔNG deploy trên Render free plan** — free plan tắt máy khi ngủ và xóa dữ liệu, không phù hợp bot polling. Hãy dùng VPS, home server, hoặc dịch vụ luôn bật khác.