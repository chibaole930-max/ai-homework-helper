import asyncio
import json
import re
import sys
import time
from functools import wraps
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from telegram import BotCommand, InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import (
    Application,
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

from config import DATA_DIR, get, load_config
import gemini
import opencode_bridge

BOT_START_TIME = time.time()

_COMMANDS = []
AUTHORIZED: set = set()
AUTH_FILE = DATA_DIR / "authorized.json"
STORED_PROMPT: dict = {}
SESSION_TITLES: dict = {}
EDIT_STATE: dict = {}
LAST_MODE: dict = {}


def bot_command(command: str, description: str):
    def decorator(fn):
        _COMMANDS.append({"command": command, "description": description, "handler": fn})

        @wraps(fn)
        async def wrapper(update: Update, context: ContextTypes.DEFAULT_TYPE):
            return await fn(update, context)

        return wrapper

    return decorator


def build_action_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [
                InlineKeyboardButton("✅ Xác nhận", callback_data="confirm"),
                InlineKeyboardButton("❌ Từ chối", callback_data="reject"),
            ],
            [
                InlineKeyboardButton("🔄 Thử lại", callback_data="retry"),
                InlineKeyboardButton("📝 Chỉnh sửa", callback_data="edit"),
            ],
        ]
    )


def build_menu_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [InlineKeyboardButton("🤖 Chat với AI", callback_data="menu_ai")],
            [InlineKeyboardButton("🛠 Yêu cầu sửa code", callback_data="menu_code")],
            [InlineKeyboardButton("📝 Đăng ký quyền sửa code", callback_data="menu_dangky")],
            [InlineKeyboardButton("📊 Trạng thái hệ thống", callback_data="menu_status")],
        ]
    )


def load_authorized():
    global AUTHORIZED
    AUTHORIZED = set()
    if AUTH_FILE.exists():
        try:
            with open(AUTH_FILE, encoding="utf-8") as f:
                AUTHORIZED = set(str(x) for x in json.load(f))
        except Exception:
            AUTHORIZED = set()


def save_authorized():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(AUTH_FILE, "w", encoding="utf-8") as f:
        json.dump(sorted(AUTHORIZED), f, ensure_ascii=False, indent=2)


def is_authorized(chat_id) -> bool:
    return str(chat_id) in AUTHORIZED


def looks_like_code_request(text: str) -> bool:
    lowered = text.lower()
    keywords = ["sửa", "fix", "lỗi", "bug", "code", "error", "exception", "compile"]
    if any(k in lowered for k in keywords):
        return True
    if "```" in text:
        return True
    if re.search(r"[\w.\-/\\]+\.{1}[A-Za-z0-9]{1,5}\b", text):
        return True
    return False


async def send_result(message, chat_id: int, prompt: str, use_code: bool):
    if use_code:
        result = await opencode_bridge.run_edit_request(prompt)
        LAST_MODE[chat_id] = "code"
    else:
        result = await gemini.generate_text(prompt)
        LAST_MODE[chat_id] = "ai"
    STORED_PROMPT[chat_id] = prompt
    await message.reply_text(result[:4096], reply_markup=build_action_keyboard())


@bot_command("start", "Menu chào mừng")
async def cmd_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Chào bạn! Tôi là bot AI hỗ trợ chat và sửa code.\n\n"
        "📌 Các lệnh:\n"
        "/status - Kiểm tra trạng thái\n"
        "/new <tiêu đề> - Bắt đầu phiên mới\n"
        "/dangky <mật khẩu> - Đăng ký quyền sửa code\n\n"
        "Chọn một mục bên dưới:",
        reply_markup=build_menu_keyboard(),
    )


