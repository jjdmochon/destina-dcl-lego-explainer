@echo off
setlocal enabledelayedexpansion
title DESTINA Genomica — Chemical Catalogue (Lab Intranet Server)
color 0A

echo ===============================================================================
echo   DESTINA GENOMICA S.L. — CHEMICAL CATALOGUE (LAB INTRANET MODE)
echo   Local Subnet Sharing Node (Internal Office / Lab Network Only)
echo   ISO 9001:2015 ^| ISO 13485:2016 Compliant
echo ===============================================================================
echo.

cd /d "%~dp0"
set PORT=8085

:: Get primary IPv4 address
for /f "tokens=4" %%a in ('route print ^| findstr 0.0.0.0 ^| findstr /v "::"') do (
    set LOCAL_IP=%%a
    goto found_ip
)
:found_ip

echo [*] Working Directory : %~dp0
echo [*] Local Host IP     : %LOCAL_IP%
echo [*] Service Port      : %PORT%
echo.
echo [!] NOTE: This server is accessible ONLY by computers on the same local
echo     Wi-Fi or Ethernet network. It is NOT exposed to the public Internet.
echo.
echo [*] Intranet Access URL for Lab Colleagues:
echo     http://%LOCAL_IP%:%PORT%
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Python was not detected in PATH.
    pause
    exit /b 1
)

:: Check if port is already active
netstat -ano | findstr /R /C:":%PORT% .*LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo [i] Server is already active on port %PORT%.
    start http://localhost:%PORT%
    pause
    exit /b 0
)

echo [*] Starting Python HTTP Server on 0.0.0.0:%PORT%...
start /B "" python -m http.server %PORT% --bind 0.0.0.0 >nul 2>&1

timeout /t 2 /nobreak >nul

:: Launch browser locally
start http://localhost:%PORT%

echo.
echo ===============================================================================
echo   INTRANET SERVER RUNNING
echo   - Local machine:   http://localhost:%PORT%
echo   - Colleagues:      http://%LOCAL_IP%:%PORT%
echo ===============================================================================
echo.
echo Press any key to stop the lab intranet server...
pause >nul

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT% " ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo [*] Lab intranet server stopped cleanly.
exit /b 0
