/* NanoBrasil — Mergulho na escala (guiado pelo scroll)
   Zoom contínuo, estilo "potências de dez":
   0 carro (ilustração vetorial) → 1 pintura (grãos micrométricos) → 2 aglomerado de nanopartículas → 3 uma nanopartícula (rede atômica) */
(() => {
  'use strict';
  const sec = document.querySelector('[data-vortex]');
  const cv = document.querySelector('[data-vortex-canvas]');
  if (!sec || !cv) return;
  const ctx = cv.getContext('2d');
  const car = sec.querySelector('[data-dive-car]');
  const steps = [...sec.querySelectorAll('[data-vstep]')];
  const bar = sec.querySelector('[data-vbar]');
  const scaleTxt = sec.querySelector('[data-scale-value]');
  const scaleLine = sec.querySelector('[data-scale-line]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2, E = 7; // fator de ampliação entre níveis
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

  let W = 0, H = 0, DPR = 1, M = 0, visible = false, raf, progress = 0, shown = 0, t0 = performance.now();
  let carOX = 0, carOY = 0, lastIdx = -1, lastScale = '';

  /* sprites */
  const glow = (rgb, s = 64) => {
    const c = document.createElement('canvas'); c.width = c.height = s;
    const g = c.getContext('2d'), gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    gr.addColorStop(0, `rgba(${rgb},1)`); gr.addColorStop(.25, `rgba(${rgb},.85)`); gr.addColorStop(.6, `rgba(${rgb},.12)`); gr.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = gr; g.fillRect(0, 0, s, s); return c;
  };
  const ball = (light, mid, dark, s = 96) => { // esfera sombreada
    const c = document.createElement('canvas'); c.width = c.height = s;
    const g = c.getContext('2d'), gr = g.createRadialGradient(s * .36, s * .32, s * .04, s / 2, s / 2, s / 2);
    gr.addColorStop(0, light); gr.addColorStop(.45, mid); gr.addColorStop(1, dark);
    g.fillStyle = gr; g.beginPath(); g.arc(s / 2, s / 2, s / 2 - 1, 0, TAU); g.fill(); return c;
  };
  const GW = glow('255,255,255'), GO = glow('242,100,48');
  const BG = ball('#F4F4F6', '#8C8C96', '#1A1A1F'), BO = ball('#FFC2A3', '#F26430', '#3A1206'), BD = ball('#6C6C76', '#2E2E35', '#0E0E12');

  /* níveis (coordenadas normalizadas, raio 1) */
  const rnd = (n, f) => Array.from({ length: n }, f);
  const inDisk = () => { const a = Math.random() * TAU, r = Math.sqrt(Math.random()); return [Math.cos(a) * r, Math.sin(a) * r]; };
  // continuidade entre níveis: cada nível nasce de um elemento central do anterior, com o mesmo tamanho na tela.
  // grão central (raio HG) ≙ aglomerado inteiro; partícula central (raio HP) ≙ rede atômica.
  const HG = .0666, HP = .09;
  const grains = [{ x: 0, y: 0, r: HG, s: .8, hero: true }].concat(rnd(2400, () => {
    // espalhados por uma área grande: no início formam uma textura fina sobre a pintura, não um disco de bolhas
    let x, y, r; do { [x, y] = inDisk(); x *= 3.4; y *= 3.4; r = .025 + Math.random() * .07; } while (Math.hypot(x, y) < HG + r + .01);
    return { x, y, r, s: Math.random() };
  }));
  const cluster = (() => {
    const out = [{ x: 0, y: 0, r: HP, o: false, z: .5, hero: true }], R = .055;
    for (let i = 0; out.length < 240 && i < 20000; i++) {
      const [x, y] = inDisk(); const p = { x: x * .95, y: y * .95, r: R * (.8 + Math.random() * .4) };
      if (out.every(q => Math.hypot(q.x - p.x, q.y - p.y) > (q.r + p.r) * .92)) out.push(p);
    }
    out.forEach(p => { if (!p.hero) { p.o = Math.random() < .12; p.z = Math.random(); } });
    return out.sort((a, b) => a.z - b.z);
  })();
  const atoms = (() => { // rede cúbica de face centrada recortada numa esfera
    const pts = [], m = 7, s = 2 / m;
    for (let x = 0; x <= m; x++) for (let y = 0; y <= m; y++) for (let z = 0; z <= m; z++) {
      [[x, y, z], [x + .5, y + .5, z], [x + .5, y, z + .5], [x, y + .5, z + .5]].forEach(c => {
        const p = c.map(v => (v - m / 2) * s); if (Math.hypot(...p) <= 1) pts.push(p);
      });
    }
    return pts;
  })();

  function measureCar() {
    if (!car) return;
    car.style.transform = 'none';
    const dot = car.querySelector('.dive__target').getBoundingClientRect();
    const box = cv.getBoundingClientRect(), cr = car.getBoundingClientRect();
    const dx = dot.left + dot.width / 2, dy = dot.top + dot.height / 2;
    car.style.transformOrigin = (dx - cr.left) + 'px ' + (dy - cr.top) + 'px';
    carOX = W / 2 - (dx - box.left);
    carOY = H * .38 - (dy - box.top);
  }
  function layout(force) {
    const nw = cv.clientWidth, nh = cv.clientHeight;
    // no celular a barra do navegador muda a altura durante o scroll: só redimensiona em mudanças reais
    if (!force && nw === W && Math.abs(nh - H) < 120) return;
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = nw; H = nh; M = Math.min(W, H);
    cv.width = Math.max(1, W * DPR); cv.height = Math.max(1, H * DPR);
    measureCar();
  }
  function measure() {
    const r = sec.getBoundingClientRect();
    progress = clamp(-r.top / (r.height - innerHeight), 0, 1);
  }

  const vis = (L, k) => smooth(k - .75, k - .25, L) * (1 - smooth(k + .35, k + .85, L));
  const zoomOf = (L, k) => Math.pow(E, L - k);
  function fmtScale(m) {
    const u = m >= 1e-3 ? ['mm', 1e-3] : m >= 1e-6 ? ['µm', 1e-6] : ['nm', 1e-9];
    const v = m / u[1];
    return `${v >= 100 ? Math.round(v / 10) * 10 : v >= 10 ? Math.round(v) : (window.NB_LANG === 'en' ? v.toFixed(1) : v.toFixed(1).replace('.', ','))} ${u[0]}`;
  }

  function frame(now) {
    const t = (now - t0) / 1000;
    // segue o scroll com suavidade, mas salta direto em saltos grandes (não "rebobina")
    if (reduced || Math.abs(progress - shown) > .2) shown = progress;
    else shown += (progress - shown) * .18;
    const p = shown;
    const L = 3.1 * smooth(0, .88, p); // 0 → 3.1

    // nível 0: carro vetorial — zoom na porta (pintura)
    if (car) {
      const c3d = window.NanoCar3D;
      car.style.opacity = (1 - smooth(.3, .72, L)).toFixed(3);
      car.style.visibility = L > .75 ? 'hidden' : 'visible';
      if (c3d && c3d.ready) {
        // carro 3D: a câmera faz o zoom; o contêiner fica parado
        car.style.transform = 'none';
        if (L <= .75) c3d.render(L, t);
      } else {
        const z = Math.min(zoomOf(L, 0), 9), k = smooth(0, .55, L);
        car.style.transform = `translate3d(${(carOX * k).toFixed(1)}px, ${(carOY * k).toFixed(1)}px, 0) scale(${z.toFixed(3)})`;
      }
    }

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H * .38;

    // passagens (cada uma acontece dentro do elemento central do nível anterior)
    const in2 = smooth(1.1, 1.55, L), in3 = smooth(2.2, 2.62, L);

    // nível 1: pintura — grãos micrométricos (surgem como textura, crescem e saem pelas bordas)
    let a = smooth(.3, .8, L) * (1 - smooth(1.35, 1.85, L));
    if (a > .01) {
      const z = zoomOf(L, 1), base = M * .55;
      for (const g of grains) {
        const x = cx + g.x * base * z, y = cy + g.y * base * z, r = g.r * base * z;
        if (x + r < 0 || x - r > W || y + r < 0 || y - r > H || r < .3) continue;
        ctx.globalAlpha = g.hero ? smooth(.3, .8, L) * .85 * (1 - in2) : a * (.35 + g.s * .5);
        if (ctx.globalAlpha < .01) continue;
        ctx.drawImage(BD, x - r, y - r, r * 2, r * 2);
      }
    }
    // nível 2: aglomerado de nanopartículas (nasce dentro do grão central)
    a = in2 * (1 - smooth(2.35, 2.85, L));
    if (a > .01) {
      const z = zoomOf(L, 2), base = M * .27;
      for (const q of cluster) {
        const wob = q.hero ? 0 : Math.sin(t * 1.2 + q.z * 9) * .004;
        const x = cx + (q.x + wob) * base * z, y = cy + (q.y - wob) * base * z, r = q.r * base * z;
        if (x + r < 0 || x - r > W || y + r < 0 || y - r > H) continue;
        ctx.globalAlpha = q.hero ? in2 * (1 - in3) : a;
        if (ctx.globalAlpha < .01) continue;
        ctx.drawImage(q.o ? BO : BG, x - r, y - r, r * 2, r * 2);
      }
    }
    // nível 3: uma nanopartícula — rede atômica girando (nasce da partícula central, no mesmo tamanho)
    a = in3;
    if (a > .01) {
      const z = Math.min(zoomOf(L, 3), 1.15), R = M * .17 * z;
      const ry = t * .35, rx = .45 + Math.sin(t * .25) * .15;
      const cY = Math.cos(ry), sY = Math.sin(ry), cX = Math.cos(rx), sX = Math.sin(rx);
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = a * .28;
      ctx.drawImage(GO, cx - R * 2.2, cy - R * 2.2, R * 4.4, R * 4.4);
      for (const [x0, y0, z0] of atoms) {
        const x1 = x0 * cY + z0 * sY, z1 = -x0 * sY + z0 * cY;
        const y1 = y0 * cX - z1 * sX, z2 = y0 * sX + z1 * cX;
        const k = 3 / (3 + z2), d = clamp((k - .72) / .55, 0, 1);
        const s = R * (.07 + d * .09);
        ctx.globalAlpha = a * (.25 + d * .75);
        ctx.drawImage(d > .94 ? GO : GW, cx + x1 * R * k - s / 2, cy + y1 * R * k - s / 2, s, s);
      }
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.globalAlpha = 1;

    // régua de escala: de 1 cm até ~2 nm (logarítmica) — só toca o DOM quando muda
    const label = fmtScale(Math.pow(10, -2 - L * (6.7 / 3.1)));
    if (scaleTxt && label !== lastScale) { scaleTxt.textContent = label; lastScale = label; }
    if (scaleLine) scaleLine.style.transform = `scaleX(${(.35 + .65 * ((L * 3) % 1)).toFixed(3)})`;
    const idx = L < .55 ? 0 : L < 1.4 ? 1 : L < 2.4 ? 2 : 3;
    if (idx !== lastIdx) { steps.forEach((s, i) => s.classList.toggle('is-on', i === idx)); lastIdx = idx; }
    if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
  }

  const loop = (now) => { frame(now); if (visible) raf = requestAnimationFrame(loop); };
  const start = () => { cancelAnimationFrame(raf); measure(); shown = progress; raf = requestAnimationFrame(loop); };

  layout(true);
  addEventListener('resize', () => layout(false));
  addEventListener('load', () => layout(true)); // fontes/estilos carregados → mede o carro de novo
  addEventListener('scroll', measure, { passive: true }); measure();
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { rootMargin: '200px 0px' }).observe(sec);
})();
