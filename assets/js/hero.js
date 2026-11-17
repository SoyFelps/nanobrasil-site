/* NanoBrasil V2 — Hero: um único enxame de nanopartículas que se transforma
   01 Nanopartícula (esfera) → 02 Rede cristalina → 03 Símbolo NanoBrasil
   Arraste para girar · passe o cursor para afastar · clique para dispersar */
(() => {
  'use strict';
  const hero = document.querySelector('[data-hero]');
  const cv = document.querySelector('[data-hero-canvas]');
  if (!hero || !cv) return;
  const ctx = cv.getContext('2d');
  const content = document.querySelector('[data-hero-content]');
  const hudName = document.querySelector('[data-hud-name]');
  const hudSize = document.querySelector('[data-hud-size]');
  const hudBtns = [...document.querySelectorAll('[data-hud-step]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2, HOLD = 5.5;

  let W = 0, H = 0, DPR = 1, size = 0, cx = 0, cy = 0, mobile = false;
  let N = 0, P = null, shapes = [], ready = false, visible = true;
  let shape = 0, prevShape = 0, morphT = 1, holdT = 0;
  let rotY = 0, rotX = -.25, velY = .0035, dragging = false, lastX = 0, lastY = 0;
  const mouse = { x: -1e4, y: -1e4 };
  let scrollP = 0, last = performance.now();

  const NAMES = {
    pt: [['Nanopartícula', '1–100 nm'], ['Rede cristalina', 'escala atômica'], ['NanoBrasil', 'hub de nanotecnologia']],
    en: [['Nanoparticle', '1–100 nm'], ['Crystal lattice', 'atomic scale'], ['NanoBrasil', 'nanotechnology hub']],
    es: [['Nanopartícula', '1–100 nm'], ['Red cristalina', 'escala atómica'], ['NanoBrasil', 'hub de nanotecnología']],
  }[window.NB_LANG || 'pt'];

  const sprite = (rgb, s = 48) => {
    const c = document.createElement('canvas'); c.width = c.height = s;
    const g = c.getContext('2d'), gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    gr.addColorStop(0, `rgba(${rgb},1)`); gr.addColorStop(.22, `rgba(${rgb},.9)`); gr.addColorStop(.5, `rgba(${rgb},.18)`); gr.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = gr; g.fillRect(0, 0, s, s); return c;
  };
  const SW = sprite('255,255,255'), SO = sprite('242,100,48');

  /* ---- Formas (coordenadas normalizadas ~[-1,1]) ---- */
  function sphere(n) {
    const out = new Float32Array(n * 3), g = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), t = g * i;
      const k = i % 7 === 0 ? .55 + Math.random() * .35 : 1;
      out[i * 3] = Math.cos(t) * r * .92 * k; out[i * 3 + 1] = y * .92 * k; out[i * 3 + 2] = Math.sin(t) * r * .92 * k;
    }
    return out;
  }
  function lattice(n) {
    const pts = [], m = 6, s = 1.5 / m;
    for (let x = 0; x <= m; x++) for (let y = 0; y <= m; y++) for (let z = 0; z <= m; z++) {
      pts.push([x, y, z]);
      if (x < m && y < m) pts.push([x + .5, y + .5, z]);
      if (x < m && z < m) pts.push([x + .5, y, z + .5]);
      if (y < m && z < m) pts.push([x, y + .5, z + .5]);
    }
    const out = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const p = pts[i % pts.length], j = i < pts.length ? 0 : .045;
      out[i * 3] = (p[0] - m / 2) * s + (Math.random() - .5) * j;
      out[i * 3 + 1] = (p[1] - m / 2) * s + (Math.random() - .5) * j;
      out[i * 3 + 2] = (p[2] - m / 2) * s + (Math.random() - .5) * j;
    }
    return out;
  }
  function symbol(n, pts) {
    const out = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const p = pts[(i * 7919) % pts.length];
      out[i * 3] = p[0] * 1.9; out[i * 3 + 1] = p[1] * 1.9; out[i * 3 + 2] = (Math.random() - .5) * .12;
    }
    return out;
  }

  const img = new Image();
  img.src = document.querySelector('link[href$="main.css"]').href.replace(/css\/main\.css.*$/, '') + 'img/brand/symbol-solid.png';
  img.onload = () => {
    const S = 160, c = document.createElement('canvas'); c.width = c.height = S;
    const g = c.getContext('2d'); g.drawImage(img, 0, 0, S, S);
    const d = g.getImageData(0, 0, S, S).data, pts = [];
    for (let y = 0; y < S; y += 2) for (let x = 0; x < S; x += 2) if (d[(y * S + x) * 4 + 3] > 140) pts.push([x / S - .5, y / S - .5]);
    layout();
    N = mobile ? 1400 : 2600;
    shapes = [sphere(N), lattice(N), symbol(N, pts)];
    P = new Float32Array(N * 8); // x, y, vx, vy, fase, raio, cor, atraso
    for (let i = 0; i < N; i++) {
      const o = i * 8;
      P[o] = cx + (Math.random() - .5) * W * 1.4; P[o + 1] = cy + (Math.random() - .5) * H * 1.4;
      P[o + 4] = Math.random() * TAU; P[o + 5] = .5 + Math.random() * 1.1;
      P[o + 6] = Math.random() < .09 ? 1 : 0; P[o + 7] = Math.random() * .35;
    }
    morphT = 0; prevShape = 0; ready = true; setHud();
  };

  function layout() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = Math.max(1, W * DPR); cv.height = Math.max(1, H * DPR);
    mobile = W < 900;
    if (mobile) { size = Math.min(W * .3, 160); cx = W * .5; cy = 64 + Math.min(W * .78, 380) / 2; }
    else { size = Math.min(H * .3, W * .2); cx = W * .72; cy = H * .5; }
  }

  function setHud() {
    if (hudName) hudName.textContent = NAMES[shape][0];
    if (hudSize) hudSize.textContent = NAMES[shape][1];
    hudBtns.forEach((b, i) => { b.classList.remove('is-active'); void b.offsetWidth; b.classList.toggle('is-active', i === shape); });
  }
  function goTo(i) { if (i === shape) return; prevShape = shape; shape = i; morphT = 0; holdT = 0; setHud(); }
  hudBtns.forEach((b, i) => b.addEventListener('click', () => goTo(i)));

  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (!reduced) {
      holdT += dt; morphT = Math.min(1, morphT + dt / 1.8);
      if (holdT > HOLD) goTo((shape + 1) % 3);
      if (!dragging) { rotY += velY; velY += (.0035 - velY) * .02; }
    } else morphT = 1;
    const t = now / 1000;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    const A = shapes[prevShape], B = shapes[shape];
    const sp = 0, scale = size, focal = 3.2, fade = 1; // sem efeitos de scroll no hero (sem fade, sem deslocamento)
    // o símbolo fica de frente: a rotação é suavizada para um leve balanço
    const symW = shape === 2 ? ease(morphT) : (prevShape === 2 ? 1 - ease(morphT) : 0);
    const ry = rotY * (1 - symW) + Math.sin(t * .6) * .35 * symW;
    const cY = Math.cos(ry), sY = Math.sin(ry), rx = rotX * (1 - symW), cX = Math.cos(rx), sX = Math.sin(rx);

    for (let i = 0; i < N; i++) {
      const o = i * 8, j = i * 3;
      const m = ease(Math.min(1, Math.max(0, (morphT - P[o + 7]) / .65)));
      const burst = Math.sin(m * Math.PI) * .35;
      let x = A[j] + (B[j] - A[j]) * m, y = A[j + 1] + (B[j + 1] - A[j + 1]) * m, z = A[j + 2] + (B[j + 2] - A[j + 2]) * m;
      const br = (1 + burst) * (1 + Math.sin(t * 1.3 + P[o + 4]) * .008); x *= br; y *= br; z *= br;
      const x1 = x * cY + z * sY, z1 = -x * sY + z * cY;
      const y1 = y * cX - z1 * sX, z2 = y * sX + z1 * cX;
      const k = focal / (focal + z2);
      const gx = cx + x1 * scale * k, gy = cy + y1 * scale * k - sp * H * .15;

      let vx = P[o + 2], vy = P[o + 3];
      vx += (gx - P[o]) * .09; vy += (gy - P[o + 1]) * .09;
      const dx = P[o] - mouse.x, dy = P[o + 1] - mouse.y, d2 = dx * dx + dy * dy, R = mobile ? 60 : 110;
      if (d2 < R * R) { const d = Math.sqrt(d2) || 1, f = 1 - d / R; vx += dx / d * f * f * 9; vy += dy / d * f * f * 9; }
      vx *= .74; vy *= .74;
      P[o] += vx; P[o + 1] += vy; P[o + 2] = vx; P[o + 3] = vy;

      const depth = Math.max(0, Math.min(1, (k - .72) / .6));
      const s = P[o + 5] * (3.4 + depth * 5.5) * (P[o + 6] ? 1.3 : 1) * (mobile ? .7 : 1);
      ctx.globalAlpha = Math.max(0, fade * (.18 + depth * .82) * (.8 + .2 * Math.sin(t * 2 + P[o + 4])));
      ctx.drawImage(P[o + 6] ? SO : SW, P[o] - s / 2, P[o + 1] - s / 2, s, s);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  let raf;
  const loop = (now) => { if (ready) frame(now); if (!visible) return; raf = requestAnimationFrame(loop); };
  const start = () => { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(loop); };

  addEventListener('resize', () => {
    const om = mobile, ocx = cx, ocy = cy, os = size; layout();
    if (!ready) return;
    if (om !== mobile) { location.reload(); return; }
    for (let i = 0; i < N; i++) { const o = i * 8; P[o] = cx + (P[o] - ocx) * (os ? size / os : 1); P[o + 1] = cy + (P[o + 1] - ocy) * (os ? size / os : 1); }
  });
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    if (dragging) { velY = (e.clientX - lastX) * .006; rotY += velY; rotX = Math.max(-1, Math.min(1, rotX + (e.clientY - lastY) * .004)); lastX = e.clientX; lastY = e.clientY; }
  });
  hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -1e4; dragging = false; });
  hero.addEventListener('pointerdown', e => {
    if (e.target.closest('a, button') || !ready) return;
    dragging = true; lastX = e.clientX; lastY = e.clientY;
    const r = hero.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
    for (let i = 0; i < N; i++) { const o = i * 8, dx = P[o] - mx, dy = P[o + 1] - my, d = Math.hypot(dx, dy) || 1, f = Math.max(0, 1 - d / 420); P[o + 2] += dx / d * f * 26; P[o + 3] += dy / d * f * 26; }
  });
  addEventListener('pointerup', () => { dragging = false; });
  const onScroll = () => {
    const hh = H || hero.clientHeight || innerHeight;
    scrollP = Math.min(1, Math.max(0, scrollY / (hh * .9))) || 0;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(hero);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
  start();
})();
