/* NanoBrasil — interações globais */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  /* ---------- idioma ---------- */
  const LANG = window.NB_LANG || 'pt';
  const LOCALE = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }[LANG];
  const T = {
    pt: { hello: 'Olá, NanoBrasil!', interest: 'Interesse', name: 'Nome', company: 'Empresa', email: 'E-mail', phone: 'Telefone', subject: 'Contato pelo site', wa: 'Olá, NanoBrasil! Vim pelo site e gostaria de falar com a equipe comercial.',
      scale: [['Pessoa', '≈ 1,7 m'], ['Formiga', '≈ 5 mm'], ['Glóbulo vermelho', '≈ 7 µm'], ['Bactéria', '≈ 1 µm'], ['Vírus', '≈ 100 nm'], ['Nanopartícula', '1 – 100 nm']] },
    en: { hello: 'Hello, NanoBrasil!', interest: 'Interest', name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', subject: 'Website contact', wa: 'Hello, NanoBrasil! I found you through your website and would like to talk to your sales team.',
      scale: [['Person', '≈ 1.7 m'], ['Ant', '≈ 5 mm'], ['Red blood cell', '≈ 7 µm'], ['Bacterium', '≈ 1 µm'], ['Virus', '≈ 100 nm'], ['Nanoparticle', '1 – 100 nm']] },
    es: { hello: '¡Hola, NanoBrasil!', interest: 'Interés', name: 'Nombre', company: 'Empresa', email: 'Correo', phone: 'Teléfono', subject: 'Contacto desde el sitio', wa: '¡Hola, NanoBrasil! Llegué por el sitio web y me gustaría hablar con el equipo comercial.',
      scale: [['Persona', '≈ 1,7 m'], ['Hormiga', '≈ 5 mm'], ['Glóbulo rojo', '≈ 7 µm'], ['Bacteria', '≈ 1 µm'], ['Virus', '≈ 100 nm'], ['Nanopartícula', '1 – 100 nm']] },
  }[LANG];
  // base para /assets (as páginas em /en/ e /es/ ficam um nível abaixo)
  const ASSETS = (document.querySelector('link[href$="main.css"]')?.getAttribute('href') || 'assets/css/main.css').replace(/css\/main\.css.*$/, '');

  // seletor de idioma: guarda a escolha e abre a mesma página no outro idioma
  $$('[data-lang-opt]').forEach(a => a.addEventListener('click', e => {
    try { localStorage.setItem('nb-lang', a.dataset.langOpt); } catch (err) {}
    if (location.hash) { e.preventDefault(); location.href = a.getAttribute('href') + location.hash; }
  }));
  $$('[data-lang]').forEach(box => {
    const btn = $('[data-lang-btn]', box);
    const set = (open) => { box.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open); };
    btn.addEventListener('click', (e) => { e.stopPropagation(); set(!box.classList.contains('is-open')); });
    document.addEventListener('click', (e) => { if (!box.contains(e.target)) set(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && box.classList.contains('is-open')) { set(false); btn.focus(); } });
  });
  // aviso de cookies: aparece 5 segundos depois de abrir o site, até a pessoa escolher
  const cookieBox = $('[data-cookie]');
  if (cookieBox) {
    let saved = null;
    try { saved = localStorage.getItem('nb-cookies'); } catch (err) {}
    const close = () => { cookieBox.classList.remove('is-visible'); document.body.classList.remove('cookie-open'); setTimeout(() => { cookieBox.hidden = true; }, 600); };
    if (!saved) {
      setTimeout(() => {
        cookieBox.hidden = false;
        document.documentElement.style.setProperty('--cookie-h', cookieBox.offsetHeight + 'px');
        requestAnimationFrame(() => { cookieBox.classList.add('is-visible'); document.body.classList.add('cookie-open'); });
      }, 5000);
    }
    $$('[data-cookie-choice]', cookieBox).forEach(b => b.addEventListener('click', () => {
      try { localStorage.setItem('nb-cookies', b.dataset.cookieChoice); } catch (err) {}
      close();
    }));
  }
  // mensagem do botão flutuante de WhatsApp no idioma da página
  const wa = $('.wa-float');
  if (wa) wa.href = wa.href.split('?')[0] + '?text=' + encodeURIComponent(T.wa);

  /* ---------- Navegação ---------- */
  const navEl = $('[data-nav]');
  let lastY = scrollY;
  const onScrollNav = () => {
    const y = scrollY;
    navEl.classList.toggle('is-scrolled', y > 20);
    lastY = y;
    // adapta a cor da navegação ao fundo que está exatamente atrás dela (o menu fica sempre visível)
    const under = document.elementsFromPoint(innerWidth / 2, navEl.offsetHeight / 2).find(el => !navEl.contains(el));
    const light = under && under.closest('.section--light, .area-nav') && !under.closest('[data-dark]') && !document.body.classList.contains('menu-open');
    navEl.classList.toggle('on-light', !!light);
  };
  addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  const toggle = $('[data-menu-toggle]');
  toggle?.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  });
  $$('[data-mobile-menu] a').forEach(a => a.addEventListener('click', () => { document.body.classList.remove('menu-open'); document.documentElement.style.overflow = ''; }));

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.reveal, .reveal-scale').forEach(el => io.observe(el));

  /* ---------- Contadores ---------- */
  const fmt = new Intl.NumberFormat(LOCALE);
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target, to = +el.dataset.count, dur = reduced ? 1 : 2200, t0 = performance.now();
      const tick = (t) => {
        const p = clamp((t - t0) / dur, 0, 1), eased = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt.format(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => countIO.observe(el));

  /* ---------- Palavras que acendem com o scroll ---------- */
  const wordBlocks = $$('[data-words]').map(el => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
    el.classList.remove('reveal');
    return { el, words: $$('.w', el) };
  });

  /* ---------- Parallax + progresso de leitura ---------- */
  const parallaxEls = $$('[data-parallax]');
  const progress = $('.progress');
  const article = $('[data-article]');
  let ticking = false;
  const onScrollFx = () => {
    ticking = false;
    const vh = innerHeight;
    if (!reduced) parallaxEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const off = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
      el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)${el.classList.contains('page-hero__img') ? ' scale(1.08)' : ''}`;
    });
    wordBlocks.forEach(({ el, words }) => {
      const r = el.getBoundingClientRect();
      const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    });
    if (progress && article) {
      const r = article.getBoundingClientRect();
      progress.style.transform = `scaleX(${clamp(-r.top / (r.height - vh), 0, 1)})`;
    }
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScrollFx); } }, { passive: true });
  onScrollFx();

  /* ---------- Galeria horizontal ---------- */
  $$('[data-hscroll]').forEach(track => {
    const section = track.closest('section');
    const prev = $('[data-hs-prev]', section), next = $('[data-hs-next]', section);
    const step = () => (track.firstElementChild?.getBoundingClientRect().width || 300) + 20;
    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    const upd = () => {
      if (prev) prev.disabled = track.scrollLeft < 8;
      if (next) next.disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 8;
    };
    track.addEventListener('scroll', upd, { passive: true }); upd();
    // arrastar com o mouse
    let down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 5) { moved = true; track.classList.add('is-dragging'); }
      track.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', () => { if (!down) return; down = false; track.classList.remove('is-dragging'); });
    track.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } }, true);
  });

  /* ---------- Tilt 3D + spotlight + botões magnéticos ---------- */
  if (finePointer && !reduced) {
    $$('[data-tilt]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
    $$('[data-spotlight], .card').forEach(el => el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`);
    }));
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Pipeline de P&D e tabela periódica (home) ---------- */
  const pipeline = $('[data-pipeline]');
  if (pipeline && !reduced) {
    const pipes = $$('.pipe', pipeline); let k = 0;
    const step = () => { pipes.forEach((p, i) => { p.classList.toggle('is-done', i < k); p.classList.toggle('is-on', i === k); }); k = (k + 1) % (pipes.length + 1); };
    step(); setInterval(step, 1400);
  }
  const ptable = $('[data-ptable]');
  if (ptable && !reduced) {
    const pts = $$('[data-pt]', ptable);
    setInterval(() => { pts.forEach(p => p.classList.remove('is-lit')); pts[Math.floor(Math.random() * pts.length)].classList.add('is-lit'); }, 1100);
  }

  /* ---------- Equipe: painel de biografia ---------- */
  const sheet = $('[data-sheet]');
  if (sheet) {
    const data = JSON.parse($('#team-data').textContent);
    let lastFocus;
    const open = (i) => {
      const p = data[i];
      $('[data-sheet-img]', sheet).src = `${ASSETS}img/equipe/${p.img}`;
      $('[data-sheet-img]', sheet).alt = p.name;
      $('[data-sheet-name]', sheet).textContent = p.name;
      $('[data-sheet-role]', sheet).textContent = p.role;
      $('[data-sheet-bio]', sheet).textContent = p.bio;
      lastFocus = document.activeElement;
      sheet.classList.add('is-open');
      document.documentElement.style.overflow = 'hidden';
      setTimeout(() => $('.sheet__close', sheet).focus(), 50);
    };
    const close = () => { sheet.classList.remove('is-open'); document.documentElement.style.overflow = ''; lastFocus?.focus(); };
    $$('[data-member]').forEach(b => b.addEventListener('click', () => open(+b.dataset.member)));
    $$('[data-sheet-close]', sheet).forEach(b => b.addEventListener('click', close));
    addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('is-open')) close(); });
  }

  /* ---------- Busca de notícias ---------- */
  const search = $('[data-news-search]');
  if (search) {
    const cards = $$('[data-news-grid] .news-card'), empty = $('[data-news-empty]');
    const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    search.addEventListener('input', () => {
      const q = norm(search.value.trim()); let n = 0;
      cards.forEach(c => { const ok = !q || norm(c.dataset.search).includes(q); c.hidden = !ok; if (ok) n++; c.classList.toggle('news-card--feature', !q && c === cards[0]); });
      empty.hidden = n > 0;
    });
  }

  /* ---------- Áreas: navegação ativa ---------- */
  const areaNav = $('[data-area-nav]');
  if (areaNav) {
    const links = $$('a', areaNav);
    const aio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.toggle('is-active', l.hash === '#' + e.target.id));
        const act = links.find(l => l.hash === '#' + e.target.id);
        act && areaNav.scrollTo({ left: act.offsetLeft - 20, behavior: 'smooth' });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('[data-area]').forEach(s => aio.observe(s));
  }

  /* ---------- Formulário de contato ---------- */
  const form = $('[data-contact-form]');
  if (form) {
    const q = new URLSearchParams(location.search).get('interesse');
    if (q === 'nanoparticulas') form.querySelector('#i2').checked = true;
    if (q === 'consultoria') form.querySelector('#i3').checked = true;
    let via = 'email';
    $$('[data-via]', form).forEach(b => b.addEventListener('click', () => { via = b.dataset.via; }));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const txt = `${T.hello}\n\n${T.interest}: ${d.interesse}\n${T.name}: ${d.nome}\n${T.company}: ${d.empresa || '-'}\n${T.email}: ${d.email}\n${T.phone}: ${d.telefone || '-'}\n\n${d.mensagem}`;
      if (via === 'whatsapp') window.open(`https://wa.me/5531999346556?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
      else location.href = `mailto:comercial@nanobrasil.net?subject=${encodeURIComponent(T.subject + ' · ' + d.interesse)}&body=${encodeURIComponent(txt)}`;
    });
  }

  /* ---------- Ferramenta de escala (nanotecnologia) ---------- */
  const scale = $('[data-scale]');
  if (scale) {
    const objs = [
      ...['🧍', '🐜', '🩸', '🦠', '🧬', '⚛️'].map((ico, i) => [ico, ...T.scale[i]]),
    ];
    const stage = $('[data-scale-stage]', scale), range = $('[data-scale-range]', scale);
    stage.innerHTML = objs.map(o => `<div class="scale-tool__obj"><div class="ico" aria-hidden="true">${o[0]}</div><b>${o[1]}</b><span>${o[2]}</span></div>`).join('');
    const els = $$('.scale-tool__obj', stage);
    const upd = () => {
      const v = +range.value;
      range.style.setProperty('--p', (v / 5 * 100) + '%');
      els.forEach((el, i) => {
        const d = v - i;
        el.style.opacity = clamp(1 - Math.abs(d) * 1.8, 0, 1);
        el.style.transform = `scale(${Math.pow(5, d)})`;
        el.style.pointerEvents = Math.abs(d) < .3 ? 'auto' : 'none';
      });
    };
    range.addEventListener('input', upd); upd();
  }

  /* ---------- Campo de partículas ambiente (heros internos e CTA) ---------- */
  const fields = $$('canvas[data-particles]');
  fields.forEach(cv => {
    const ctx = cv.getContext('2d');
    const host = cv.parentElement;
    let w, h, dpr, pts = [], visible = true, mouse = { x: -9999, y: -9999 };
    const isCta = cv.dataset.particles === 'cta';
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = host.clientWidth; h = host.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      const n = Math.round(clamp(w * h / (isCta ? 9000 : 12000), 30, 120));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
        r: Math.random() * 1.6 + .5, o: Math.random() < .12,
      }));
    };
    resize(); addEventListener('resize', resize);
    host.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    host.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); }).observe(cv);
    const LINK = 130;
    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduced) { p.x += p.vx; p.y += p.vy; }
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 140 && d > 0) { p.x += dx / d * (1 - d / 140) * 1.6; p.y += dy / d * (1 - d / 140) * 1.6; }
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10; if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) { ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK) * .1})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      for (const p of pts) { ctx.fillStyle = p.o ? 'rgba(242,100,48,.9)' : 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }
    };
    let raf;
    const loop = () => { cancelAnimationFrame(raf); if (!visible) return; draw(); if (!reduced) raf = requestAnimationFrame(loop); };
    document.addEventListener('visibilitychange', loop);
    loop();
  });
})();
