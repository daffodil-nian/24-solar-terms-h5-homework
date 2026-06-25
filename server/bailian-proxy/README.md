# 百炼智能体 · 服务端代理

浏览器 **不能** 直接调用百炼 API（会泄露 API Key）。本目录提供 **函数计算 / 本地调试** 用的转发服务。

## 1. 配置密钥

```bash
cd server/bailian-proxy
copy .env.example .env
```

编辑 `.env`，填入：

- `DASHSCOPE_API_KEY` — 百炼 API Key  
- `BAILIAN_APP_ID` — 已发布的智能体应用 ID  

## 2. 本地测试（简化版 · 推荐）

1. 编辑 `js/ai-agent-config.js`，只填 `apiKey` 和 `appId`
2. 双击项目根目录 **`启动智能体.bat`**（保持窗口打开）
3. 浏览器打开 `html/index.html`，点击右下角 ✦

无需单独配置 `.env` 或 `apiUrl`。

### 手动启动（可选）

```bash
node server/bailian-proxy/start-local.js
```

## 3. 部署到阿里云函数计算（FC）

1. [函数计算控制台](https://fcnext.console.aliyun.com/) 创建函数  
2. 运行环境：**Node.js 18+**  
3. 上传本目录三个文件：`index.js`、`bailian-chat.js`、`local-server.js`（上传时可不含 local-server）  
4. 配置环境变量（同 `.env`）  
5. 创建 **HTTP 触发器**，路径如 `/api/chat`，方法 POST + OPTIONS  
6. 复制触发器公网 URL，填入 `js/ai-agent-config.js` 的 `apiUrl`  
7. 将 `ALLOWED_ORIGIN` 改为你的站点域名（如 `https://你的域名.com`）

## 4. 接口约定

**请求** `POST /api/chat`

```json
{ "message": "雨水适合吃什么？", "sessionId": "可选，多轮对话" }
```

**响应**

```json
{ "reply": "……", "sessionId": "百炼返回的会话 ID" }
```

完整说明见项目根目录 `docs/节气智能体-百炼接入指南.md`。
