@echo off
echo Dung server va tunnel...
taskkill /FI "WINDOWTITLE eq HocTap-Server*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq HocTap-Tunnel*" /F >nul 2>&1
echo Da dung tat ca!
pause
