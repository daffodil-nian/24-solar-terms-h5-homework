/**
 * 本地调试百炼代理 · node server/bailian-proxy/local-server.js
 * 需先复制 .env.example 为 .env 并填写密钥
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { handleChatHttp } = require('./bailian-chat');

const PORT = Number(process.env.PORT || 8787);
const ENV_PATH = path.join(__dirname, '.env');

function loadEnvFile() {
  if (!fs.existsSync(ENV_PATH)) return;
  fs.readFileSync(ENV_PATH, 'utf8')
    .split(/\r?\n/)
    .forEach(function (line) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.charAt(0) === '#') return;
      const eq = trimmed.indexOf('=');
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.charAt(0) === '"' && val.charAt(val.length - 1) === '"') ||
        (val.charAt(0) === "'" && val.charAt(val.length - 1) === "'")
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    });
}

loadEnvFile();

const server = http.createServer(async function (req, res) {
  const url = req.url.split('?')[0];

  if (url !== '/api/chat' && url !== '/') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
    return;
  }

  if (req.method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        service: 'bailian-proxy',
        chat: 'POST /api/chat',
        configured: !!(process.env.DASHSCOPE_API_KEY && process.env.BAILIAN_APP_ID)
      })
    );
    return;
  }

  let body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', async function () {
    const event = {
      httpMethod: req.method,
      headers: req.headers,
      body: body
    };
    const result = await handleChatHttp(event);
    res.writeHead(result.statusCode, result.headers);
    res.end(result.body);
  });
});

server.listen(PORT, function () {
  console.log('百炼代理本地服务: http://localhost:' + PORT + '/api/chat');
  if (!process.env.DASHSCOPE_API_KEY || !process.env.BAILIAN_APP_ID) {
    console.warn('请配置 server/bailian-proxy/.env（参考 .env.example）');
  }
});
