import asyncio
import sys
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parent))

from config import get


async def check_status() -> dict:
    base = get("opencode_url", "http://localhost:4096").rstrip("/")
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            resp = await client.get(f"{base}/config")
            if resp.status_code < 400:
                return {"reachable": True, "url": base, "details": resp.text[:500]}
            return {"reachable": False, "url": base, "error": f"HTTP {resp.status_code}"}
    except httpx.TimeoutException:
        return {"reachable": False, "url": base, "error": "timeout"}
    except Exception as e:
        return {"reachable": False, "url": base, "error": str(e)}


async def run_edit_request(prompt: str, session_id: str | None = None) -> str:
    base = get("opencode_url", "http://localhost:4096").rstrip("/")

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            endpoints = [
                f"{base}/session/prompt",
                f"{base}/api/session/prompt",
                f"{base}/prompt",
                f"{base}/api/prompt",
            ]
            body: dict = {"prompt": prompt}
            if session_id:
                body["session_id"] = session_id

            for endpoint in endpoints:
                try:
                    resp = await client.post(endpoint, json=body)
                    if resp.status_code < 400:
                        return resp.text[:4000]
                except httpx.TimeoutException:
                    continue
                except httpx.HTTPStatusError:
                    continue
    except Exception:
        pass

    return await _run_cli_fallback(prompt)


async def _run_cli_fallback(prompt: str) -> str:
    timeout = get("opencode_cli_timeout", 60)
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
