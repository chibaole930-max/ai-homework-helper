# Auto-Update Agent — Học tập Web Việt Nam

## Mục tiêu

Tự động tìm update mới cho lĩnh vực **học tập web Việt Nam** (e-learning, LMS, quiz, video học, thanh toán VN, SEO tiếng Việt, responsive mobile) và cập nhật codebase.

## Quy trình

1. **Search** → **Đánh giá** → **Code (agent `build`)** → **Test** → **Merge** → **Báo Telegram**
2. Loop mỗi 30 phút (cấu hình qua `CHECK_INTERVAL`)
3. Rate limit → báo Telegram → hold → retry với exponential backoff

## Lĩnh vực ưu tiên

- Thư viện LMS / e-learning mới
- UI component cho quiz, video học online
- Tích hợp thanh toán Việt Nam (VNPay, Momo, ZaloPay)
- SEO tiếng Việt (meta tags, sitemap, structured data)
- Tối ưu mobile cho học sinh Việt Nam
- Thư viện React/Vite/Express mới có ảnh hưởng tới project

## Telegram

| Tình huống | Nội dung cần gửi |
|---|---|
| Update | Chi tiết: file nào, thay đổi gì, nguồn link, test pass |
| Limit | Loại limit, thời gian hold, thời gian resume |
| Error | Vị trí lỗi, message, đã thử gì, cần hỗ trợ |

## Rules

- Không push code chưa test — test FAIL thì rollback
- Backup trước khi sửa file quan trọng
- Log mọi hành động vào `auto-update.log`
- Chỉ merge khi test PASS
- Nếu lỗi không tự fix → gửi Telegram `[ERROR]` và chờ hỗ trợ

## Model & Agents

- Agent `build` — full access, dùng cho code changes
- Agent `plan` — dùng để explore/analyze trước khi sửa
- Model fallback — cấu hình qua plugin rate-limit fallback

## Commands điều khiển (qua Telegram)

- `/chat` — bật chế độ chat 2 chiều với OpenCode
- `/exit` — thoát chế độ chat với OpenCode
- `/up_status` — trạng thái auto-updater
- `/up_stop` — dừng loop
- `/up_resume` — tiếp tục loop
- `/up_force` — force check ngay lập tức