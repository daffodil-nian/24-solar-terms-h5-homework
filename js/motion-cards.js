/**
 * Truus 式卡片惯性悬浮（纯 jQuery，无 GSAP）
 * 参考 https://truus-awwward-website.vercel.app/ MotionCards
 */
$(document).ready(function () {
  'use strict';

  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var rotations = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5];

  $('.motion-card').each(function (i) {
    var $card = $(this);
    var $inner = $card.find('.motion-card-inner');
    if (!$inner.length) return;

    var baseRot = rotations[i % rotations.length];
    var lastX = 0;
    var lastY = 0;
    var speedX = 0;
    var speedY = 0;
    var animId = null;

    $inner.css('transform', 'rotate(' + baseRot + 'deg)');

    function cancelAnim() {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }

    function runInertia() {
      cancelAnim();
      var vx = speedX * 20;
      var vy = speedY * 20;
      var vr = speedX * 1.5;
      var x = 0;
      var y = 0;
      var rot = baseRot;

      function tick() {
        x += vx;
        y += vy;
        rot += vr;
        vx *= 0.88;
        vy *= 0.88;
        vr *= 0.88;
        x += (0 - x) * 0.12;
        y += (0 - y) * 0.12;
        rot += (baseRot - rot) * 0.12;

        $inner.css('transform', 'translate(' + x + 'px,' + y + 'px) rotate(' + rot + 'deg)');

        if (Math.abs(vx) > 0.2 || Math.abs(vy) > 0.2 || Math.abs(x) > 0.3 || Math.abs(y) > 0.3 || Math.abs(rot - baseRot) > 0.2) {
          animId = requestAnimationFrame(tick);
        } else {
          $inner.css('transform', 'rotate(' + baseRot + 'deg)');
          animId = null;
        }
      }

      animId = requestAnimationFrame(tick);
    }

    $card.on('mouseenter', function (e) {
      cancelAnim();
      speedX = speedY = 0;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    $card.on('mousemove', function (e) {
      speedX = e.clientX - lastX;
      speedY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    $card.on('mouseleave', runInertia);
  });
});
