/**
 * 从 js/ai-agent-config.js 读取密钥并启动本地代理
 * 用法：node server/bailian-proxy/start-local.js
 */
'use strict';

const path = require('path');

let cfg;
try {
  cfg = require(path.join(__dirname, '../../js/ai-agent-config.js'));
} catch (e) {
  console.error('无法读取 js/ai-agent-config.js，请先创建并填写 apiKey、appId');
  process.exit(1);
}

if (!cfg.apiKey || !cfg.appId) {
  console.error('请先在 js/ai-agent-config.js 填写 apiKey 和 appId');
  process.exit(1);
}

process.env.DASHSCOPE_API_KEY = cfg.apiKey;
process.env.BAILIAN_APP_ID = cfg.appId;
process.env.ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

require('./local-server.js');
