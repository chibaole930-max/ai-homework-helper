import httpx
from datetime import datetime
from .config import Config


class TelegramNotifier:
    def __init__(self):
        self.base_url = f"https://api.telegram.org/bot{Config.TELEGRAM_BOT_TOKEN}"
        self.chat_id = Config.TELEGRAM_CHAT_ID

    async def send(self, message: str):
        async with httpx.AsyncClient() as client:
            try:
                await client.post(
                    f"{self.base_url}/sendMessage",
                    json={
                        "chat_id": self.chat_id,
                        "text": message,
                        "parse_mode": "HTML",
                    },
                    timeout=10,
                )
            except Exception as e:
                self._log(f"Failed to send Telegram: {e}")

    async def notify_update(self, update_num: int, changes: list, tests_passed: int, sources: list):
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        changes_text = "\n".join([f"File: {c['file']} | {c['desc']}" for c in changes])
        desc_list = "\n".join([f"• {c['desc']}" for c in changes])
        sources_text = "\n".join([f"🔗 {s}" for s in sources])

        msg = (
            f"🤖 [UPDATE #{update_num}]\n"
            f"⏰ Thời gian: {now}\n\n"
            f"🔍 Đã tìm thấy:\n{desc_list}\n\n"
            f"🛠️ Đã thay đổi:\n{changes_text}\n\n"
            f"✅ Test: PASS ({tests_passed} test)\n"
            f"🔗 Nguồn:\n{sources_text}\n\n"
            f"📊 Trạng thái: Đã merge vào main"
        )

        await self.send(msg)

    async def notify_limit(self, limit_type: str, details: str, retry_after: int):
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        resume_time = datetime.now().timestamp() + retry_after
        resume_str = datetime.fromtimestamp(resume_time).strftime("%H:%M:%S")

        msg = (
            f"⚠️ [LIMIT DETECTED]\n"
            f"⏰ {now}\n"
            f"🚫 Loại: {limit_type}\n"
            f"📉 Chi tiết: {details}\n"
            f"⏳ Hành động: HOLD — đợi {retry_after} giây\n"
            f"🔄 Sẽ tự động resume lúc: {resume_str}"
        )

        await self.send(msg)

    async def notify_error(self, location: str, error: str, tried: list):
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        tried_text = "\n".join([f"• {t}" for t in tried])

        msg = (
            f"❌ [ERROR]\n"
            f"📍 Vị trí: {location}\n"
            f"🐛 Lỗi: {error}\n"
            f"🔧 Đã thử:\n{tried_text}\n"
            f"🆘 Cần can thiệp thủ công"
        )

        await self.send(msg)

    async def send_status(self, status: dict):
        state = "🟢 Running" if status['running'] else "🔴 Stopped"
        msg = (
            f"📊 [STATUS]\n"
            f"🔄 Trạng thái: {state}\n"
            f"📦 Updates: {status['updates_count']}\n"
            f"⏰ Lần check tiếp: {status['next_check']}\n"
            f"🔍 Lĩnh vực: {status['focus']}"
        )

        await self.send(msg)

    def _log(self, msg: str):
        print(f"[Notifier] {msg}")