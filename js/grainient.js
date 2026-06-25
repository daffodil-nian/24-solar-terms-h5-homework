/**
 * Grainient · React Bits 纯 JS 移植（WebGL2，无 React / 无 ogl）
 */
(function (window) {
  'use strict';

  var VERT = '#version 300 es\nin vec2 position;\nvoid main(){gl_Position=vec4(position,0.0,1.0);}\n';

  var FRAG = '#version 300 es\nprecision highp float;\nuniform vec2 iResolution;\nuniform float iTime;\nuniform float uTimeSpeed;\nuniform float uColorBalance;\nuniform float uWarpStrength;\nuniform float uWarpFrequency;\nuniform float uWarpSpeed;\nuniform float uWarpAmplitude;\nuniform float uBlendAngle;\nuniform float uBlendSoftness;\nuniform float uRotationAmount;\nuniform float uNoiseScale;\nuniform float uGrainAmount;\nuniform float uGrainScale;\nuniform float uGrainAnimated;\nuniform float uContrast;\nuniform float uGamma;\nuniform float uSaturation;\nuniform vec2 uCenterOffset;\nuniform float uZoom;\nuniform vec3 uColor1;\nuniform vec3 uColor2;\nuniform vec3 uColor3;\nout vec4 fragColor;\n#define S(a,b,t) smoothstep(a,b,t)\nmat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}\nvec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}\nvoid mainImage(out vec4 o, vec2 C){\n  float t=iTime*uTimeSpeed;\n  vec2 uv=C/iResolution.xy;\n  float ratio=iResolution.x/iResolution.y;\n  vec2 tuv=uv-0.5+uCenterOffset;\n  tuv/=max(uZoom,0.001);\n  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);\n  tuv.y*=1.0/ratio;\n  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));\n  tuv.y*=ratio;\n  float frequency=uWarpFrequency;\n  float ws=max(uWarpStrength,0.001);\n  float amplitude=uWarpAmplitude/ws;\n  float warpTime=t*uWarpSpeed;\n  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;\n  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);\n  vec3 colLav=uColor1;\n  vec3 colOrg=uColor2;\n  vec3 colDark=uColor3;\n  float b=uColorBalance;\n  float s=max(uBlendSoftness,0.0);\n  mat2 blendRot=Rot(radians(uBlendAngle));\n  float blendX=(tuv*blendRot).x;\n  float edge0=-0.3-b-s;\n  float edge1=0.2-b+s;\n  float v0=0.5-b+s;\n  float v1=-0.3-b-s;\n  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));\n  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));\n  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));\n  vec2 grainUv=uv*max(uGrainScale,0.001);\n  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}\n  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);\n  col+=(grain-0.5)*uGrainAmount;\n  col=(col-0.5)*uContrast+0.5;\n  float luma=dot(col,vec3(0.2126,0.7152,0.0722));\n  col=mix(vec3(luma),col,uSaturation);\n  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));\n  col=clamp(col,0.0,1.0);\n  o=vec4(col,1.0);\n}\nvoid main(){vec4 o=vec4(0.0);mainImage(o,gl_FragCoord.xy);fragColor=o;}\n';

  function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return [1, 1, 1];
    return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255];
  }

  function createShader(gl, type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn('Grainient shader:', gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  function initGrainient(container, userOpts) {
    if (!container) return function () {};

    var opts = $.extend({
      color1: '#7de8b8',
      color2: '#3cb878',
      color3: '#1a4a38',
      timeSpeed: 0.25,
      colorBalance: 0.0,
      warpStrength: 1.0,
      warpFrequency: 5.0,
      warpSpeed: 2.0,
      warpAmplitude: 50.0,
      blendAngle: 0.0,
      blendSoftness: 0.05,
      rotationAmount: 500.0,
      noiseScale: 2.0,
      grainAmount: 0.1,
      grainScale: 2.0,
      grainAnimated: false,
      contrast: 1.5,
      gamma: 1.0,
      saturation: 1.0,
      centerX: 0.0,
      centerY: 0.0,
      zoom: 0.9
    }, userOpts || {});

    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl2', { alpha: false, antialias: false });
    if (!gl) {
      container.innerHTML = '<div class="grainient-fallback"></div>';
      return function () {};
    }

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    var vs = createShader(gl, gl.VERTEX_SHADER, VERT);
    var fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return function () {};

    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('Grainient program:', gl.getProgramInfoLog(prog));
      return function () {};
    }
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var locPos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(locPos);
    gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);

    var uniforms = {
      iTime: gl.getUniformLocation(prog, 'iTime'),
      iResolution: gl.getUniformLocation(prog, 'iResolution'),
      uTimeSpeed: gl.getUniformLocation(prog, 'uTimeSpeed'),
      uColorBalance: gl.getUniformLocation(prog, 'uColorBalance'),
      uWarpStrength: gl.getUniformLocation(prog, 'uWarpStrength'),
      uWarpFrequency: gl.getUniformLocation(prog, 'uWarpFrequency'),
      uWarpSpeed: gl.getUniformLocation(prog, 'uWarpSpeed'),
      uWarpAmplitude: gl.getUniformLocation(prog, 'uWarpAmplitude'),
      uBlendAngle: gl.getUniformLocation(prog, 'uBlendAngle'),
      uBlendSoftness: gl.getUniformLocation(prog, 'uBlendSoftness'),
      uRotationAmount: gl.getUniformLocation(prog, 'uRotationAmount'),
      uNoiseScale: gl.getUniformLocation(prog, 'uNoiseScale'),
      uGrainAmount: gl.getUniformLocation(prog, 'uGrainAmount'),
      uGrainScale: gl.getUniformLocation(prog, 'uGrainScale'),
      uGrainAnimated: gl.getUniformLocation(prog, 'uGrainAnimated'),
      uContrast: gl.getUniformLocation(prog, 'uContrast'),
      uGamma: gl.getUniformLocation(prog, 'uGamma'),
      uSaturation: gl.getUniformLocation(prog, 'uSaturation'),
      uCenterOffset: gl.getUniformLocation(prog, 'uCenterOffset'),
      uZoom: gl.getUniformLocation(prog, 'uZoom'),
      uColor1: gl.getUniformLocation(prog, 'uColor1'),
      uColor2: gl.getUniformLocation(prog, 'uColor2'),
      uColor3: gl.getUniformLocation(prog, 'uColor3')
    };

    function applyUniforms() {
      var c1 = hexToRgb(opts.color1);
      var c2 = hexToRgb(opts.color2);
      var c3 = hexToRgb(opts.color3);
      gl.uniform1f(uniforms.uTimeSpeed, opts.timeSpeed);
      gl.uniform1f(uniforms.uColorBalance, opts.colorBalance);
      gl.uniform1f(uniforms.uWarpStrength, opts.warpStrength);
      gl.uniform1f(uniforms.uWarpFrequency, opts.warpFrequency);
      gl.uniform1f(uniforms.uWarpSpeed, opts.warpSpeed);
      gl.uniform1f(uniforms.uWarpAmplitude, opts.warpAmplitude);
      gl.uniform1f(uniforms.uBlendAngle, opts.blendAngle);
      gl.uniform1f(uniforms.uBlendSoftness, opts.blendSoftness);
      gl.uniform1f(uniforms.uRotationAmount, opts.rotationAmount);
      gl.uniform1f(uniforms.uNoiseScale, opts.noiseScale);
      gl.uniform1f(uniforms.uGrainAmount, opts.grainAmount);
      gl.uniform1f(uniforms.uGrainScale, opts.grainScale);
      gl.uniform1f(uniforms.uGrainAnimated, opts.grainAnimated ? 1.0 : 0.0);
      gl.uniform1f(uniforms.uContrast, opts.contrast);
      gl.uniform1f(uniforms.uGamma, opts.gamma);
      gl.uniform1f(uniforms.uSaturation, opts.saturation);
      gl.uniform2f(uniforms.uCenterOffset, opts.centerX, opts.centerY);
      gl.uniform1f(uniforms.uZoom, opts.zoom);
      gl.uniform3f(uniforms.uColor1, c1[0], c1[1], c1[2]);
      gl.uniform3f(uniforms.uColor2, c2[0], c2[1], c2[2]);
      gl.uniform3f(uniforms.uColor3, c3[0], c3[1], c3[2]);
    }

    function resize() {
      var w = Math.max(1, container.clientWidth);
      var h = Math.max(1, container.clientHeight);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.iResolution, canvas.width, canvas.height);
    }

    var raf = 0;
    var visible = true;
    var pageVisible = !document.hidden;
    var t0 = performance.now();

    function render(t) {
      gl.uniform1f(uniforms.iTime, (t - t0) * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    }

    function start() {
      if (visible && pageVisible && !raf) raf = requestAnimationFrame(render);
    }

    function stop() {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }

    applyUniforms();
    resize();

    if (window.ResizeObserver) {
      var ro = new ResizeObserver(resize);
      ro.observe(container);
    } else {
      $(window).on('resize.grainient', resize);
    }

    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        visible ? start() : stop();
      }, { threshold: 0 });
      io.observe(container);
    }

    $(document).on('visibilitychange.grainient', function () {
      pageVisible = !document.hidden;
      pageVisible ? start() : stop();
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      start();
    } else {
      gl.uniform1f(uniforms.iTime, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    return function destroy() {
      stop();
      $(window).off('resize.grainient');
      $(document).off('visibilitychange.grainient');
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }

  window.initGrainient = initGrainient;
})(window);
