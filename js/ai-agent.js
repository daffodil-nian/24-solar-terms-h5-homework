/**
 * 节气智能体 · 对话 UI
 * 配置见 js/ai-agent-config.js（只需 apiKey + appId）
 */
(function (window) {
  'use strict';

  var DASHSCOPE_CHAT = 'https://dashscope.aliyuncs.com/api/v1/apps/';
  var LOCAL_PROXY = 'http://localhost:8787/api/chat';

  var demoReplies = [
    '立春是二十四节气之首，通常在每年公历 2 月 3～5 日，意味着万物复苏、春耕将始。',
    '雨水时节气温回升、降水增多，民间有「春雨贵如油」之说，宜养肝健脾。',
    '清明既是节气也是传统节日，有踏青、祭祖等习俗，天气清爽、草木萌动。',
    '夏至日北半球白昼最长，之后阳气渐收，饮食宜清淡，注意防暑养心。'
  ];

  function parseBailianData(data) {
    if (data.output && data.output.session_id) {
      window.TermAIAgent.config.sessionId = data.output.session_id;
    }
    if (data.sessionId) {
      window.TermAIAgent.config.sessionId = data.sessionId;
    }
    if (data.reply) return data.reply;
    if (data.output && data.output.text) return data.output.text;
    if (data.message) return data.message;
    if (data.error) return '服务提示：' + data.error;
    return '智能体未返回有效内容';
  }

  window.TermAIAgent = {
    config: {
      apiKey: '',
      appId: '',
      apiUrl: '',
      mode: '',
      sessionId: '',
      buildRequest: function (message) {
        var cfg = window.TermAIAgent.config;
        if (cfg.mode === 'direct') {
          var input = { prompt: message };
          if (cfg.sessionId) input.session_id = cfg.sessionId;
          return {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + cfg.apiKey
            },
            body: JSON.stringify({ input: input, parameters: {} })
          };
        }
        return {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: message,
            sessionId: cfg.sessionId || ''
          })
        };
      },
      parseResponse: parseBailianData
    },

    isConfigured: function () {
      var c = this.config;
      return !!(c.apiUrl || (c.apiKey && c.appId));
    },

    resetSession: function () {
      this.config.sessionId = '';
    },

    sendMessage: function (message, callbacks) {
      var self = this;
      var onSuccess = callbacks && callbacks.onSuccess;
      var onError = callbacks && callbacks.onError;

      if (!self.isConfigured()) {
        setTimeout(function () {
          if (onSuccess) {
            onSuccess(
              demoReplies[Math.floor(Math.random() * demoReplies.length)] +
                '\n\n（演示模式 · 请在 js/ai-agent-config.js 填写 apiKey 和 appId）'
            );
          }
        }, 600 + Math.random() * 400);
        return;
      }

      function doFetch(url) {
        return fetch(url, self.config.buildRequest(message))
          .then(function (res) {
            return res.json().then(function (data) {
              if (!res.ok) {
                throw new Error(data.error || data.message || data.code || 'HTTP ' + res.status);
              }
              return data;
            });
          })
          .then(function (data) {
            if (onSuccess) onSuccess(self.config.parseResponse(data));
          });
      }

      if (self.config.mode === 'direct') {
        doFetch(self.config.apiUrl).catch(function (err) {
          var msg = err.message || '请求失败';
          if (/failed|fetch|network|cors/i.test(msg)) {
            msg += '。请双击「启动智能体.bat」后再试（浏览器直连可能被跨域拦截）';
          }
          if (onError) onError(msg);
        });
        return;
      }

      doFetch(self.config.apiUrl).catch(function (err) {
        var msg = err.message || '请求失败';
        if (/fetch|network|refused/i.test(msg)) {
          msg = '代理未启动。请双击项目根目录「启动智能体.bat」，保持窗口打开后再试';
        }
        if (onError) onError(msg);
      });
    }
  };

  if (window.TermAIAgentConfig) {
    var ext = window.TermAIAgentConfig;
    if (ext.apiKey) window.TermAIAgent.config.apiKey = ext.apiKey;
    if (ext.appId) window.TermAIAgent.config.appId = ext.appId;
    if (ext.apiUrl) window.TermAIAgent.config.apiUrl = ext.apiUrl;
  }

  (function applyMode() {
    var c = window.TermAIAgent.config;
    if (c.apiUrl) {
      c.mode = c.apiUrl.indexOf('dashscope.aliyuncs.com') !== -1 ? 'direct' : 'proxy';
      return;
    }
    if (c.apiKey && c.appId) {
      c.mode = 'proxy';
      c.apiUrl = LOCAL_PROXY;
    }
  })();

  function agentHintText() {
    var c = window.TermAIAgent.config;
    if (!c.apiKey && !c.appId && !c.apiUrl) {
      return '演示模式 · 在 js/ai-agent-config.js 填写 apiKey 与 appId';
    }
    if (c.mode === 'proxy' && c.apiUrl === LOCAL_PROXY) {
      return '已配置 · 请先双击「启动智能体.bat」再对话';
    }
    return '已连接百炼智能体 · 多轮对话已启用';
  }

  var AGENT_FLOAT_HTML =
    '<button type="button" class="ai-agent-fab" id="aiAgentFab" aria-label="打开节气智能体">✦</button>' +
    '<div class="ai-agent-panel" id="aiAgentPanel" role="dialog" aria-label="节气智能体对话">' +
      '<div class="ai-agent-panel-header">' +
        '<h3>节气智能体</h3>' +
        '<button type="button" class="ai-agent-panel-close" id="aiAgentClose" aria-label="关闭">×</button>' +
      '</div>' +
      '<div class="ai-agent-messages" id="aiAgentMessages"></div>' +
      '<form class="ai-agent-panel-form" id="aiAgentPanelForm">' +
        '<input type="text" placeholder="输入节气相关问题…" autocomplete="off" aria-label="消息">' +
        '<button type="submit">发送</button>' +
      '</form>' +
      '<p class="ai-agent-panel-hint" id="aiAgentPanelHint"></p>' +
    '</div>';

  function ensureAgentUi() {
    if (!$('#aiAgentPanel').length) {
      $('body').append(AGENT_FLOAT_HTML);
    }
    $('#aiAgentPanelHint').text(agentHintText());
    if (window.SiteBgm && typeof window.SiteBgm.applyUi === 'function') {
      window.SiteBgm.applyUi();
    }
  }

  $(document).ready(function () {
    ensureAgentUi();

    var $panel = $('#aiAgentPanel');
    var $messages = $('#aiAgentMessages');
    var $fab = $('#aiAgentFab');
    if (!$panel.length) return;

    function resetPanelPosition() {
      $panel.removeClass('ai-agent-panel--anchored').css({
        top: '',
        left: '',
        right: '',
        bottom: ''
      });
    }

    function positionPanelNearTeaser() {
      var $teaser = $('.ai-agent-teaser').first();
      if (!$teaser.length) return false;

      var rect = $teaser[0].getBoundingClientRect();
      var panelW = $panel.outerWidth();
      var panelH = $panel.outerHeight();
      var gap = 12;
      var navClear = 72;
      var top = rect.bottom + gap;
      var left = rect.left;

      if (top + panelH > window.innerHeight - 16) {
        top = rect.top - panelH - gap;
      }
      if (top < navClear) {
        top = Math.min(rect.bottom + gap, window.innerHeight - panelH - 16);
      }
      if (top < navClear) top = navClear;

      if (left + panelW > window.innerWidth - 16) {
        left = window.innerWidth - panelW - 16;
      }
      if (left < 16) left = 16;

      $panel.addClass('ai-agent-panel--anchored').css({
        top: top + 'px',
        left: left + 'px',
        right: 'auto',
        bottom: 'auto'
      });
      return true;
    }

    function openPanel(options) {
      options = options || {};
      $panel.addClass('is-open');

      if (options.anchor === 'teaser') {
        requestAnimationFrame(function () {
          positionPanelNearTeaser();
        });
      } else {
        resetPanelPosition();
      }

      $panel.find('input').first().focus();
    }

    function closePanel() {
      $panel.removeClass('is-open');
      resetPanelPosition();
    }

    function appendMsg(text, role) {
      $messages.append(
        $('<div class="ai-agent-msg ai-agent-msg--' + role + '"></div>').text(text)
      );
      $messages.scrollTop($messages[0].scrollHeight);
    }

    function handleSend(text) {
      text = (text || '').trim();
      if (!text) return;

      appendMsg(text, 'user');
      var $typing = $('<div class="ai-agent-msg ai-agent-msg--bot ai-agent-typing">思考中…</div>');
      $messages.append($typing);
      $messages.scrollTop($messages[0].scrollHeight);

      window.TermAIAgent.sendMessage(text, {
        onSuccess: function (reply) {
          $typing.remove();
          appendMsg(reply, 'bot');
        },
        onError: function (err) {
          $typing.remove();
          appendMsg('连接智能体失败：' + err, 'bot');
        }
      });
    }

    $fab.on('click', function () {
      if ($panel.hasClass('is-open')) closePanel();
      else openPanel();
    });

    $('#aiAgentClose').on('click', closePanel);

    $('#aiAgentPanelForm').on('submit', function (e) {
      e.preventDefault();
      var $input = $(this).find('input');
      var val = $input.val();
      $input.val('');
      handleSend(val);
    });

    $('#aiAgentTeaserForm').on('submit', function (e) {
      e.preventDefault();
      var $input = $(this).find('input');
      var val = $input.val();
      $input.val('');
      openPanel({ anchor: 'teaser' });
      handleSend(val);
    });

    $(window).on('resize scroll', function () {
      if ($panel.hasClass('is-open') && $panel.hasClass('ai-agent-panel--anchored')) {
        positionPanelNearTeaser();
      }
    });

    var welcome = window.TermAIAgent.isConfigured()
      ? '你好，我是节气智能助手（百炼）。可以问我节气知识、习俗、饮食与养生。'
      : '你好，我是节气智能助手。请在 js/ai-agent-config.js 填写 apiKey 和 appId 后使用。（当前为演示模式）';
    appendMsg(welcome, 'bot');
  });
})(window);
