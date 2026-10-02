@echo off
setlocal enabledelayedexpansion
title DESTINA Genomica — Chemical Catalogue Master App (Internal Mode)
color 0B

echo ===============================================================================
echo   DESTINA GENOMICA S.L. — CHEMICAL CATALOGUE MASTER APP
echo   Internal Standalone Lab Node (Isolated Loopback Binding: 127.0.0.1)
echo   ISO 9001:2015 ^| ISO 13485:2016 Compliant
echo ===============================================================================
echo.

:: Change working directory to this script's directory
cd /d "%~dp0"

:: Set Port and Host
set PORT=8085
set HOST=127.0.0.1
set APP_URL=http://%HOST%:%PORT%

echo [*] Target Directory : %~dp0
echo [*] Loopback Host    : %HOST% (External network access is blocked)
echo [*] Port             : %PORT%
echo.

:: Check if port is already active
netstat -ano | findstr /R /C:":%PORT% .*LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo [i] Server is already running on port %PORT%.
    goto launch_browser
)

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Python was not detected in PATH.
    echo [*] Falling back to direct offline browser file execution...
    start "" "%~dp0index.html"
    exit /b 0
)

echo [*] Starting isolated local Python HTTP server on %HOST%:%PORT%...
start /B "" python -m http.server %PORT% --bind %HOST% >nul 2>&1

:: Allow server a second to spin up
timeout /t 2 /nobreak >nul

:launch_browser
echo [*] Launching Destina Chemical App in native Chromium App Mode...

:: Try Microsoft Edge App Mode
where msedge >nul 2>&1
if %errorlevel% equ 0 (
    start "" msedge --app="%APP_URL%" --window-size=1440,920 --disable-features=Translate
    goto app_running
)

:: Try Google Chrome App Mode
where chrome >nul 2>&1
if %errorlevel% equ 0 (
    start "" chrome --app="%APP_URL%" --window-size=1440,920 --disable-features=Translate
    goto app_running
)

:: Fallback to default browser
start "" "%APP_URL%"

:app_running
echo.
echo ===============================================================================
echo   APP ACTIVE: %APP_URL%
echo   - Mode: Isolated Localhost Loopback (127.0.0.1)
echo   - External connections from other machines: REJECTED
echo   - To stop the local server: Close this console window or run 'taskkill /f /im python.exe'
echo ===============================================================================
echo.
echo Press any key to terminate the internal server and exit...
pause >nul

:: Terminate the server on exit
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT% " ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo [*] Internal server stopped cleanly.
exit /b 0
