import { privacyBody, UPDATED } from './privacidade.mjs';
import { contact, stats, services, howItWorks, elements, areas, clients, team } from './data.mjs';
import { esc, icon, ctaBlock } from './layout.mjs';

/* ---------- helpers ---------- */
export const localImg = (url) => {
  if (!url) return '';
  const base = decodeURIComponent(url.split('/').pop()).replace(/\.(png|jpe?g|webp)$/i, '');
  return `assets/img/noticias/${base}.webp`;
};
const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export const fmtDate = (d) => { const [dd, mm, yy] = d.split('/'); return `${+dd} ${MONTHS[+mm - 1]} ${yy}`; };
export const readTime = (a) => Math.max(2, Math.round(a.blocks.map(b => (b.html || '').replace(/<[^>]+>/g, '')).join(' ').split(/\s+/).length / 200));

export const newsCard = (a, root = '', feature = false) => `<a class="news-card${feature ? ' news-card--feature' : ''}" href="${root}noticias/${a.slug}.html" data-search="${esc(a.title.toLowerCase())}">
  <div class="news-card__img"><img src="${root}${localImg(a.image)}" alt="" loading="lazy"></div>
  <div class="news-card__meta"><span>${fmtDate(a.date)}</span><span>·</span><span>${readTime(a)} min</span></div>
  <h3 class="news-card__title">${esc(a.title)}</h3>
</a>`;

const elCard = (e, i) => `<article class="card element reveal" style="--d:${(i % 3) * 0.06}s">
  <div class="element__top"><span>${String(e.n).padStart(2, '0')}</span><span>nano</span></div>
  <div class="element__sym">${e.sym}</div>
  <div class="element__name">${e.name}</div>
  <div class="element__form">${e.form}</div>
  <p class="element__desc">${e.desc}</p>
  <div class="chips">${e.apps.map(a => `<span class="chip">${a}</span>`).join('')}</div>
</article>`;

const areaCard = (a, i, root) => `<a class="area-card${a.featured ? ' area-card--featured' : ''}" href="${root}areas.html#${a.id}">
  <img src="${root}assets/img/${a.img}" alt="" loading="lazy">
  <span class="area-card__num">${String(i + 1).padStart(2, '0')}</span>
  <span class="els" aria-hidden="true">${a.els.map(s => `<span>${s}</span>`).join('')}</span>
  ${a.featured ? '<span class="area-card__badge">Em destaque</span>' : ''}
  <span class="area-card__sub">${a.sub}</span>
  <h3 class="area-card__title">${a.title}</h3>
  <ul class="area-card__more">${a.highlights.map(h => `<li><b>${h[0]}.</b> ${h[1]}.</li>`).join('')}</ul>
</a>`;

const logosMarquee = (root) => {
  const boxed = ['basf.webp', 'vibra.webp'];
  const items = clients.map(c => `<div class="logo-item${boxed.includes(c[0]) ? ' logo-item--boxed' : ''}"><img src="${root}assets/img/clientes/${c[0]}" alt="${c[1]}" loading="lazy"></div>`).join('');
  return `<div class="marquee" style="--dur:42s"><div class="marquee__track">${items}${items.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"')}</div></div>`;
};

const pageHero = ({ label, title, lead, actions = '', canvas = true }) => `<section class="page-hero noise">
  <div class="bg-grid"></div><div class="glow"></div>
  ${canvas ? '<canvas data-particles="hero" aria-hidden="true"></canvas>' : ''}
  <div class="container">
    <span class="label fade-up">${label}</span>
    <h1 class="h1 grad fade-up d1">${title}</h1>
    ${lead ? `<p class="lead fade-up d2">${lead}</p>` : ''}
    ${actions ? `<div class="page-hero__actions fade-up d3">${actions}</div>` : ''}
  </div>
</section>`;


/* Carro em traço (estilo desenho técnico) para o "mergulho na escala"
   Proporções de um sedã fastback: entre-eixos ~60% do comprimento, rodas grandes, balanços curtos */
