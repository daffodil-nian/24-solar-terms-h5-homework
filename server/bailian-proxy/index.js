/**
 * 阿里云函数计算 HTTP 触发器入口
 * 路由：POST /api/chat  body: { "message": "...", "sessionId": "可选" }
 */
'use strict';

const { handleChatHttp } = require('./bailian-chat');

exports.handler = async function (event, context) {
  return handleChatHttp(event);
};
