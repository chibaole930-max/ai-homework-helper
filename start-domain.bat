@echo off
echo ============================================
echo   HOC TAP WEB - START VOI DOMAIN RIENG
echo ============================================
echo.

cd /d "%~dp0"
set NODE_ENV=production

echo [1/2] Khoi dong server tren port 3000...
start "HocTap-Server" cmd /c "set NODE_ENV=production && node dist/server.cjs"

echo [2/2] Khoi dong Cloudflare Tunnel (domain rieng)...
start "HocTap-Tunnel" cmd /c ""C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --config "%USERPROFILE%\.cloudflared\config.yml" run"

echo Done!
echo ============================================
echo   Server dang chay tren http://localhost:3000
echo   Tunnel dang chay voi domain cua ban
echo   Dung stop.bat de tat.
echo ============================================
pause