const wheel = (cx, cy) => {
  const P = (ang, r) => (cx + Math.cos(ang) * r).toFixed(1) + ' ' + (cy + Math.sin(ang) * r).toFixed(1);
  let spokes = '', disc = '';
  for (let i = 0; i < 5; i++) { // 5 raios duplos em V
    const a = i / 5 * Math.PI * 2 - Math.PI / 2;
    spokes += 'M' + P(a - .05, 13) + 'L' + P(a - .2, 45) + 'M' + P(a + .05, 13) + 'L' + P(a + .2, 45);
    spokes += 'M' + P(a - .02, 16) + 'L' + P(a - .1, 44) + 'M' + P(a + .02, 16) + 'L' + P(a + .1, 44);
  }
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; disc += 'M' + P(a, 22) + 'L' + P(a, 30); }
  const tread = Array.from({ length: 36 }, (_, i) => { const a = i / 36 * Math.PI * 2; return 'M' + P(a, 60) + 'L' + P(a + .03, 64); }).join('');
  return '<g class="w">'
    + '<circle cx="' + cx + '" cy="' + cy + '" r="64"/>'
    + '<path class="t" d="' + tread + '"/>'
    + '<circle class="t" cx="' + cx + '" cy="' + cy + '" r="57"/>'
    + '<circle cx="' + cx + '" cy="' + cy + '" r="47"/>'
    + '<circle class="t" cx="' + cx + '" cy="' + cy + '" r="44"/>'
    + '<circle class="t" cx="' + cx + '" cy="' + cy + '" r="31"/>'
    + '<path class="t" d="' + disc + '"/>'
    + '<path d="' + spokes + '"/>'
    + '<circle cx="' + cx + '" cy="' + cy + '" r="12"/>'
    + '<circle class="t" cx="' + cx + '" cy="' + cy + '" r="5"/>'
    + '</g>';
};
const BODY = 'M66 250C58 238 52 214 53 188C54 174 62 164 78 160C140 146 232 120 328 99L332 98C382 72 432 49 488 39C524 31 562 27 602 27C652 27 692 31 722 39C792 57 862 92 908 114L914 117C926 122 941 133 946 149C952 171 954 211 950 233C948 246 940 250 930 250L852 250A79 79 0 0 0 694 250L311 250A79 79 0 0 0 153 250Z';
const carSvg = () => '<svg viewBox="0 0 1000 316" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">'
  // chão e sombra
  + '<path class="t" d="M20 300H980" stroke-dasharray="1 7"/>'
  + '<path class="h" d="M140 308L160 296M168 308L188 296M196 308L216 296M224 308L244 296M252 308L272 296M280 308L300 296M682 308L702 296M710 308L730 296M738 308L758 296M766 308L786 296M794 308L814 296M822 308L842 296"/>'
  // carroceria
  + '<path d="' + BODY + '"/>'
  // vidros (linha de janelas subindo para trás, com quebra na coluna C)
  + '<path d="M412 106C440 77 468 54 500 43C560 35 650 35 700 41C722 52 740 66 752 79C761 88 771 94 783 98C662 100 522 103 412 106Z"/>'
  + '<path class="t" d="M422 102C448 78 474 59 503 49C560 41 646 41 694 46"/>'
  + '<path d="M553 39L549 104M562 39L560 103"/>'
  // retrovisor
  + '<path d="M384 101C386 91 396 87 414 89C420 97 418 105 410 109L392 111C386 109 384 105 384 101Z"/><path d="M410 109L422 113"/>'
  // farol, grade e para-choque
  + '<path d="M70 169C100 159 140 152 170 149C164 160 151 167 133 171L82 179C75 177 70 173 70 169Z"/>'
  + '<path class="t" d="M86 171C112 165 140 159 160 155M96 176L128 171"/>'
  + '<path d="M58 197L104 191L113 215L101 241L64 245C58 231 56 213 58 197Z"/>'
  + '<path class="t" d="M60 205L106 199M60 213L109 207M61 221L110 216M62 229L106 225M63 237L103 233"/>'
  + '<path class="t" d="M120 206C132 214 138 226 136 242M64 245C100 249 136 249 153 247"/>'
  // vincos laterais (linha de ombro, linha de cintura, vinco inferior, saia)
  + '<path d="M108 172C300 151 600 141 918 131"/>'
  + '<path class="t" d="M330 110C520 106 700 102 904 120"/>'
  + '<path class="t" d="M311 213C450 207 600 205 694 205"/>'
  + '<path d="M311 239C450 235 600 235 694 237"/>'
  + '<path class="t" d="M168 174C200 172 236 166 262 158"/>'
  // contornos dos para-lamas
  + '<path class="t" d="M150 236A86 86 0 0 1 314 236M691 236A86 86 0 0 1 855 236"/>'
  // portas e maçanetas
  + '<path d="M330 110C324 150 320 200 318 246M557 104C559 150 559 200 557 246M761 98C745 120 731 150 713 175C706 190 701 210 700 236"/>'
  + '<path d="M500 125L540 123M688 118L726 116"/><path class="t" d="M502 130L538 128M690 123L724 121"/>'
  // tampa de combustível, aerofólio, antena e traseira
  + '<circle class="t" cx="800" cy="132" r="10"/>'
  + '<path class="t" d="M700 39C708 31 716 29 722 31L726 41"/>'
  + '<path class="o" d="M904 123L944 133C946 139 944 143 940 145L908 137Z"/>'
  + '<path class="t" d="M928 200C942 204 949 212 950 222M862 246H930M884 238L924 238"/>'
  + wheel(232, 236) + wheel(773, 236)
  + '</svg>';

/* =====================================================================
   HOME
   ===================================================================== */
