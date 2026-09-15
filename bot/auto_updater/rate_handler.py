import asyncio
import time
from .config import Config
from .notifier import TelegramNotifier


class RateHandler:
    def __init__(self, notifier: TelegramNotifier):
        self.notifier = notifier
        self.consecutive_limits = 0
        self.last_limit_time = 0

    async def handle_limit(self, limit_type: str, details: str) -> bool:
        self.consecutive_limits += 1
        self.last_limit_time = time.time()

        delay = min(Config.BASE_DELAY * (2 ** (self.consecutive_limits - 1)), Config.MAX_DELAY)

        await self.notifier.notify_limit(limit_type, details, delay)
        await asyncio.sleep(delay)

        if self.consecutive_limits >= Config.MAX_RETRY:
            await self.notifier.notify_limit(
                "PERSISTENT_LIMIT",
                f"Vẫn bị limit sau {Config.MAX_RETRY} lần retry",
                Config.HOLD_ON_PERSISTENT_LIMIT,
            )
            await asyncio.sleep(Config.HOLD_ON_PERSISTENT_LIMIT)
            self.consecutive_limits = 0
            return True

        return True

    def reset(self):
        self.consecutive_limits = 0