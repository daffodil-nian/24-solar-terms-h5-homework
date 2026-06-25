/**
 * 节气贪吃蛇 · 游戏页 games.html
 * 按节气顺序吃对应 icon；吃错不增长，找对才前进；走完 24 个循环
 */
(function ($) {
  'use strict';

  if (typeof solarTerms === 'undefined' || typeof termSlugs === 'undefined') return;

  var COLS = 24;
  var ROWS = 14;
  var TICK_MS = 140;
  var FOOD_COUNT = 5;
  var ICON_BASE = '../images/terms/';

  var SEASON_COLOR = {
    spring: '#5aab9a',
    summer: '#4aa8b8',
    autumn: '#5a9aaa',
    winter: '#6ab8c8'
  };

  var canvas, ctx, cellSize;
  var snake, dir, nextDir, foods, nextIdx, score, rounds, running, paused, loopTimer;
  var iconCache = {};
  var flashTimer;

  function slugAt(i) {
    return termSlugs[solarTerms[i].name];
  }

  function preloadIcons() {
    solarTerms.forEach(function (t, i) {
      var slug = slugAt(i);
      if (!slug || iconCache[slug]) return;
      var img = new Image();
      var chain = [ICON_BASE + slug + '.png', ICON_BASE + slug + '.svg'];
      var ci = 0;
      img.onload = function () {
        iconCache[slug] = img;
      };
      img.onerror = function () {
        ci += 1;
        if (ci < chain.length) {
          img.src = chain[ci];
        }
      };
      img.src = chain[0];
    });
  }

  function randCell() {
    return {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS)
    };
  }

  function occupied(x, y, skipFoodIdx) {
    var i;
    for (i = 0; i < snake.length; i++) {
      if (snake[i].x === x && snake[i].y === y) return true;
    }
    for (i = 0; i < foods.length; i++) {
      if (skipFoodIdx === i) continue;
      if (foods[i].x === x && foods[i].y === y) return true;
    }
    return false;
  }

  function spawnOneFood(forceIdx) {
    var cell;
    var tries = 0;
    do {
      cell = randCell();
      tries += 1;
    } while (occupied(cell.x, cell.y) && tries < 200);
    if (tries >= 200) return null;

    var termIdx = forceIdx !== undefined ? forceIdx : Math.floor(Math.random() * 24);
    return { x: cell.x, y: cell.y, termIdx: termIdx };
  }

  function ensureFoods() {
    foods = [];
    var i;
    var hasTarget = false;

    for (i = 0; i < FOOD_COUNT; i++) {
      var f = spawnOneFood();
      if (f) foods.push(f);
    }

    for (i = 0; i < foods.length; i++) {
      if (foods[i].termIdx === nextIdx) {
        hasTarget = true;
        break;
      }
    }

    if (!hasTarget) {
      if (foods.length) {
        foods[0].termIdx = nextIdx;
        var pos = spawnOneFood();
        if (pos) {
          foods[0].x = pos.x;
          foods[0].y = pos.y;
        }
      } else {
        var target = spawnOneFood(nextIdx);
        if (target) foods.push(target);
      }
    }
  }

  function resetGame() {
    snake = [
      { x: 5, y: Math.floor(ROWS / 2) },
      { x: 4, y: Math.floor(ROWS / 2) },
      { x: 3, y: Math.floor(ROWS / 2) }
    ];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    nextIdx = 0;
    score = 0;
    rounds = 1;
    running = false;
    paused = false;
    ensureFoods();
    updatePanel();
    draw();
    $('#termSnakeOverlay').removeClass('is-hidden');
    $('#termSnakeOverlayTitle').text('节气贪吃蛇');
    $('#termSnakeOverlayDesc').text('按二十四节气顺序吃对应 icon · 吃错不前进 · 走完一轮循环继续');
  }

  function startGame() {
    running = true;
    paused = false;
    $('#termSnakeOverlay').addClass('is-hidden');
    if (loopTimer) clearInterval(loopTimer);
    loopTimer = setInterval(tick, TICK_MS);
  }

  function pauseGame() {
    if (!running) return;
    paused = !paused;
    $('#termSnakePauseBtn').text(paused ? '继续' : '暂停');
  }

  function gameOver() {
    running = false;
    clearInterval(loopTimer);
    loopTimer = null;
    $('#termSnakeOverlay').removeClass('is-hidden');
    $('#termSnakeOverlayTitle').text('游戏结束');
    $('#termSnakeOverlayDesc').text('得分 ' + score + ' · 完成 ' + (rounds - 1) + ' 轮 · 点击开始再来');
  }

  function showFlash(msg) {
    var $f = $('#termSnakeFlash');
    $f.text(msg).addClass('is-show');
    clearTimeout(flashTimer);
    flashTimer = setTimeout(function () {
      $f.removeClass('is-show');
    }, 900);
  }

  function updatePanel() {
    var term = solarTerms[nextIdx];
    var slug = slugAt(nextIdx);
    var $icon = $('#termSnakeTargetIcon');
    $('#termSnakeTargetName').text(term.name);
    $('#termSnakeTargetHint').text('第 ' + (nextIdx + 1) + ' / 24 · ' + term.desc);
    $('#termSnakeScore').text(score);
    $('#termSnakeRound').text(rounds);
    $('#termSnakeProgress').css('width', ((nextIdx / 24) * 100) + '%');
    $('#termSnakeProgressLabel').text(nextIdx + ' / 24');

    if (slug && iconCache[slug] && iconCache[slug].complete && iconCache[slug].naturalWidth) {
      $('#termSnakeTargetText').hide();
      $icon.attr('src', iconCache[slug].src).show();
    } else {
      $icon.hide();
      $('#termSnakeTargetText').text(term.name).css('background', SEASON_COLOR[term.season] || '#5ec4d4').show();
    }
  }

  function tick() {
    if (!running || paused) return;

    if (nextDir.x !== -dir.x || nextDir.y !== -dir.y) {
      dir = nextDir;
    }

    var head = snake[0];
    var nx = head.x + dir.x;
    var ny = head.y + dir.y;

    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) {
      gameOver();
      return;
    }

    var i;
    for (i = 0; i < snake.length; i++) {
      if (snake[i].x === nx && snake[i].y === ny) {
        gameOver();
        return;
      }
    }

    var ateIdx = -1;
    for (i = 0; i < foods.length; i++) {
      if (foods[i].x === nx && foods[i].y === ny) {
        ateIdx = i;
        break;
      }
    }

    if (ateIdx >= 0) {
      var food = foods[ateIdx];
      if (food.termIdx === nextIdx) {
        snake.unshift({ x: nx, y: ny });
        score += 1;
        nextIdx += 1;
        if (nextIdx >= 24) {
          nextIdx = 0;
          rounds += 1;
          showFlash('一轮完成 · 从立春继续');
        }
        foods.splice(ateIdx, 1);
        while (foods.length < FOOD_COUNT) {
          var nf = spawnOneFood();
          if (!nf) break;
          nf.termIdx = Math.floor(Math.random() * 24);
          foods.push(nf);
        }
        ensureFoods();
        updatePanel();
      } else {
        snake.unshift({ x: nx, y: ny });
        snake.pop();
        showFlash('顺序不对 · 请找「' + solarTerms[nextIdx].name + '」');
      }
    } else {
      snake.unshift({ x: nx, y: ny });
      snake.pop();
    }

    draw();
  }

  function drawCellFood(f) {
    var cx = f.x * cellSize + cellSize / 2;
    var cy = f.y * cellSize + cellSize / 2;
    var r = cellSize * 0.38;
    var slug = slugAt(f.termIdx);
    var isTarget = f.termIdx === nextIdx;

    if (isTarget) {
      ctx.beginPath();
      ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(42, 144, 144, 0.85)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    if (slug && iconCache[slug] && iconCache[slug].complete) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(iconCache[slug], cx - r, cy - r, r * 2, r * 2);
      ctx.restore();
    } else {
      var term = solarTerms[f.termIdx];
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = SEASON_COLOR[term.season] || '#5ec4d4';
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold ' + Math.max(10, cellSize * 0.38) + 'px KaiTi, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(term.name, cx, cy + 1);
    }
  }

  function draw() {
    if (!ctx) return;
    var w = canvas.width;
    var h = canvas.height;

    ctx.fillStyle = '#f4fbfb';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(42, 144, 144, 0.06)';
    ctx.lineWidth = 1;
    var x;
    for (x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cellSize, 0);
      ctx.lineTo(x * cellSize, h);
      ctx.stroke();
    }
    var y;
    for (y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellSize);
      ctx.lineTo(w, y * cellSize);
      ctx.stroke();
    }

    foods.forEach(drawCellFood);

    snake.forEach(function (seg, i) {
      var px = seg.x * cellSize + 1;
      var py = seg.y * cellSize + 1;
      var sz = cellSize - 2;
      if (i === 0) {
        ctx.fillStyle = '#2a9090';
      } else {
        ctx.fillStyle = 'rgba(42, 144, 144, ' + (0.85 - i * 0.02) + ')';
      }
      ctx.fillRect(px, py, sz, sz);
    });
  }

  function resizeCanvas() {
    var wrap = document.getElementById('termSnakeCanvasWrap');
    if (!wrap || !canvas) return;
    var maxW = wrap.clientWidth;
    cellSize = Math.floor(maxW / COLS);
    if (cellSize < 12) cellSize = 12;
    canvas.width = cellSize * COLS;
    canvas.height = cellSize * ROWS;
    draw();
  }

  function setDirection(x, y) {
    if (!running || paused) return;
    if (x === -dir.x && y === -dir.y) return;
    nextDir = { x: x, y: y };
  }

  $(function () {
    canvas = document.getElementById('termSnakeCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    preloadIcons();
    resetGame();
    resizeCanvas();

    $(window).on('resize', resizeCanvas);

    $('#termSnakeStartBtn').on('click', startGame);
    $('#termSnakePauseBtn').on('click', pauseGame);
    $('#termSnakeResetBtn').on('click', function () {
      clearInterval(loopTimer);
      resetGame();
    });

    $(document).on('keydown.termSnake', function (e) {
      if (!$('#termSnakeCanvas').length) return;
      var k = e.key;
      if (k === 'ArrowUp' || k === 'w' || k === 'W') { e.preventDefault(); setDirection(0, -1); }
      else if (k === 'ArrowDown' || k === 's' || k === 'S') { e.preventDefault(); setDirection(0, 1); }
      else if (k === 'ArrowLeft' || k === 'a' || k === 'A') { e.preventDefault(); setDirection(-1, 0); }
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') { e.preventDefault(); setDirection(1, 0); }
      else if (k === ' ' && running) { e.preventDefault(); pauseGame(); }
    });

    $('.home-snake-dpad [data-dir]').on('click', function () {
      var d = $(this).data('dir');
      if (d === 'up') setDirection(0, -1);
      else if (d === 'down') setDirection(0, 1);
      else if (d === 'left') setDirection(-1, 0);
      else if (d === 'right') setDirection(1, 0);
    });

    setInterval(function () {
      if (running) draw();
    }, 500);
  });
})(jQuery);
