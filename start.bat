@echo off
echo ============================================
echo   HOC TAP WEB - START LOCAL HOSTING
echo ============================================
echo.

cd /d "%~dp0"

echo [1/2] Khoi dong server tren port 3000...
start "HocTap-Server" cmd /c "set NODE_ENV=production && node dist/server.cjs"

echo [2/2] Khoi dong Cloudflare Tunnel (URL tam thoi)...
echo.
echo >>>>> URL cua ban (mo tren dien thoai): <<<<<
echo.
start "HocTap-Tunnel" cmd /c ""C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --url http://localhost:3000"
echo.

echo ============================================
echo   Server dang chay tren http://localhost:3000
echo   Dung stop.bat de tat.
echo ============================================
pause
