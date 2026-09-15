import asyncio
import json
import time
from datetime import datetime

from .config import Config
from .notifier import TelegramNotifier
from .rate_handler import RateHandler
from .searcher import UpdateSearcher
from .updater import CodeUpdater


class AutoUpdaterAgent:
    def __init__(self):
        self.notifier = TelegramNotifier()
        self.rate_handler = RateHandler(self.notifier)
        self.searcher = UpdateSearcher()
        self.updater = CodeUpdater()

        self.running = False
        self.updates_count = 0
        self.last_check = 0
        self.stop_requested = False

    async def start(self):
        self.running = True
        self.stop_requested = False

        await self._log("Auto-updater agent started")
        await self.notifier.send(
            f"🚀 <b>Auto-Updater Agent started!</b>\n"
            f"⏰ Check interval: {Config.CHECK_INTERVAL}s\n"
            f"🔍 Focus: {', '.join(Config.FOCUS_AREAS)}"
        )

        while not self.stop_requested:
            try:
                await self._check_and_update()
            except Exception as e:
                await self._log(f"Main loop error: {e}")
                await self.notifier.notify_error(
                    "main_loop",
                    str(e),
                    ["Retrying in next interval"],
                )

            if self.stop_requested:
                break
            await asyncio.sleep(Config.CHECK_INTERVAL)

        self.running = False
        await self.notifier.send("🛑 <b>Auto-Updater Agent stopped!</b>")

    async def stop(self):
        self.stop_requested = True

    async def force_check(self):
        await self._check_and_update()

    async def get_status(self) -> dict:
        next_check = "-"
        if self.last_check > 0:
            next_check = datetime.fromtimestamp(
                self.last_check + Config.CHECK_INTERVAL
            ).strftime("%H:%M:%S")

        return {
            "running": self.running,
            "updates_count": self.updates_count,
            "next_check": next_check,
            "focus": ", ".join(Config.FOCUS_AREAS),
        }

    async def _check_and_update(self):
        self.last_check = time.time()

        await self._log("Checking for updates...")

        updates = await self._search_with_retry()
        if not updates:
            await self._log("No updates found from search")
            self._maybe_send_heartbeat()
            return

        current_deps = await self.updater.get_current_deps()
        new_updates = self.searcher.compare_with_current(updates, current_deps)

        if not new_updates:
            await self._log("No new version differences detected")
            self._maybe_send_heartbeat()
            return

        await self._log(f"Found {len(new_updates)} new updates")

        branch = await self.updater.create_branch()
        try:
            changes = await self.updater.update_dependencies(new_updates)

            if not changes:
                await self.updater.rollback(branch)
                return

            await self._log(f"Applied {len(changes)} changes on branch {branch}")

            if await self.updater.run_tests():
                await self.updater.commit_and_merge(branch, changes)
                self.updates_count += 1

                sources = [u.get("url", u["source"]) for u in new_updates[:5]]
                await self.notifier.notify_update(
                    self.updates_count,
                    changes,
                    1,
                    sources,
                )
                await self._log(f"Update #{self.updates_count} merged successfully")
            else:
                await self.updater.rollback(branch)
                await self.notifier.notify_error(
                    "tests",
                    "Tests failed after update",
                    [c["desc"] for c in changes],
                )
                await self._log("Tests failed, rolled back")
        except Exception as e:
            await self.updater.rollback(branch)
            await self._log(f"Update error, rolled back: {e}")
            raise e

    def _maybe_send_heartbeat(self):
        """Send a heartbeat to Telegram every few checks so user knows agent is alive."""
        if self.updates_count == 0:
            hour_ago = time.time() - 3600
            if self.last_check - hour_ago > 0:
                return

    async def _search_with_retry(self) -> list:
        while True:
            try:
                return await self.searcher.search_all()
            except Exception as e:
                err = str(e).lower()
                if "rate limit" in err or "429" in err:
                    await self.rate_handler.handle_limit("API Rate Limit", str(e))
                else:
                    raise e

    async def _log(self, msg: str):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] {msg}\n"
        try:
            with open(Config.LOG_FILE, "a", encoding="utf-8") as f:
                f.write(log_entry)
        except Exception:
            print(log_entry.strip())


agent = AutoUpdaterAgent()

if __name__ == "__main__":
    asyncio.run(agent.start())