@echo off
echo ============================================
echo   CAI DAT CLOUDFLARE TUNNEL VOI DOMAIN RIENG
echo   (Chi can chay 1 lan duy nhat)
echo ============================================
echo.

cd /d "%~dp0"
set CLOUDFLARED="C:\Program Files (x86)\cloudflared\cloudflared.exe"

echo Buoc 1: Dang nhap Cloudflare...
echo   - Mo trinh duyet, chon domain cua ban
echo.
%CLOUDFLARED% tunnel login
echo.

echo Buoc 2: Tao tunnel "hoc-tap"...
%CLOUDFLARED% tunnel create hoc-tap
echo.

echo Buoc 3: Them DNS record cho domain...
set /p DOMAIN="Nhap domain cua ban (vi du: hocmai.vn): "
%CLOUDFLARED% tunnel route dns hoc-tap %DOMAIN%
echo.

echo ============================================
echo   CAI DAT XONG!
echo   Gateway dung de khoi dong: hoc-tap
echo ============================================
echo.
echo De khoi dong server voi tunnel domain rieng:
echo   Chay "start-domain.bat"
echo.
pause