@bot_command("status", "Kiểm tra trạng thái hệ thống")
async def cmd_status(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        status = await opencode_bridge.check_status()
        uptime = int(time.time() - BOT_START_TIME)
        lines = [
            "📊 BOT STATUS",
            f"🧠 Bot: hoạt động (uptime {uptime}s)",
        ]
        if status.get("reachable"):
            lines.append(f"🟢 OpenCode: OK ({status.get('url')})")
        else:
            lines.append(f"🔴 OpenCode: không khả dụng ({status.get('url')})")
            err = status.get("error") or status.get("details")
            if err:
                lines.append(f"   Chi tiết: {err[:200]}")
        lines.append(f"🔑 Quyền sửa code: {'Có' if is_authorized(update.effective_chat.id) else 'Không'}")
        await update.message.reply_text("\n".join(lines))
    except Exception as e:
        await update.message.reply_text(f"⚠️ Lỗi kiểm tra trạng thái. {type(e).__name__}")


@bot_command("new", "Bắt đầu phiên làm việc mới")
async def cmd_new(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.effective_chat.id
    title = " ".join(context.args) if context.args else "Không tiêu đề"
    SESSION_TITLES[chat_id] = title
    STORED_PROMPT.pop(chat_id, None)
    EDIT_STATE.pop(chat_id, None)
    await update.message.reply_text(f"🆕 Đã bắt đầu phiên mới: {title}")


@bot_command("dangky", "Đăng ký quyền sửa code")
async def cmd_dangky(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.effective_chat.id
    password = get("password", "hanks")
    given = " ".join(context.args) if context.args else ""
    if not given:
        await update.message.reply_text("Sử dụng: /dangky <mật khẩu>")
        return
    if given != password:
        await update.message.reply_text("❌ Mật khẩu không đúng.")
        return
    AUTHORIZED.add(str(chat_id))
    save_authorized()
    await update.message.reply_text("✅ Đăng ký thành công! Bạn có thể yêu cầu sửa code.")


async def plain_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.effective_chat.id
    text = (update.message.text or "").strip()
    if not text:
        return
    try:
        if EDIT_STATE.get(chat_id):
            EDIT_STATE[chat_id] = False
            await send_result(update.message, chat_id, text, is_authorized(chat_id) and looks_like_code_request(text))
            return

        use_code = is_authorized(chat_id) and looks_like_code_request(text)
        await send_result(update.message, chat_id, text, use_code)
    except Exception as e:
        await update.message.reply_text(f"⚠️ Có lỗi xảy ra. {type(e).__name__}")


async def handle_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    chat_id = update.effective_chat.id
    data = query.data

    if data.startswith("menu_"):
        if data == "menu_ai":
            await query.message.reply_text("🤖 Chỉ cần nhắn tin bình thường, tôi sẽ trả lời bằng AI.")
        elif data == "menu_code":
            if is_authorized(chat_id):
                await query.message.reply_text("🛠 Gửi yêu cầu sửa code, tôi sẽ chuyển tới OpenCode.")
            else:
                await query.message.reply_text("🔒 Bạn chưa đăng ký. Dùng /dangky <mật khẩu> để kích hoạt.")
        elif data == "menu_dangky":
            await query.message.reply_text("📝 Dùng lệnh /dangky <mật khẩu> để đăng ký quyền sửa code.")
        elif data == "menu_status":
            try:
                status = await opencode_bridge.check_status()
                if status.get("reachable"):
                    await query.message.reply_text("🟢 OpenCode: OK")
                else:
                    await query.message.reply_text("🔴 OpenCode: không khả dụng")
            except Exception:
                await query.message.reply_text("⚠️ Không kiểm tra được.")
        return

    if data == "confirm":
        text = query.message.text or ""
        await query.message.edit_text(f"{text}\n\n— ✅ Đã xác nhận", reply_markup=None)
        await query.answer("✅ Đã xác nhận")
        return

    if data == "reject":
        await query.message.edit_text(f"({query.message.text or ''})\n\n— ❌ Đã hủy thao tác", reply_markup=None)
        await query.answer("❌ Đã hủy thao tác")
        return

    if data == "retry":
        prompt = STORED_PROMPT.get(chat_id)
        if not prompt:
            await query.message.reply_text("⚠️ Không có yêu cầu nào để thử lại.")
            return
        mode = LAST_MODE.get(chat_id, "ai")
        await send_result(query.message, chat_id, prompt, mode == "code")
        return

    if data == "edit":
        EDIT_STATE[chat_id] = True
        await query.message.reply_text("📝 Vui lòng nhập yêu cầu đã chỉnh sửa:")
        return


async def register_commands(application: Application):
    commands = [BotCommand(c["command"], c["description"]) for c in _COMMANDS]
    for cmd in _COMMANDS:
        application.add_handler(CommandHandler(cmd["command"], cmd["handler"]))
    try:
        await application.bot.set_my_commands(commands)
    except Exception:
        pass


def main():
    load_config()
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    load_authorized()

    token = get("telegram_token", "")
    if not token:
        print("Thiếu TELEGRAM_BOT_TOKEN. Kiểm tra bot/config.json hoặc biến môi trường.")
        return

    application = Application.builder().token(token).build()

    async def post_init(app: Application):
        await register_commands(app)

    application.post_init = post_init

    application.add_handler(CallbackQueryHandler(handle_callback))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, plain_message))

    try:
        asyncio.get_event_loop()
    except RuntimeError:
        asyncio.set_event_loop(asyncio.new_event_loop())

    application.run_polling(
        allowed_updates=Update.ALL_TYPES,
        drop_pending_updates=True,
    )


if __name__ == "__main__":
    main()