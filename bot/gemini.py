import sys
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parent))

from config import get


async def generate_text(prompt: str, system: str = "") -> str:
    api_key = get("gemini_api_key", "")
    if not api_key:
        return "⚠️ Chưa cấu hình Gemini API key."

    model = get("gemini_model", "gemini-2.0-flash")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    contents = []
    if system:
        contents.append({"role": "user", "parts": [{"text": system}]})
        contents.append({"role": "model", "parts": [{"text": "Understood."}]})
    contents.append({"role": "user", "parts": [{"text": prompt}]})

    payload = {"contents": contents}

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(url, json=payload)
            resp.raise_for_status()
            data = resp.json()
            candidates = data.get("candidates", [])
            if not candidates:
                return "⚠️ Gemini không trả về kết quả."
            parts = candidates[0].get("content", {}).get("parts", [])
            return "".join(p.get("text", "") for p in parts) or "⚠️ Kết quả rỗng."
    except httpx.TimeoutException:
        return "⚠️ Gemini API timeout."
    except httpx.HTTPStatusError as e:
        return f"⚠️ Gemini API lỗi HTTP: {e.response.status_code}"
    except Exception as e:
        return f"⚠️ Lỗi Gemini: {type(e).__name__}"
