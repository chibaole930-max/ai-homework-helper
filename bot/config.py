import json
import os
from pathlib import Path

BOT_DIR = Path(__file__).resolve().parent
DATA_DIR = BOT_DIR / "data"
CONFIG_PATH = BOT_DIR / "config.json"
EXAMPLE_CONFIG_PATH = BOT_DIR / "config.json.example"

_config: dict | None = None


def _load_dotenv():
    env_path = BOT_DIR / ".env"
    if not env_path.exists():
        return
    with open(env_path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip().strip("\"'")
            if key and key not in os.environ:
                os.environ[key] = value


def load_config() -> dict:
    global _config
    if _config is not None:
        return _config

    _load_dotenv()

    if not CONFIG_PATH.exists() and EXAMPLE_CONFIG_PATH.exists():
        import shutil
        shutil.copy2(EXAMPLE_CONFIG_PATH, CONFIG_PATH)

    raw: dict = {}
    if CONFIG_PATH.exists():
        with open(CONFIG_PATH, encoding="utf-8-sig") as f:
            raw = json.load(f)

    _config = {
        "telegram_token": os.environ.get("TELEGRAM_BOT_TOKEN") or raw.get("telegram_token", ""),
        "allowed_user_ids": raw.get("allowed_user_ids", []),
        "password": os.environ.get("BOT_PASSWORD") or raw.get("password", "hanks"),
        "opencode_url": os.environ.get("OPENCODE_URL") or raw.get("opencode_url", "http://localhost:4096"),
        "opencode_agent": os.environ.get("OPENCODE_AGENT") or raw.get("opencode_agent", "build"),
        "opencode_model": os.environ.get("OPENCODE_MODEL") or raw.get("opencode_model", "opencode/big-pickle"),
        "opencode_repo": os.environ.get("OPENCODE_REPO") or raw.get("opencode_repo", ""),
        "opencode_api_timeout": int(os.environ.get("OPENCODE_API_TIMEOUT") or raw.get("opencode_api_timeout", 180)),
        "opencode_cli_timeout": int(os.environ.get("OPENCODE_CLI_TIMEOUT") or raw.get("opencode_cli_timeout", 90)),
        "gemini_api_key": os.environ.get("GEMINI_API_KEY") or raw.get("gemini_api_key", ""),
        "gemini_model": raw.get("gemini_model", "gemini-2.0-flash"),
    }
    return _config


def get(key: str, default=None):
    return load_config().get(key, default)
