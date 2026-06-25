@echo off
chcp 65001 >nul
title 节气智能体 · 百炼代理
cd /d "%~dp0"
echo.
echo 正在启动百炼代理（读取 js/ai-agent-config.js）...
echo 请保持本窗口打开；关闭即停止服务。
echo 浏览器打开 html/index.html 后点击右下角 ✦ 即可对话。
echo.
node server/bailian-proxy/start-local.js
pause
