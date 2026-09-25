@echo off
title DESTINA miRNA Detection Lego Explainer
echo ========================================================
echo   DESTINA Genomics - Dynamic Chemical Labelling (DCL)
echo   Starting local offline presentation server...
echo ========================================================
start /B python -m http.server 8080 --directory "%~dp0" >nul 2>&1
timeout /t 1 /nobreak >nul
echo Opening animation in app mode...
start chrome.exe --app="http://localhost:8080/index.html" || start msedge.exe --app="http://localhost:8080/index.html" || start http://localhost:8080/index.html
echo.
echo Presentation running. Close this window to stop the server when done.
pause >nul
taskkill /F /IM python.exe /T >nul 2>&1
