/**
 * 节气知识挑战 · 交互逻辑
 */
$(document).ready(function () {
  'use strict';

  if (typeof challengeQuestions === 'undefined') return;

  var QUESTIONS_PER_ROUND = 10;
  var hostLines = {
    welcome: '你好呀！我是主持人小历，选一门题型，咱们开始闯关吧～',
    pick: '选好题型了吗？点「开始挑战」就出发！',
    correct: ['答对啦！', '厉害！', '小历为你点赞～', '节气达人！'],
    wrong: ['没关系，看看解析再记一记～', '这题有点绕，下次一定行！', '题册里都有答案哦～'],
    finish: '本轮结束！看看成绩，要再来一局吗？',
    booklet: '这是题册查阅模式，可随时温习正确答案。'
  };

  var state = {
    mode: 'quiz',
    category: 'all',
    pool: [],
    current: 0,
    score: 0,
    answered: false,
    selected: -1
  };

  var $modeTabs = $('.challenge-mode-tab');
  var $catGrid = $('#challengeCatGrid');
  var $quizPanel = $('#challengeQuizPanel');
  var $bookPanel = $('#challengeBookPanel');
  var $startBtn = $('#challengeStartBtn');
  var $hostBubbleWrap = $('#hostBubbleWrap');
  var $hostBubbleToggle = $('#hostBubbleToggle');
  var $hostBubbleText = $('#hostBubbleText');
  var $hostMood = $('#hostCharacter');

  function say(text, mood) {
    $hostBubbleText.text(text);
    if (mood) {
      $hostMood.attr('data-mood', mood);
    }
  }

  function setBubbleCollapsed(collapsed) {
    $hostBubbleWrap.toggleClass('is-collapsed', collapsed);
    $hostBubbleToggle.attr('aria-expanded', collapsed ? 'false' : 'true');
    try {
      sessionStorage.setItem('challengeHostBubble', collapsed ? 'collapsed' : 'expanded');
    } catch (e) { /* ignore */ }
  }

  $hostBubbleToggle.on('click', function () {
    setBubbleCollapsed(!$hostBubbleWrap.hasClass('is-collapsed'));
  });

  if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('challengeHostBubble') === 'collapsed') {
    setBubbleCollapsed(true);
  }

  function randomLine(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function filterQuestions(category) {
    if (category === 'all') return challengeQuestions.slice();
    return challengeQuestions.filter(function (q) { return q.category === category; });
  }

  function buildCategoryGrid() {
    $catGrid.empty();
    challengeCategories.forEach(function (cat) {
      var count = filterQuestions(cat.id).length;
      $catGrid.append(
        '<button type="button" class="challenge-cat-card' + (state.category === cat.id ? ' is-active' : '') +
          '" data-cat="' + cat.id + '">' +
          '<span class="challenge-cat-icon">' + cat.icon + '</span>' +
          '<strong>' + cat.name + '</strong>' +
          '<small>' + cat.desc + '</small>' +
          '<em>' + count + ' 题</em>' +
        '</button>'
      );
    });
  }

  function renderBooklet() {
    var $list = $('#challengeBookList');
    $list.empty();
    var pool = filterQuestions(state.category);
    if (!pool.length) {
      $list.append('<p class="challenge-book-empty">该题型暂无题目。</p>');
      return;
    }
    pool.forEach(function (q, i) {
      var cat = challengeCategories.find(function (c) { return c.id === q.category; });
      var letters = ['A', 'B', 'C', 'D'];
      $list.append(
        '<article class="challenge-book-item">' +
          '<header class="challenge-book-item-head">' +
            '<span class="challenge-book-num">' + (i + 1) + '</span>' +
            '<span class="challenge-book-cat">' + (cat ? cat.name : '') + '</span>' +
          '</header>' +
          '<h4>' + q.question + '</h4>' +
          '<ul class="challenge-book-options">' +
            q.options.map(function (opt, j) {
              return '<li class="' + (j === q.answer ? 'is-answer' : '') + '">' +
                letters[j] + '. ' + opt + (j === q.answer ? ' ✓' : '') +
              '</li>';
            }).join('') +
          '</ul>' +
          '<p class="challenge-book-exp">' + q.explanation + '</p>' +
        '</article>'
      );
    });
  }

  function showSetup() {
    $quizPanel.attr('hidden', true);
    $('#challengeResult').attr('hidden', true);
    $('#challengeQuizActive').attr('hidden', true);
    $startBtn.removeClass('d-none');
    buildCategoryGrid();
    if (state.mode === 'book') {
      $bookPanel.removeAttr('hidden');
      renderBooklet();
      say(hostLines.booklet, 'read');
    } else {
      $bookPanel.attr('hidden', true);
      say(hostLines.pick, 'happy');
    }
  }

  function startQuiz() {
    var pool = filterQuestions(state.category);
    if (pool.length < 1) {
      say('这个题型还没有题目哦～', 'sad');
      return;
    }
    state.pool = shuffle(pool).slice(0, Math.min(QUESTIONS_PER_ROUND, pool.length));
    state.current = 0;
    state.score = 0;
    state.answered = false;
    state.selected = -1;

    $bookPanel.attr('hidden', true);
    $startBtn.addClass('d-none');
    $quizPanel.removeAttr('hidden');
    $('#challengeResult').attr('hidden', true);
    $('#challengeQuizActive').removeAttr('hidden');
    say('第 1 题，加油！', 'excited');
    renderQuestion();
  }

  function renderQuestion() {
    var q = state.pool[state.current];
    var letters = ['A', 'B', 'C', 'D'];
    var total = state.pool.length;
    var pct = ((state.current) / total) * 100;

    $('#challengeProgressFill').css('width', pct + '%');
    $('#challengeProgressText').text('第 ' + (state.current + 1) + ' / ' + total + ' 题');
    $('#challengeScoreLive').text('得分 ' + state.score);
    $('#challengeQuestionText').text(q.question);

    var $opts = $('#challengeOptions');
    $opts.empty();
    q.options.forEach(function (opt, i) {
      $opts.append(
        '<button type="button" class="challenge-option" data-index="' + i + '">' +
          '<span class="challenge-option-letter">' + letters[i] + '</span>' +
          '<span class="challenge-option-text">' + opt + '</span>' +
        '</button>'
      );
    });

    $('#challengeExplain').attr('hidden', true).empty();
    $('#challengeNextBtn').addClass('d-none');
    state.answered = false;
    state.selected = -1;
  }

  function revealAnswer(index) {
    if (state.answered) return;
    state.answered = true;
    state.selected = index;
    var q = state.pool[state.current];
    var correct = index === q.answer;

    if (correct) {
      state.score += 10;
      say(randomLine(hostLines.correct), 'happy');
    } else {
      say(randomLine(hostLines.wrong), 'think');
    }

    $('#challengeScoreLive').text('得分 ' + state.score);
    $('.challenge-option').each(function () {
      var i = parseInt($(this).data('index'), 10);
      $(this).prop('disabled', true);
      if (i === q.answer) $(this).addClass('is-correct');
      if (i === index && !correct) $(this).addClass('is-wrong');
    });

    var letters = ['A', 'B', 'C', 'D'];
    $('#challengeExplain').removeAttr('hidden').html(
      '<strong>' + (correct ? '回答正确' : '正确答案是 ' + letters[q.answer]) + '</strong>' +
      '<p>' + q.explanation + '</p>'
    );
    $('#challengeNextBtn').removeClass('d-none').text(
      state.current >= state.pool.length - 1 ? '查看成绩' : '下一题'
    );
  }

  function showResult() {
    $('#challengeQuizActive').attr('hidden', true);
    $('#challengeResult').removeAttr('hidden');
    var total = state.pool.length;
    var max = total * 10;
    var pct = Math.round((state.score / max) * 100);

    $('#challengeFinalScore').text(state.score);
    $('#challengeFinalMax').text(max);
    $('#challengeFinalPct').text(pct + '%');

    var grade = '继续加油';
    if (pct >= 90) grade = '节气大师';
    else if (pct >= 70) grade = '节气达人';
    else if (pct >= 50) grade = '小有心得';
    $('#challengeFinalGrade').text(grade);

    say(hostLines.finish, pct >= 70 ? 'happy' : 'think');
    $startBtn.removeClass('d-none').text('再来一局');
  }

  /* ---- 初始化 ---- */
  buildCategoryGrid();
  say(hostLines.welcome, 'happy');

  $modeTabs.on('click', function () {
    var mode = $(this).data('mode');
    if (state.mode === mode) return;
    state.mode = mode;
    $modeTabs.removeClass('is-active');
    $(this).addClass('is-active');
    $startBtn.toggleClass('d-none', mode === 'book');
    showSetup();
  });

  $catGrid.on('click', '.challenge-cat-card', function () {
    state.category = $(this).data('cat');
    $catGrid.find('.challenge-cat-card').removeClass('is-active');
    $(this).addClass('is-active');
    if (state.mode === 'book') renderBooklet();
    else say('已选「' + $(this).find('strong').text() + '」，准备好了就开始吧！', 'happy');
  });

  $startBtn.on('click', function () {
    if ($('#challengeResult').is(':visible') && !$('#challengeQuizActive').is(':visible')) {
      $('#challengeResult').attr('hidden', true);
    }
    startQuiz();
  });

  $('#challengeOptions').on('click', '.challenge-option', function () {
    revealAnswer(parseInt($(this).data('index'), 10));
  });

  $('#challengeNextBtn').on('click', function () {
    if (state.current >= state.pool.length - 1) {
      showResult();
      return;
    }
    state.current += 1;
    say('第 ' + (state.current + 1) + ' 题～', 'excited');
    renderQuestion();
  });

  $('#challengeBackSetup').on('click', function () {
    showSetup();
  });
});
