import asyncio
import sys
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parent))

from config import get

_cached_session_id: str | None = None
_cached_workdir: str = ""


async def check_status() -> dict:
    base = get("opencode_url", "http://localhost:4096").rstrip("/")
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(f"{base}/config")
            if resp.status_code < 400:
                return {"reachable": True, "url": base, "details": resp.text[:500]}
            return {"reachable": False, "url": base, "error": f"HTTP {resp.status_code}"}
    except httpx.TimeoutException:
        return {"reachable": False, "url": base, "error": "timeout"}
    except Exception as e:
        return {"reachable": False, "url": base, "error": str(e)}


def _model_ref() -> dict | None:
    model = str(get("opencode_model", "opencode/big-pickle") or "").strip()
    if "/" in model:
        provider, _, model_id = model.partition("/")
        return {"providerID": provider, "modelID": model_id}
    return None


async def _create_session(client: httpx.AsyncClient, base: str) -> str | None:
    global _cached_workdir
    try:
        body: dict = {}
        repo = str(get("opencode_repo", "") or "").strip()
        if repo:
            body["directory"] = repo
            _cached_workdir = repo
        resp = await client.post(f"{base}/session", json=body, timeout=15.0)
        ctype = resp.headers.get("content-type", "")
        if resp.status_code < 400 and "application/json" in ctype:
            data = resp.json()
            sid = data.get("id")
            if sid:
                return sid
    except Exception:
        pass
    return None


def _extract_text(data: dict) -> str:
    parts = data.get("parts") or []
    texts = [p.get("text", "") for p in parts if p.get("type") == "text" and p.get("text")]
    if texts:
        return "\n".join(texts)
    if isinstance(data.get("info"), dict) and data["info"].get("error"):
        return f"⚠️ OpenCode lỗi: {data['info']['error']}"
    return str(data)[:1000]


async def run_edit_request(prompt: str, session_id: str | None = None) -> str:
    global _cached_session_id
    base = get("opencode_url", "http://localhost:4096").rstrip("/")
    agent = str(get("opencode_agent", "build") or "build")
    model = _model_ref()
    timeout = int(get("opencode_api_timeout", 180))

    # Luôn dùng phiên riêng để tránh nhiễu ngữ cảnh với các lần trước
    sid = None
    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            sid = session_id or _cached_session_id or await _create_session(client, base)
            if not sid:
                return "⚠️ Không tạo được session OpenCode."

            payload: dict = {
                "agent": agent,
                "parts": [{"type": "text", "text": prompt}],
            }
            if model:
                payload["model"] = model

            resp = await client.post(f"{base}/session/{sid}/message", json=payload)
            if resp.status_code >= 400:
                return f"⚠️ OpenCode API lỗi HTTP {resp.status_code}: {resp.text[:300]}"

            try:
                data = resp.json()
            except Exception:
                return resp.text[:4000]

            if sid:
                _cached_session_id = sid

            text = _extract_text(data)
            return text or "⚠️ OpenCode đã xử lý nhưng không có output."
    except httpx.ReadTimeout:
        return "⚠️ OpenCode xử lý quá lâu (timeout). Vui lòng thử lại."
    except httpx.TimeoutException:
        return "⚠️ OpenCode timeout."
    except Exception as e:
        return await _run_cli_fallback(prompt, _cached_workdir)


async def _run_cli_fallback(prompt: str, workdir: str = "") -> str:
    timeout = int(get("opencode_cli_timeout", 90))
    try:
        proc = await asyncio.create_subprocess_exec(
            "opencode", "run", prompt,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
        output = stdout.decode(errors="replace").strip()
        err_output = stderr.decode(errors="replace").strip()
        if proc.returncode != 0:
            return f"⚠️ Lỗi opencode CLI (code {proc.returncode}):\n{err_output or output}"
        return output or "Thực thi thành công (không có output)."
    except asyncio.TimeoutError:
        try:
            proc.kill()
        except Exception:
            pass
        return "⚠️ OpenCode CLI timeout."
    except FileNotFoundError:
        return "⚠️ Không tìm thấy opencode CLI. Hãy cài đặt hoặc kiểm tra PATH."
    except Exception as e:
        return f"⚠️ Lỗi opencode CLI: {type(e).__name__}"