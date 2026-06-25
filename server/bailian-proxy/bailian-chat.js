/**
 * 阿里云百炼 · 智能体 DashScope 调用（服务端共用）
 */
'use strict';

const DASHSCOPE_HOST = 'dashscope.aliyuncs.com';
const DASHSCOPE_PATH_PREFIX = '/api/v1/apps/';

function chatWithBailian(options) {
  const message = (options.message || '').trim();
  const sessionId = options.sessionId || '';
  const apiKey = options.apiKey || process.env.DASHSCOPE_API_KEY;
  const appId = options.appId || process.env.BAILIAN_APP_ID;

  if (!message) {
    return Promise.resolve({ ok: false, status: 400, error: 'message 不能为空' });
  }
  if (!apiKey || !appId) {
    return Promise.resolve({
      ok: false,
      status: 500,
      error: '服务端未配置 DASHSCOPE_API_KEY 或 BAILIAN_APP_ID'
    });
  }

  const input = { prompt: message };
  if (sessionId) input.session_id = sessionId;

  const payload = JSON.stringify({
    input: input,
    parameters: {}
  });

  return new Promise(function (resolve) {
    const https = require('https');
    const req = https.request(
      {
        hostname: DASHSCOPE_HOST,
        path: DASHSCOPE_PATH_PREFIX + appId + '/completion',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey,
          'Content-Length': Buffer.byteLength(payload)
        }
      },
      function (res) {
        let data = '';
        res.on('data', function (chunk) {
          data += chunk;
        });
        res.on('end', function () {
          let json;
          try {
            json = JSON.parse(data);
          } catch (e) {
            resolve({ ok: false, status: 502, error: '百炼响应解析失败' });
            return;
          }

          if (res.statusCode !== 200) {
            resolve({
              ok: false,
              status: res.statusCode,
              error: json.message || json.code || '百炼接口错误',
              raw: json
            });
            return;
          }

          const text =
            (json.output && json.output.text) ||
            (json.Data &&
              json.Data.Choices &&
              json.Data.Choices[0] &&
              json.Data.Choices[0].Message &&
              json.Data.Choices[0].Message.Content) ||
            '';

          resolve({
            ok: true,
            status: 200,
            reply: text,
            sessionId: json.output && json.output.session_id ? json.output.session_id : sessionId
          });
        });
      }
    );

    req.on('error', function (err) {
      resolve({ ok: false, status: 502, error: err.message || '网络错误' });
    });
    req.write(payload);
    req.end();
  });
}

function corsHeaders(origin) {
  const allowed = (process.env.ALLOWED_ORIGIN || '*').split(',').map(function (s) {
    return s.trim();
  });
  let allowOrigin = '*';
  if (origin && allowed.indexOf('*') === -1) {
    allowOrigin = allowed.indexOf(origin) !== -1 ? origin : allowed[0] || '';
  } else if (allowed[0] && allowed[0] !== '*') {
    allowOrigin = allowed[0];
  }
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

async function handleChatHttp(event) {
  const method = (event.httpMethod || event.requestContext?.http?.method || 'POST').toUpperCase();
  const origin = event.headers?.origin || event.headers?.Origin || '';

  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(origin), body: '' };
  }

  if (method !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: '仅支持 POST' })
    };
  }

  let body = {};
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return {
      statusCode: 400,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: 'JSON 格式错误' })
    };
  }

  const result = await chatWithBailian({
    message: body.message,
    sessionId: body.sessionId
  });

  if (!result.ok) {
    return {
      statusCode: result.status,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: result.error })
    };
  }

  return {
    statusCode: 200,
    headers: corsHeaders(origin),
    body: JSON.stringify({ reply: result.reply, sessionId: result.sessionId })
  };
}

module.exports = { chatWithBailian, handleChatHttp, corsHeaders };
