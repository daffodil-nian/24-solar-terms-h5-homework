/**
 * 复制为 ai-agent-config.js，只填 apiKey 和 appId
 */
(function (root, factory) {
  var cfg = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = cfg;
  }
  root.TermAIAgentConfig = cfg;
})(typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : this, function () {
  return {
    apiKey: 'sk-你的百炼APIKey',
    appId: '你的智能体应用ID'
  };
});
