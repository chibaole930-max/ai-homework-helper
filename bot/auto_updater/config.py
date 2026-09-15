import os
from pathlib import Path

class Config:
    TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "6867649326:AAF7N3ZLn1xo_6hEZ4NnKZ7SLp9Rbjh2lIo")
    TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "5293830855")
    CHECK_INTERVAL = int(os.getenv("CHECK_INTERVAL", "900"))
    MAX_RETRY = int(os.getenv("MAX_RETRY", "5"))
    REPO_PATH = os.getenv("REPO_PATH", str(Path(__file__).parent.parent.parent))
    LOG_FILE = str(Path(__file__).parent.parent / "auto_update.log")
    OPENCODE_MODEL = os.getenv("OPENCODE_MODEL", "opencode/big-pickle")

    # Lĩnh vực học tập web Việt Nam
    FOCUS_AREAS = [
        "e-learning", "lms", "quiz", "video-hoc", "vietnam",
        "vnpay", "momo", "zalopay", "seo-tieng-viet", "responsive-mobile",
        "react", "vite", "nodejs", "express", "gemini", "llm", "security",
    ]

    # Dependencies cần theo dõi để cập nhật tự động
    TRACKED_PACKAGES = [
        "react", "react-dom", "vite", "express", "@google/genai",
        "tailwindcss", "katex", "react-markdown", "rehype-katex",
        "remark-math", "remark-gfm", "lucide-react", "motion",
        "typescript", "esbuild",
    ]

    # NPM packages liên quan học tập VN cần theo dõi
    ELEARNING_PACKAGES = [
        "quill", "tinymce", "react-quill", "video.js", "hls.js",
        "pdfjs-dist", "exceljs", "papaparse", "jspdf", "qrcode",
    ]

    BASE_DELAY = 1
    MAX_DELAY = 300
    HOLD_ON_PERSISTENT_LIMIT = 900