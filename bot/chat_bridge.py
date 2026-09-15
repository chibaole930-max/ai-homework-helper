import asyncio
import json
from pathlib import Path

import httpx

from config import get, DATA_DIR


class ChatBridge:
    """
    Two-way bridge between Telegram and OpenCode sessions.

    OpenCode questions arrive over the SSE event stream as `permission.updated`
    events (type `question`). Answers are sent back via
    POST /session/:id/permissions/:permissionID.
    """

    def __init__(self):
        self.base = ""
        self._sessions: dict[str, str] = {}
        self._pending: dict[str, dict] = {}
        self._last_question: dict[str, dict] = {}
        self._feedback_cb = None
        self._sse_task = None
        self._snapshot_file = DATA_DIR / "chat_sessions.json"
        self._load_snapshots()

    # --- persistence ---------------------------------------------------

    def _load_snapshots(self):
        try:
            if self._snapshot_file.exists():
                data = json.loads(self._snapshot_file.read_text(encoding="utf-8"))
                self._sessions = {k: v for k, v in data.items() if v}
        except Exception:
            self._sessions = {}

    def _save_snapshots(self):
        try:
            DATA_DIR.mkdir(parents=True, exist_ok=True)
            self._snapshot_file.write_text(
                json.dumps(self._sessions), encoding="utf-8"
            )
        except Exception:
            pass

    # --- plumbing -------------------------------------------------------

    def _url(self, path: str) -> str:
        if not self.base:
            self.base = str(get("opencode_url", "http://localhost:4096")).rstrip("/")
        return f"{self.base}{path}"

    async def _post(self, path: str, body: dict, timeout: float = 180.0) -> dict | None:
        try:
            async with httpx.AsyncClient(timeout=timeout) as client:
                resp = await client.post(self._url(path), json=body)
                if resp.status_code >= 400:
                    return {"error": f"HTTP {resp.status_code}: {resp.text[:300]}"}
                try:
                    return resp.json()
                except Exception:
                    return {"text": resp.text[:4000]}
        except httpx.TimeoutException:
            return {"error": "timeout"}
        except Exception as e:
            return {"error": str(e)}

    async def _create_session(self, workdir: str = "") -> str | None:
        body: dict = {}
        workdir = workdir or str(get("opencode_repo", "") or "").strip()
        if workdir:
            body["directory"] = workdir
        data = await self._post("/session", body, timeout=15.0)
        if isinstance(data, dict) and data.get("id"):
            return data["id"]
        return None

    # --- SSE monitor ----------------------------------------------------

    async def start_monitor(self, feedback_cb):
        """Start a background SSE reader.

        feedback_cb(chat_id, question: dict) is called whenever OpenCode asks
        a question for the chat's session. question is
        {'permission_id', 'session_id', 'title', 'metadata'}.
        """
        self._feedback_cb = feedback_cb
        if self._sse_task is None or self._sse_task.done():
            self._sse_task = asyncio.create_task(self._sse_loop())

    async def stop_monitor(self):
        if self._sse_task and not self._sse_task.done():
            self._sse_task.cancel()
            try:
                await self._sse_task
            except (asyncio.CancelledError, Exception):
                pass
            self._sse_task = None

    async def _sse_loop(self):
        base = self._url("/event")
        while True:
            try:
                async with httpx.AsyncClient(timeout=None) as client:
                    async with client.stream("GET", base) as resp:
                        if resp.status_code >= 400:
                            await asyncio.sleep(10)
                            continue
                        async for line in resp.aiter_lines():
                            if not line or line == ":":
                                continue
                            if line.startswith("data:"):
                                payload = line[5:].strip()
                            else:
                                continue
                            try:
                                event = json.loads(payload)
                            except Exception:
                                continue
                            await self._handle_event(event)
            except Exception:
                await asyncio.sleep(10)

    async def _handle_event(self, event: dict):
        etype = event.get("type")
        if etype != "permission.updated":
            return

        props = event.get("properties") or {}
        permission_id = props.get("id")
        session_id = props.get("sessionID")

        chat_id = self._chat_for_session(session_id)
        if not chat_id:
            return

        self._pending[chat_id] = {
            "id": permission_id,
            "session_id": session_id,
            "title": props.get("title") or "",
            "metadata": props.get("metadata") or {},
            "pattern": props.get("pattern") or "",
        }

        if self._feedback_cb:
            q = {
                "permission_id": permission_id,
                "session_id": session_id,
                "title": props.get("title") or "",
                "metadata": props.get("metadata") or {},
                "pattern": props.get("pattern") or "",
            }
            await self._feedback_cb(chat_id, q)

    def _chat_for_session(self, session_id: str) -> str | None:
        for chat, sid in self._sessions.items():
            if sid == session_id:
                return chat
        return None

    def pending_question(self, chat_id) -> dict | None:
        return self._pending.get(str(chat_id))

    # --- public API ------------------------------------------------------

    async def new_session(self, chat_id) -> str | None:
        sid = await self._create_session()
        if sid:
            self._sessions[str(chat_id)] = sid
            self._last_question.pop(str(chat_id), None)
            self._pending.pop(str(chat_id), None)
            self._save_snapshots()
        return sid

    def get_session(self, chat_id) -> str | None:
        return self._sessions.get(str(chat_id))

    async def send_message(self, chat_id, text: str) -> dict:
        """Send a user message to the chat's session.

        Returns:
          {'type': 'text', 'text': ...}
          {'type': 'question', ...} if a question is pending
          {'type': 'error', 'text': ...}
        """
        sid = self.get_session(chat_id) or await self.new_session(chat_id)
        if not sid:
            return {"type": "error", "text": "⚠️ Không tạo được OpenCode session."}

        agent = str(get("opencode_agent", "build") or "build")
        model = _model_ref()
        payload: dict = {
            "agent": agent,
            "parts": [{"type": "text", "text": text}],
        }
        if model:
            payload["model"] = model

        data = await self._post(f"/session/{sid}/message", payload, timeout=240.0)
        return self._parse_response(chat_id, sid, data)

    async def answer_question(self, chat_id, response: str) -> dict:
        """Send the user's answer to a pending OpenCode question.

        Returns the follow-up text from OpenCode.
        """
        pending = self._pending.get(str(chat_id))
        if not pending:
            return {
                "type": "error",
                "text": "⚠️ Không có câu hỏi nào đang chờ trả lời.",
            }

        sid = pending.get("session_id") or self.get_session(chat_id)
        permission_id = pending.get("id")
        if not sid or not permission_id:
            return {"type": "error", "text": "⚠️ Mất thông tin phiên câu hỏi."}

        resp = await self._post(
            f"/session/{sid}/permissions/{permission_id}",
            {"response": response},
            timeout=240.0,
        )

        self._pending.pop(str(chat_id), None)

        if isinstance(resp, dict) and resp.get("error") and resp["error"] != "timeout":
            return {"type": "error", "text": f"⚠️ {resp['error']}"}

        # Re-trigger processing to collect the follow-up text.
        agent = str(get("opencode_agent", "build") or "build")
        payload: dict = {"agent": agent}
        model = _model_ref()
        if model:
            payload["model"] = model
        payload["noReply"] = True

        data = await self._post(f"/session/{sid}/message", payload, timeout=240.0)
        return self._parse_response(chat_id, sid, data)

    async def clear(self, chat_id):
        sid = self.get_session(chat_id)
        if sid:
            await self._post(f"/session/{sid}/abort", {}, timeout=10.0)
        self._sessions.pop(str(chat_id), None)
        self._pending.pop(str(chat_id), None)
        self._last_question.pop(str(chat_id), None)
        self._save_snapshots()

    def is_responding(self, chat_id) -> bool:
        return self._pending.get(str(chat_id)) is not None

    # --- response parsing ------------------------------------------------

    def _parse_response(self, chat_id, sid: str, data) -> dict:
        if not isinstance(data, dict):
            return {"type": "error", "text": "⚠️ OpenCode trả về định dạng lạ."}

        if "error" in data:
            # Timeout may mean OpenCode is waiting on a question.
            pending = self._pending.get(str(chat_id))
            if pending:
                return {
                    "type": "question",
                    "title": pending.get("title", ""),
                    "metadata": pending.get("metadata", {}),
                    "pattern": pending.get("pattern", ""),
                }
            return {"type": "error", "text": f"⚠️ OpenCode API: {data['error']}"}

        parts = data.get("parts") or []
        texts = [
            p.get("text", "")
            for p in parts
            if isinstance(p, dict) and p.get("type") == "text" and p.get("text")
        ]
        if texts:
            return {"type": "text", "text": "\n".join(texts)}

        if isinstance(data.get("info"), dict) and data["info"].get("error"):
            return {
                "type": "error",
                "text": f"⚠️ OpenCode lỗi: {data['info']['error']}",
            }

        return {"type": "text", "text": str(data)[:4000]}


def _model_ref() -> dict | None:
    model = str(get("opencode_model", "opencode/big-pickle") or "").strip()
    if "/" in model:
        provider, _, model_id = model.partition("/")
        return {"providerID": provider, "modelID": model_id}
    return None


bridge = ChatBridge()