export function home(news) {
  const root = '';
  const latest = news.slice(0, 3);
  const ptable = [...elements.map(e => `<div class="pt" data-pt><small>${e.n}</small><strong>${e.sym}</strong></div>`), '<div class="pt pt--ghost"><small>…</small><strong>+</strong></div>'].join('');
  const photos = [27, 28, 29, 30, 31, 32, 33, 34].map(n => `<div class="photo-item"><img src="assets/img/home/Rectangle-${n}.webp" alt="" loading="lazy"></div>`).join('');
  return `
<section class="hero noise" data-hero>
  <div class="bg-grid"></div>
  <div class="glow hero__glow"></div>
  <canvas data-hero-canvas aria-hidden="true"></canvas>
  <div class="container hero__content" data-hero-content>
    <div class="hero__inner">
      <a class="announce fade-up" href="noticias/${latest[0].slug}.html"><b>Novidade</b>Selecionada pela Petrobras ${icon.arrow}</a>
      <h1 class="h-hero grad fade-up d1">Nanotecnologia sob medida para a sua indústria.</h1>
      <p class="hero__sub fade-up d2">Desenvolvemos <strong>pesquisas personalizadas com nanopartículas</strong> para resolver o desafio do seu produto e <strong>fornecemos as nanopartículas</strong> para levar a solução do laboratório à escala.</p>
      <div class="hero__actions fade-up d3">
        <a class="btn btn--lg" href="contato.html?interesse=pesquisa">Iniciar um projeto ${icon.arrow}</a>
        <a class="btn btn--lg btn--ghost" href="nanoparticulas.html">Ver nanopartículas</a>
      </div>
    </div>
  </div>
  <div class="hero__hud fade-up d5" aria-live="polite">
    <span><b data-hud-name>Nanopartícula</b><span class="hud-size"> · <span data-hud-size>1–100 nm</span></span></span>
    <span class="hud-steps"><button data-hud-step aria-label="Nanopartícula"></button><button data-hud-step aria-label="Rede cristalina"></button><button data-hud-step aria-label="Símbolo NanoBrasil"></button></span>
  </div>
</section>

<section class="section--tight logos" style="padding-top:8px">
  <div class="container"><p class="logos__title">Quem inova com a NanoBrasil</p></div>
  <div class="mt-3">${logosMarquee(root)}</div>
</section>

<section class="section bordered" id="frentes">
  <div class="container">
    <div class="section-head">
      <span class="label reveal">Como funciona a NanoBrasil</span>
      <h2 class="h2 grad reveal">Duas frentes. Um objetivo: elevar o desempenho do seu produto.</h2>
      <p class="lead reveal">${howItWorks}</p>
    </div>
    <div class="bento">
      <article class="card front reveal">
        <span class="label label--plain">${icon.flask} Pesquisas</span>
        <h3 class="front__title">Pesquisa personalizada para o desafio da sua indústria.</h3>
        <div class="front__visual pipeline" data-pipeline>
          <div class="pipe"><i>01</i><div>Demanda do cliente</div></div>
          <div class="pipe"><i>02</i><div>Elaboração de um relatório técnico mercadológico</div></div>
          <div class="pipe"><i>03</i><div>Pesquisa e desenvolvimento</div></div>
          <div class="pipe"><i>04</i><div>Produto disruptivo pronto para o mercado</div></div>
        </div>
        <p class="front__text"><strong>${services.pdi.title}.</strong> ${services.pdi.text}</p>
        <div class="front__foot"><a class="btn" href="contato.html?interesse=pesquisa">Iniciar um projeto ${icon.arrow}</a></div>
      </article>
      <article class="card front reveal" style="--d:.08s">
        <span class="label label--plain">${icon.atom} Produtos</span>
        <h3 class="front__title">Nanopartículas estabilizadas, prontas para a sua formulação.</h3>
        <div class="front__visual pipeline pipeline--row">
          <div class="pipe is-done"><i>01</i><div>Escolha da nanopartícula</div></div>
          <div class="pipe is-done"><i>02</i><div>Testes de incorporação</div></div>
          <div class="pipe is-done"><i>03</i><div>Fornecimento</div></div>
        </div>
        <div class="front__visual ptable" data-ptable>${ptable}</div>
        <p class="front__text"><strong>${services.produtos.title}.</strong> ${services.produtos.text} Também trabalhamos com a incorporação de nanopartículas e o desenvolvimento de soluções personalizadas.</p>
        <div class="front__foot"><a class="btn btn--ghost" href="nanoparticulas.html">Ver nanopartículas ${icon.arrow}</a></div>
      </article>
    </div>
  </div>
</section>

<section class="section section--light" style="overflow:hidden">
  <div class="container row-head">
    <div class="section-head">
      <span class="label reveal">Áreas de atuação</span>
      <h2 class="h2 reveal">Soluções inovadoras e sustentáveis que impulsionam o seu negócio.</h2>
    </div>
    <div class="hscroll__controls reveal">
      <button class="round-btn" data-hs-prev aria-label="Anterior">${icon.left}</button>
      <button class="round-btn" data-hs-next aria-label="Próximo">${icon.right}</button>
    </div>
  </div>
  <div class="reveal"><div class="hscroll__track" data-hscroll>${areas.map((a, i) => areaCard(a, i, root)).join('')}</div></div>
  <div class="container mt-2"><a class="link" href="areas.html">Ver todas as áreas em detalhe ${icon.arrow}</a></div>
</section>

<section class="vortex" data-vortex aria-label="Mergulho na escala nanométrica">
  <div class="vortex__sticky">
    <div class="dive__car" data-dive-car aria-hidden="true">${carSvg()}<i class="dive__target" style="left:64%;top:52.2%"></i></div>
    <canvas data-vortex-canvas aria-hidden="true"></canvas>
    <div class="dive__scale" aria-hidden="true"><span class="dive__line" data-scale-line></span><span data-scale-value>10 mm</span></div>
    <div class="vortex__text container">
      <div class="vortex__step" data-vstep><span class="label">Escala do dia a dia</span><p class="h1 grad">A pintura de um carro parece lisa e uniforme.</p></div>
      <div class="vortex__step" data-vstep><span class="label">Escala micrométrica</span><p class="h1 grad">De perto, ela é feita de grãos e partículas.</p></div>
      <div class="vortex__step" data-vstep><span class="label">1 nm = 1 bilionésimo do metro</span><p class="h1 grad">Entre 1 e 100 nm, os materiais podem apresentar características diferentes.</p></div>
      <div class="vortex__step" data-vstep><span class="label">Uma nanopartícula</span><p class="h1 grad">É nessa escala que a NanoBrasil cria novas propriedades para a sua indústria.</p></div>
    </div>
    <div class="vortex__bar" aria-hidden="true"><span data-vbar></span></div>
  </div>
</section>

<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}</script>
<script type="module" src="assets/js/car3d.js"></script>







<section class="section">
  <div class="container">
    <div class="row-head">
      <div class="section-head">
        <span class="label reveal">Catálogo</span>
        <h2 class="h2 grad reveal">A tabela periódica, em escala nanométrica.</h2>
        <p class="lead reveal">Produtos nanotecnológicos já estabilizados e padronizados, prontos para testes de incorporação no seu produto acabado.</p>
      </div>
      <a class="btn btn--ghost reveal" href="nanoparticulas.html">Ver catálogo completo ${icon.arrow}</a>
    </div>
    <div class="grid g3 grid--compact">${elements.slice(0, 6).map(elCard).join('')}</div>
  </div>
</section>

<section class="section section--light">
  <div class="container split">
    <div class="media-duo reveal-scale">
      <figure class="media-frame"><img src="assets/img/home/DSC03891-1.webp" alt="Testes de incorporação de nanopartículas no laboratório da NanoBrasil" loading="lazy"><span class="tag-float">Laboratório · BH-TEC</span></figure>
      <figure class="media-frame"><img src="assets/img/home/image-46.webp" alt="POOF, desenvolvido com nanotecnologia pela NanoBrasil" loading="lazy"><span class="tag-float">POOF</span></figure>
    </div>
    <div>
      <span class="label reveal">Do laboratório ao mercado</span>
      <h2 class="h2 grad mt-2 reveal">Nanotecnologia em escala industrial.</h2>
      <p class="lead mt-2 reveal">Cada indústria tem um desafio específico, e é exatamente aí que a nanotecnologia gera valor real.</p>
      <ul class="highlights reveal">
        <li class="highlight"><i>${icon.check}</i><div><b>Laboratório equipado</b><span>Desenvolvimento, aplicação e treinamento de parceiros.</span></div></li>
        <li class="highlight"><i>${icon.check}</i><div><b>Equipe técnica especializada</b><span>Química, inovação, P&amp;D e gestão de projetos deep tech.</span></div></li>
        <li class="highlight"><i>${icon.check}</i><div><b>Fábrica de nanopartículas no horizonte</b><span>A NanoBrasil projeta a implantação de sua fábrica de nanopartículas e soluções nanotecnológicas.</span></div></li>
      </ul>
      <div class="mt-3 reveal"><a class="link" href="sobre.html">Conheça a NanoBrasil ${icon.arrow}</a></div>
    </div>
  </div>
  <div class="mt-5 reveal"><div class="marquee" style="--dur:70s;--gap:14px"><div class="marquee__track">${photos}${photos.replace(/<img /g, '<img aria-hidden="true" ')}</div></div></div>
</section>

<section class="section" style="padding-top:clamp(56px,7vw,96px)">
  <div class="container">
    <div class="section-head">
      <span class="label reveal">O mercado da nanotecnologia</span>
      <h2 class="h2 grad reveal">Uma ciência invisível com impacto gigantesco.</h2>
    </div>
    <div class="stats">
      ${stats.map((s, i) => `<div class="stat reveal" style="--d:${i * 0.08}s">
        <div class="stat__pre">${s.pre}</div>
        <div class="stat__num">${s.prefix ? `<small>${s.prefix}</small>` : ''}<span data-count="${s.to}">0</span>${s.suffix ? `<small class="suffix">${s.suffix}</small>` : ""}</div>
        <p class="stat__label">${s.label}</p>
        <p class="stat__src">Fonte: <a href="${s.href}" target="_blank" rel="noopener">${s.src}</a></p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section section--light">
  <div class="container">
    <div class="row-head">
      <div class="section-head"><span class="label reveal">Em alta</span><h2 class="h2 reveal">Notícias</h2></div>
      <a class="btn btn--ghost reveal" href="noticias.html">Leia todas as novidades ${icon.arrow}</a>
    </div>
    <div class="news-grid">${latest.map((a, i) => `<div class="reveal" style="--d:${i * 0.06}s">${newsCard(a, root)}</div>`).join('')}</div>
  </div>
</section>

${ctaBlock(root)}`;
}

/* =====================================================================
   SOBRE
   ===================================================================== */
export function sobre() {
  return `
${pageHero({ label: 'O que é a NanoBrasil', title: 'O hub de nanotecnologia na América Latina.', lead: 'Dedicada à identificação e incorporação de soluções e oportunidades aplicáveis ao setor.', actions: `<a class="btn" href="nanotecnologia.html">Tudo sobre a nanotecnologia ${icon.arrow}</a><a class="btn btn--ghost" href="equipe.html">Conheça a equipe</a>` })}

<section class="section section--light">
  <div class="container split" style="align-items:start">
    <div>
      <span class="label reveal">Quem somos</span>
      <h2 class="h2 h2--long mt-2 reveal">A NanoBrasil é o hub de nanotecnologia na América Latina, dedicada à identificação e incorporação de soluções e oportunidades aplicáveis ao setor.</h2>
    </div>
    <div class="prose lead reveal">
      <p>A empresa é liderada por sócios-fundadores empreendedores, com atuação orientada à conexão entre avanços já desenvolvidos globalmente e as demandas do mercado brasileiro.</p>
      <p>Sediada no <strong>Parque Tecnológico de Belo Horizonte (BH-TEC)</strong>, conta com laboratório equipado com tecnologias de ponta para o desenvolvimento, aplicação e treinamento de parceiros.</p>
      <p>Reúne equipe técnica especializada e projeta a implantação de sua <strong>fábrica de nanopartículas e soluções nanotecnológicas</strong>.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="media-duo reveal-scale">
      <figure class="media-frame"><img src="assets/img/home/DSC05014-1.webp" alt="Sócios da NanoBrasil no escritório do BH-TEC" loading="lazy"></figure>
      <figure class="media-frame"><img src="assets/img/home/DSC03891-1.webp" alt="Testes de laboratório com nanopartículas" loading="lazy"></figure>
    </div>
    <div>
      <span class="label reveal">Nanotecnologia em escala industrial · Soluções personalizadas</span>
      <h2 class="h2 grad mt-2 reveal">Cada indústria tem um desafio específico, e é exatamente aí que a nanotecnologia gera valor real.</h2>
      <div class="prose lead mt-3 reveal">
        <p>Na NanoBrasil, desenvolvemos soluções sob medida para demandas produtivas concretas, atuando lado a lado com empresas para aumentar eficiência, reduzir custos e elevar o desempenho de produtos e processos. A aplicação de nanopartículas permite, por exemplo, melhorar resistência de materiais, otimizar formulações e ampliar a durabilidade sem necessidade de mudanças estruturais complexas.</p>
        <p><strong style="color:var(--text)">Mais do que tecnologia, entregamos ganho competitivo:</strong> soluções pensadas para escalar, com impacto direto na produtividade e na inovação do parceiro.</p>
      </div>
      <a class="btn btn--ghost mt-3 reveal" href="${contact.instagramReel}" target="_blank" rel="noopener">${icon.instagram} Assista no Instagram</a>
    </div>
  </div>
</section>

<section class="section bordered">
  <div class="container">
    <div class="section-head">
      <span class="label reveal">Nanotecnologia e ESG</span>
      <h2 class="h2 grad reveal">Falar de nanotecnologia é, também, falar de sustentabilidade aplicada.</h2>
    </div>
    <div class="grid g3">
      <div class="card reveal"><div class="card__icon">${icon.leaf}</div><h3 class="h3">Produzir mais com menos</h3><p class="muted">Ao atuar na escala dos materiais, a nanotecnologia permite produzir mais com menos: menos insumos, menos energia, menos desperdício.</p></div>
      <div class="card reveal" style="--d:.06s"><div class="card__icon">${icon.sparkle}</div><h3 class="h3">Menor impacto, maior vida útil</h3><p class="muted">Isso se traduz em processos mais eficientes, redução de impactos ambientais e desenvolvimento de soluções com maior vida útil, pilares centrais da agenda ESG.</p></div>
      <div class="card reveal" style="--d:.12s"><div class="card__icon">${icon.compass}</div><h3 class="h3">Governança e inovação</h3><p class="muted">Além do impacto ambiental, há ganhos diretos em governança e inovação, com tecnologias que tornam cadeias produtivas mais inteligentes e responsáveis.</p></div>
    </div>
    <p class="big-quote mt-5 reveal-words" data-words style="max-width:880px">Na prática, a nanotecnologia ajuda empresas a alinhar desempenho industrial com compromisso sustentável, sem abrir mão de competitividade.</p>
    <div class="mt-4 reveal"><a class="btn" href="nanoparticulas.html">Conheça mais sobre as nanopartículas ${icon.arrow}</a></div>
  </div>
</section>

${ctaBlock('')}`;
}

/* =====================================================================
   ÁREAS
   ===================================================================== */
const elTile = (t) => `<span class="el-tile" aria-hidden="true"><small>${t[0]}</small><strong>${t[1]}</strong><em>${t[2]}</em></span>`;

const areaDetail = (a) => {
  const alt = `Aplicação de nanotecnologia em ${a.title.toLowerCase()}`;
  const media = `<div class="area-detail__media reveal-scale">
        <img src="assets/img/${a.img}" alt="${alt}" loading="lazy">
        <span class="els" aria-hidden="true">${a.els.map(s => `<span>${s}</span>`).join('')}</span>
        ${a.tile ? elTile(a.tile) : ''}
      </div>`;
  const items = a.highlights.map(h => `<li class="highlight"><i>${icon.check}</i><div><b>${h[0]}</b><span>${h[1]}</span></div></li>`).join('');
  if (!a.featured) return `<section class="area-detail" id="${a.id}" data-area>
      ${media}
      <div>
        <span class="label reveal">${a.sub}</span>
        <h2 class="h2 reveal">${a.title}</h2>
        <p class="area-detail__particles reveal">${a.particles}</p>
        <p class="area-detail__text reveal">${a.text}</p>
        <ul class="highlights reveal">${items}</ul>
      </div>
    </section>`;
  return `<section class="area-detail area-detail--featured" id="${a.id}" data-area>
      ${media}
      <div class="area-detail__body">
        <span class="label reveal">${a.sub}</span>
        <h2 class="h2 reveal">${a.title}</h2>
        <p class="area-detail__focus reveal">${a.focus}</p>
        <p class="area-detail__particles reveal">${a.particles}</p>
        <p class="area-detail__text reveal">${a.text}</p>
        <p class="area-detail__text reveal">${a.more}</p>
      </div>
      <div class="area-detail__gallery">
        ${a.gallery.map(g => `<figure class="reveal-scale is-${g[2]}"><img src="assets/img/${g[0]}" alt="" loading="lazy"><figcaption>${g[1]}</figcaption></figure>`).join('')}
      </div>
      <div class="area-detail__cols">
        <div class="reveal">
          <h3 class="area-detail__sub">Nanopartículas para o setor</h3>
          <dl class="parts">${a.parts.map(p => `<div><dt>${p[0]}</dt><dd>${p[1]}</dd></div>`).join('')}</dl>
        </div>
        <div class="reveal">
          <h3 class="area-detail__sub">Como funciona</h3>
          <ol class="how-steps">${a.how.map((h, i) => `<li><i>0${i + 1}</i><div><b>${h[0]}</b><span>${h[1]}</span></div></li>`).join('')}</ol>
        </div>
      </div>
      <ul class="highlights reveal">${items}</ul>
    </section>`;
};

export function areasPage() {
  return `
<section class="page-hero page-hero--img noise">
  <img class="page-hero__img" src="assets/img/areas/imagem-2.webp" alt="">
  <div class="container">
    <span class="label fade-up">Áreas de atuação da nanotecnologia</span>
    <h1 class="h1 grad fade-up d1">Soluções inovadoras e sustentáveis que impulsionam o seu negócio.</h1>
    <p class="lead fade-up d2">Do campo à construção civil, as nanopartículas elevam o desempenho de produtos em nove setores.</p>
    <div class="page-hero__actions fade-up d3"><a class="btn" href="sobre.html">Conheça a NanoBrasil ${icon.arrow}</a><a class="btn btn--ghost" href="nanotecnologia.html">Tudo sobre a nanotecnologia</a></div>
  </div>
</section>
<nav class="area-nav" aria-label="Áreas"><div class="container area-nav__inner" data-area-nav>${areas.map(a => `<a href="#${a.id}">${a.title}</a>`).join('')}</div></nav>
<div class="section--light">
  <div class="container">
    ${areas.map(a => areaDetail(a)).join('')}
  </div>
</div>
${ctaBlock('')}`;
}

/* =====================================================================
   NANOPARTÍCULAS
   ===================================================================== */
export function nanoparticulas() {
  return `
${pageHero({ label: 'Produtos · Nanopartículas', title: 'Nanopartículas para a sua indústria.', lead: 'Uma gama de produtos nanotecnológicos já estabilizados e padronizados, com o objetivo de melhorar propriedades específicas de produtos acabados.', actions: `<a class="btn" href="contato.html?interesse=nanoparticulas">Solicitar cotação ${icon.arrow}</a><a class="btn btn--ghost" href="#incorporacao">Como funciona</a>` })}

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="label reveal">Catálogo</span>
      <h2 class="h2 grad reveal">Escolha pelo elemento. Nós ajudamos na incorporação.</h2>
      <p class="lead reveal">A escolha dos materiais e das tecnologias depende das propriedades desejadas e das condições de uso de cada produto ou processo.</p>
    </div>
    <div class="grid g3">${elements.map(elCard).join('')}</div>
  </div>
</section>

<section class="section section--light" id="incorporacao">
  <div class="container">
    <div class="section-head">
      <span class="label reveal">Como funciona</span>
      <h2 class="h2 reveal">Da amostra ao produto final.</h2>
      <p class="lead reveal">${howItWorks}</p>
    </div>
    <div class="grid g3">
      <div class="card reveal"><div class="card__icon">${icon.atom}</div><h3 class="h3">${services.produtos.title}</h3><p class="muted">${services.produtos.text}</p></div>
      <div class="card reveal" style="--d:.06s"><div class="card__icon">${icon.flask}</div><h3 class="h3">${services.pdi.title}</h3><p class="muted">${services.pdi.text}</p></div>
      <div class="card reveal" style="--d:.12s"><div class="card__icon">${icon.compass}</div><h3 class="h3">${services.consultoria.title}</h3><p class="muted">${services.consultoria.text}</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div>
      <span class="label reveal">Escala</span>
      <h2 class="h2 grad mt-2 reveal">Com fábrica de nanopartículas no horizonte.</h2>
      <p class="lead mt-2 reveal">A NanoBrasil projeta a implantação de sua fábrica de nanopartículas e soluções nanotecnológicas, com laboratório no BH-TEC equipado para desenvolvimento, aplicação e treinamento de parceiros.</p>
      <div class="mt-3 reveal"><a class="link" href="noticias/nanobrasil-planeja-demanda-por-nanomateriais-para-2027-e-avalia-fabrica-de-nanoparticulas-no-brasil.html">Leia a notícia ${icon.arrow}</a></div>
    </div>
    <figure class="media-frame reveal-scale" style="aspect-ratio:5/4"><img src="assets/img/noticias/Liderancas-posam-para-foto-em-frente-ao-predio-da-Nanotec.webp" alt="Lideranças em frente ao prédio da Nanotec" loading="lazy"></figure>
  </div>
</section>
${ctaBlock('')}`;
}

/* =====================================================================
   NANOTECNOLOGIA
   ===================================================================== */
export function nanotecnologia() {
  const apps = [
    ['Agropecuária', 'Fertilizantes e defensivos de liberação controlada, aditivos e sensores para monitoramento de solos e lavouras.'],
    ['Tintas e revestimentos', 'Proteção contra corrosão, raios UV e desgaste, além de superfícies autolimpantes, antimicrobianas ou repelentes à água.'],
    ['Estradas e infraestrutura', 'Desenvolvimento de materiais com maior resistência e durabilidade.'],
    ['Saúde e alimentos', 'Sistemas de liberação de ativos, tecnologias para diagnóstico e embalagens que ajudam a conservar alimentos.'],
    ['Eletrônica e energia', 'Nanomateriais para baterias, armazenamento de energia e componentes mais eficientes.'],
    ['Materiais avançados', 'Polímeros, ligas metálicas e compósitos com propriedades aprimoradas.'],
    ['Defesa e segurança', 'Materiais estruturais leves e resistentes, tecidos técnicos e sensores de alta sensibilidade.'],
  ];
  return `
${pageHero({ label: 'Nanotecnologia: da ciência à indústria', title: 'Por que nanotecnologia?', lead: 'A nanotecnologia permite desenvolver materiais com novas propriedades e melhor desempenho. Na indústria, isso pode se traduzir em produtos mais leves, resistentes e duráveis, novas funcionalidades e uso mais eficiente de recursos.' })}

<section class="section">
  <div class="container split">
    <div>
      <span class="label reveal">A escala</span>
      <h2 class="h2 grad mt-2 reveal">Entre 1 e 100 nanômetros, a matéria muda de comportamento.</h2>
      <p class="lead mt-2 reveal">Essas possibilidades surgem do trabalho com estruturas em escala nanométrica, geralmente entre 1 e 100 nanômetros. Nessa escala, os materiais podem apresentar características diferentes das observadas em dimensões maiores.</p>
      <p class="h3 mt-3 reveal">1 nanômetro = <span class="accent">1 bilionésimo</span> do metro.</p>
    </div>
    <div class="card scale-tool reveal-scale" data-scale>
      <span class="label">Arraste para ampliar</span>
      <div class="scale-tool__stage" data-scale-stage></div>
      <input class="range" type="range" min="0" max="5" step="0.01" value="0" aria-label="Escala de tamanho" data-scale-range>
      <div class="scale-tool__ticks"><span>1 m</span><span>1 mm</span><span>1 µm</span><span>1 nm</span></div>
    </div>
  </div>
</section>

<section class="section bordered">
  <div class="container">
    <div class="section-head"><span class="label reveal">Vantagens para novos produtos</span><h2 class="h2 grad reveal">Pequenas partículas. Grandes ganhos.</h2></div>
    <div class="grid g4">
      <div class="card reveal"><div class="card__icon">${icon.bolt}</div><h3 class="h3">Mais desempenho</h3><p class="muted">Desenvolvimento de materiais mais leves, resistentes e duráveis, conforme as exigências de cada aplicação.</p></div>
      <div class="card reveal" style="--d:.05s"><div class="card__icon">${icon.sparkle}</div><h3 class="h3">Novas funcionalidades</h3><p class="muted">Superfícies autolimpantes, materiais com ação antimicrobiana e revestimentos que repelem água ou oferecem proteção adicional.</p></div>
      <div class="card reveal" style="--d:.1s"><div class="card__icon">${icon.leaf}</div><h3 class="h3">Eficiência e sustentabilidade</h3><p class="muted">Possibilidade de reduzir desperdícios, otimizar o consumo de matérias-primas e energia e prolongar a vida útil de produtos.</p></div>
      <div class="card reveal" style="--d:.15s"><div class="card__icon">${icon.heart}</div><h3 class="h3">Inovação em saúde</h3><p class="muted">Desenvolvimento de sistemas de liberação controlada de medicamentos e de novas ferramentas de diagnóstico.</p></div>
    </div>
  </div>
</section>

<section class="section section--light">
  <div class="container">
    <div class="section-head">
      <span class="label reveal">Onde aplicar a nanotecnologia?</span>
      <h2 class="h2 reveal">As possibilidades abrangem diferentes setores.</h2>
      <p class="lead reveal">A escolha dos materiais e das tecnologias depende das propriedades desejadas e das condições de uso de cada produto ou processo.</p>
    </div>
    <ul class="apps-list">${apps.map((a, i) => `<li class="reveal"><i>${String(i + 1).padStart(2, '0')}</i><div><b>${a[0]}</b><span>${a[1]}</span></div></li>`).join('')}</ul>
  </div>
</section>

<section class="section">
  <div class="container container--text center">
    <span class="label reveal">Da ciência à indústria</span>
    <p class="big-quote mt-3 reveal-words" data-words>Transformar essas possibilidades em produtos exige desenvolvimento, testes e avaliação de desempenho nas condições de uso.</p>
    <p class="lead mt-3 reveal">A NanoBrasil conecta conhecimento científico às demandas da indústria para desenvolver soluções alinhadas a desafios concretos. A atuação reúne pesquisa, desenvolvimento, consultoria especializada e colaboração com parceiros, com foco na aplicação da nanotecnologia em produtos e processos.</p>
    <p class="mt-4 reveal">Sua empresa tem um desafio? Converse com a NanoBrasil sobre as possibilidades de aplicação da nanotecnologia.</p>
    <div class="mt-3 reveal"><a class="btn btn--lg" href="contato.html">Fale com a NanoBrasil ${icon.arrow}</a></div>
  </div>
</section>`;
}

/* =====================================================================
   EQUIPE
   ===================================================================== */
export function equipe() {
  let idx = 0;
  return `
${pageHero({ label: 'A equipe', title: 'Quem faz acontecer.', lead: 'A NanoBrasil conta com uma equipe multidisciplinar altamente qualificada, formada por profissionais das áreas técnica, comercial e administrativa.', actions: `<a class="btn" href="sobre.html">Conheça a NanoBrasil ${icon.arrow}</a><a class="btn btn--ghost" href="nanotecnologia.html">Tudo sobre a nanotecnologia</a>` })}
<section class="section section--light">
  <div class="container">
    <p class="lead reveal" style="max-width:820px">A atuação integrada desses núcleos garante suporte completo ao desenvolvimento e à aplicação de soluções nanotecnológicas. O time reúne especialistas com experiência prática e conhecimento aprofundado, alinhados às demandas do mercado e às tendências globais. Os profissionais apresentados nesta página representam parte dessa estrutura, que se expande conforme a evolução dos projetos e parcerias. Essa organização permite à NanoBrasil manter um alto padrão de qualidade, eficiência e capacidade de entrega.</p>
    <div class="mt-5">
    ${team.map(g => `<div class="team-group">
      <div class="team-group__head reveal"><h2>${g.group}</h2><span class="mono small muted">${String(g.people.length).padStart(2, '0')}</span></div>
      <div class="team-grid">${g.people.map((p, i) => `<button class="card member reveal" style="--d:${(i % 5) * 0.05}s" data-member="${idx++}" aria-haspopup="dialog">
        <div class="member__photo"><img src="assets/img/equipe/${p.img}" alt="" loading="lazy"></div>
        <div class="member__name">${p.name}</div>
        <div class="member__role">${p.role}</div>
        <span class="member__more">Saiba mais sobre ${p.name.split(' ')[0]} ${icon.plus}</span>
      </button>`).join('')}</div>
    </div>`).join('')}
    </div>
  </div>
</section>
<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" data-sheet>
  <div class="sheet__backdrop" data-sheet-close></div>
  <div class="sheet__panel">
    <button class="sheet__close" aria-label="Fechar" data-sheet-close>${icon.close}</button>
    <div class="sheet__head"><img alt="" data-sheet-img><div><div class="sheet__role" data-sheet-role></div><h3 id="sheet-title" data-sheet-name></h3></div></div>
    <p class="sheet__bio" data-sheet-bio></p>
  </div>
</div>
<script type="application/json" id="team-data">${JSON.stringify(team.flatMap(g => g.people)).replace(/</g, '\\u003c')}</script>
${ctaBlock('')}`;
}

/* =====================================================================
   NOTÍCIAS
   ===================================================================== */
export function noticias(news) {
  const [first, ...rest] = news;
  return `
${pageHero({ label: 'Agência de Notícias NanoBrasil', title: 'Notícias', lead: 'Projetos, parcerias, eventos e novidades da NanoBrasil.', canvas: false })}
<section class="section section--light" style="padding-top:clamp(40px,5vw,64px)">
  <div class="container">
    <div class="row-head" style="margin-bottom:28px">
      <span class="label">${news.length} publicações</span>
      <label class="search">${icon.search}<span class="sr-only">Buscar notícias</span><input type="search" placeholder="Buscar notícias" data-news-search></label>
    </div>
    <div class="news-grid" data-news-grid>${newsCard(first, '', true)}${rest.map(a => newsCard(a, '')).join('')}</div>
    <p class="center muted mt-5" data-news-empty hidden>Nenhuma notícia encontrada.</p>
  </div>
</section>
${ctaBlock('')}`;
}

export function article(a, news) {
  const root = '../';
  const body = a.blocks.map(b => {
    if (b.tag === 'img') return `<figure><img src="${root}${localImg(b.src)}" alt="${esc(b.caption)}" loading="lazy">${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}</figure>`;
    if (b.tag === 'iframe') return `<iframe src="${esc(b.src)}" loading="lazy" allowfullscreen title="Apresentação"></iframe>`;
    const html = b.html.replace(/https:\/\/nanobrasil\.net\/([^"\/]+)\/?"/g, (m, slug) => news.some(n => n.slug === decodeURIComponent(slug)) ? `${decodeURIComponent(slug)}.html"` : m);
    return `<${b.tag}>${html}</${b.tag}>`;
  }).join('\n');
  const others = news.filter(n => n.slug !== a.slug).slice(0, 3);
  return `
<div class="section--light">
<section class="article-hero">
  <div class="container container--text">
    <a class="link fade-up" href="../noticias.html">${icon.left} Notícias</a>
    <h1 class="fade-up d1">${esc(a.title)}</h1>
    <div class="article-meta fade-up d2"><span>${a.date}</span><span>·</span><span>${esc(a.author)}</span><span>·</span><span>${readTime(a)} min de leitura</span></div>
  </div>
  <div class="container"><div class="article-cover reveal-scale"><img src="${root}${localImg(a.image)}" alt=""></div></div>
</section>
<article class="container container--text article-body" data-article>
${body}
</article>
<section class="section bordered">
  <div class="container">
    <div class="row-head"><h2 class="h2">Continue lendo</h2><a class="btn btn--ghost" href="../noticias.html">Todas as notícias ${icon.arrow}</a></div>
    <div class="news-grid">${others.map(o => newsCard(o, root)).join('')}</div>
  </div>
</section>
</div>`;
}

