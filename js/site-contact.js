/**
 * 首页 · 联系与写信反馈
 */
$(document).ready(function () {
  'use strict';

  var cfg = window.siteContact || {};
  var $blog = $('#connectBlog');
  var $bili = $('#connectBilibili');
  var $email = $('#connectEmail');
  var $form = $('#connectLetterForm');
  var $status = $('#connectLetterStatus');
  var $name = $('#letterName');
  var $contact = $('#letterContact');
  var $message = $('#letterMessage');

  if (cfg.blog && $blog.length) {
    $blog.attr('href', cfg.blog.url || '#');
    $('#connectBlogLabel').text(cfg.blog.label || '我的博客');
    $('#connectBlogDesc').text(cfg.blog.desc || '');
  }

  if (cfg.bilibili && $bili.length) {
    $bili.attr('href', cfg.bilibili.url || '#');
    $('#connectBiliLabel').text(cfg.bilibili.label || 'B站主页');
    $('#connectBiliDesc').text(cfg.bilibili.desc || '');
  }

  if (cfg.email && $email.length) {
    $email.attr('href', 'mailto:' + cfg.email);
    $('#connectEmailAddr').text(cfg.email);
  }

  if (!$form.length) return;

  function clearFieldErrors() {
    $name.add($contact).add($message).removeClass('is-invalid');
  }

  function validateLetterForm() {
    var name = $.trim($name.val());
    var contact = $.trim($contact.val());
    var message = $.trim($message.val());
    var valid = true;

    clearFieldErrors();

    if (!name) {
      $name.addClass('is-invalid');
      valid = false;
    }

    if (!contact) {
      $contact.addClass('is-invalid');
      valid = false;
    }

    if (!message || message.length <= 3) {
      $message.addClass('is-invalid');
      valid = false;
    }

    if (!valid) {
      if (!name) {
        $status.text('请填写称呼').addClass('is-error');
      } else if (!contact) {
        $status.text('请填写联系方式').addClass('is-error');
      } else {
        $status.text('想法与需求请至少写四个字').addClass('is-error');
      }
      return false;
    }

    return { name: name, contact: contact, message: message };
  }

  $form.find('input, textarea').on('input', function () {
    $(this).removeClass('is-invalid');
    if ($status.hasClass('is-error')) {
      $status.removeClass('is-error').text('我会认真阅读每一封来信。');
    }
  });

  $form.on('submit', function (e) {
    e.preventDefault();

    var data = validateLetterForm();
    if (!data) return;

    var subject = encodeURIComponent((cfg.emailSubject || '网站反馈') + ' · ' + data.name);
    var body = encodeURIComponent(
      '称呼：' + data.name + '\n' +
      '联系方式：' + data.contact + '\n\n' +
      '留言内容：\n' + data.message + '\n\n' +
      '—— 来自二十四节气网站首页'
    );

    var mail = cfg.email || 'hello@example.com';
    window.location.href = 'mailto:' + mail + '?subject=' + subject + '&body=' + body;

    $status.removeClass('is-error').text('已为你打开邮件客户端，发送后我会认真阅读每一条建议！');
    $form[0].reset();
    clearFieldErrors();
  });
});
