<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/1ca857fc-fcad-494f-a20c-8bc897455f71

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Gemini API key

API keys cho Gemini được quản lý **hoàn toàn trên web** — vào `#/admin` rồi thêm key tại mục
"Ai Manager". Không cần đặt biến môi trường `GEMINI_API_KEY`. Nếu chạy local chưa vào web để
bổ sung key, bạn có thể ghi file `data/site-settings.json` hoặc để trống và thêm qua Admin sau.