/* =====================================================================
   CONTATO
   ===================================================================== */
export function contato() {
  return `
<section class="page-hero noise" style="padding-bottom:var(--section-y)">
  <div class="bg-grid"></div><div class="glow"></div>
  <canvas data-particles="hero" aria-hidden="true"></canvas>
  <div class="container split" style="align-items:start">
    <div>
      <span class="label fade-up">Vamos conversar?</span>
      <h1 class="h1 grad fade-up d1">Conte o seu desafio.</h1>
      <p class="lead fade-up d2">A nanotecnologia pode ser a solução para impulsionar seu negócio. Fale com a equipe comercial da NanoBrasil.</p>
      <ul class="footer__contact mt-4 fade-up d3 muted" style="display:grid;gap:12px">
        <li>${icon.pin}<address style="font-style:normal">${contact.address}<br>${contact.cep} · ${contact.city}</address></li>
        <li>${icon.phone}<a href="${contact.whatsapp}" target="_blank" rel="noopener">${contact.phone}</a></li>
        <li>${icon.mail}<a href="mailto:${contact.email}">${contact.email}</a></li>
      </ul>
      <div class="socials fade-up d4">
        <a href="${contact.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon.linkedin}</a>
        <a href="${contact.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${icon.youtube}</a>
        <a href="${contact.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon.instagram}</a>
      </div>
    </div>
    <form class="form card fade-up d2" data-contact-form style="background:rgba(17,17,20,.85);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px)">
      <div>
        <span class="field-label">Tenho interesse em</span>
        <div class="seg mt-1">
          <input type="radio" name="interesse" id="i1" value="Pesquisa personalizada (P&D&I)" checked><label for="i1"><b>Pesquisa</b>P&amp;D sob medida</label>
          <input type="radio" name="interesse" id="i2" value="Compra de nanopartículas"><label for="i2"><b>Nanopartículas</b>Cotação e amostras</label>
          <input type="radio" name="interesse" id="i3" value="Assessoria e consultoria"><label for="i3"><b>Consultoria</b>Prospecção e P&amp;D</label>
        </div>
      </div>
      <div class="form-row">
        <div class="field"><label for="f-nome">Nome</label><input id="f-nome" name="nome" required autocomplete="name"></div>
        <div class="field"><label for="f-empresa">Empresa</label><input id="f-empresa" name="empresa" autocomplete="organization"></div>
      </div>
      <div class="form-row">
        <div class="field"><label for="f-email">E-mail</label><input id="f-email" name="email" type="email" required autocomplete="email"></div>
        <div class="field"><label for="f-tel">Telefone</label><input id="f-tel" name="telefone" type="tel" autocomplete="tel"></div>
      </div>
      <div class="field"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="mensagem" required placeholder="Qual é o desafio da sua indústria?"></textarea></div>
      <div class="form-row">
        <button class="btn" type="submit" data-via="email">Enviar por e-mail ${icon.arrow}</button>
        <button class="btn btn--ghost" type="submit" data-via="whatsapp">${icon.whatsapp} Enviar por WhatsApp</button>
      </div>
      <p class="form-note">Ao enviar, você concorda com o tratamento dos seus dados conforme a <a href="privacidade.html">Política de privacidade</a>.</p>
    </form>
  </div>
</section>`;
}

/* =====================================================================
   POLÍTICA DE PRIVACIDADE
   ===================================================================== */
export function privacidade() {
  return `
${pageHero({ label: 'Privacidade', title: 'Política de privacidade', lead: 'Como a NanoBrasil trata os dados pessoais que você compartilha conosco.' })}
<div class="section--light">
<article class="container container--text article-body">
<p class="article-note">${UPDATED[0]}</p>
${privacyBody()}
</article>
</div>`;
}
