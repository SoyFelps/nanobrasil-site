import { icon } from './layout.mjs';

const sw = (name, v, note, light) => `<div><div class="ds-sw" style="background:${v};${light ? 'color:#0B0B0D' : ''}"><span>${v}</span></div><b class="small">${name}</b><div class="small muted">${note}</div></div>`;

export function designSystem() {
  return `
<style>
.ds-sw{height:96px;border-radius:12px;box-shadow:inset 0 0 0 1px var(--border-strong);display:flex;align-items:flex-end;padding:10px;font-family:var(--mono);font-size:.72rem;color:#fff;margin-bottom:10px}
.ds-row{display:grid;grid-template-columns:220px 1fr;gap:24px;padding:18px 0;border-top:1px solid var(--border);align-items:baseline}
.section--light .ds-row{border-color:var(--l-border)}
@media(max-width:720px){.ds-row{grid-template-columns:1fr;gap:6px}}
.ds-code{font-family:var(--mono);font-size:.75rem;color:var(--dim)}
.ds-box{border-radius:16px;min-height:180px;display:grid;place-items:center}
.ds-rule{display:grid;grid-template-columns:22px 1fr;gap:10px;font-size:.92rem}
.ds-rule i{font-style:normal;font-weight:700}
</style>
<section class="page-hero noise">
  <div class="bg-grid"></div><div class="glow"></div>
  <canvas data-particles="hero" aria-hidden="true"></canvas>
  <div class="container">
    <span class="label fade-up">Design System · V2</span>
    <h1 class="h1 grad fade-up d1">NanoBrasil Design System.</h1>
    <p class="lead fade-up d2">Dark-first, com o laranja como única cor de destaque. Seções claras entram onde há leitura longa ou fotografia.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><span class="label">01 Princípios</span><h2 class="h2 grad">Como o site se comporta.</h2></div>
    <div class="grid g3">
      <div class="card"><h3 class="h3">Escuro como base</h3><p class="muted">Hero, serviços, catálogo e números em fundo quase preto, com linhas finas de 1px e brilhos sutis.</p></div>
      <div class="card"><h3 class="h3">Claro para ler</h3><p class="muted">Áreas, notícias, equipe e textos longos em off-white, para conforto de leitura e fotos com cor real.</p></div>
      <div class="card"><h3 class="h3">Um só acento</h3><p class="muted">Laranja apenas em botões principais, marcadores, estados ativos e brilhos. Nada de azul.</p></div>
    </div>
  </div>
</section>

<section class="section bordered">
  <div class="container">
    <div class="section-head"><span class="label">02 Logo</span><h2 class="h2 grad">Sempre sólida.</h2><p class="lead">Aplicada por máscara CSS sobre o arquivo original, em uma única cor. A versão colorida nunca é usada.</p></div>
    <div class="grid g3">
      <div class="ds-box" style="background:var(--bg-2);box-shadow:inset 0 0 0 1px var(--border);color:#fff"><span class="logo-mask logo-full" style="width:84px"></span></div>
      <div class="ds-box" style="background:var(--l-bg);color:#0B0B0D"><span class="logo-mask logo-full" style="width:84px"></span></div>
      <div class="ds-box" style="background:var(--accent);color:#fff"><span class="logo-mask logo-full" style="width:84px"></span></div>
    </div>
    <div class="card mt-2"><div class="grid g2">
      <div class="ds-rule"><i class="accent">✓</i><span>Versões: vertical (rodapé), símbolo + nome (navegação), símbolo (favicon).</span></div>
      <div class="ds-rule"><i class="accent">✓</i><span>Branco sobre escuro; preto sobre claro; branco sobre laranja.</span></div>
      <div class="ds-rule"><i class="muted">✕</i><span>Nunca a versão colorida (degradê no símbolo, “nano” laranja).</span></div>
      <div class="ds-rule"><i class="muted">✕</i><span>Sem distorção, sombra, contorno ou rotação em repouso.</span></div>
    </div></div>
  </div>
</section>

<section class="section bordered">
  <div class="container">
    <div class="section-head"><span class="label">03 Cor</span><h2 class="h2 grad">Preto, branco, cinza. E laranja.</h2></div>
    <div class="grid g4">
      ${sw('Acento', '#F26430', 'Botões, marcadores, ativos')}
      ${sw('Acento hover', '#FF7A45', 'Hover de botões')}
      ${sw('Laranja marca', '#C4522A', 'Texto de destaque em fundo claro')}
      ${sw('Acento suave', 'rgba(242,100,48,.12)', 'Fundos de estado ativo')}
      ${sw('Fundo', '#08080A', 'Base escura')}
      ${sw('Superfície', '#111114', 'Cartões e painéis')}
      ${sw('Texto', '#EDEDEF', 'Texto principal', true)}
      ${sw('Texto secundário', '#9C9CA5', 'Apoio e legendas')}
      ${sw('Off-white', '#F6F6F4', 'Seções claras', true)}
      ${sw('Branco', '#FFFFFF', 'Cartões claros', true)}
      ${sw('Tinta', '#0B0B0D', 'Texto em fundo claro')}
      ${sw('Cinza claro', '#5E5E66', 'Secundário em fundo claro')}
    </div>
  </div>
</section>

<section class="section section--light">
  <div class="container">
    <div class="section-head"><span class="label">04 Tipografia</span><h2 class="h2">Geist e Geist Mono.</h2><p class="lead">Títulos em peso 550–600 com tracking negativo e degradê sutil; rótulos técnicos em mono maiúsculo.</p></div>
    <div class="ds-row"><span class="ds-code">Hero · 4.6rem / 600 / -0.045em</span><span class="h-hero grad">Nano.</span></div>
    <div class="ds-row"><span class="ds-code">H1 · 3.6rem / 550</span><span class="h1">Sob medida.</span></div>
    <div class="ds-row"><span class="ds-code">H2 · 2.7rem / 550</span><span class="h2">Duas frentes.</span></div>
    <div class="ds-row"><span class="ds-code">H3 · 1.4rem / 550</span><span class="h3">Nanopartículas prontas</span></div>
    <div class="ds-row"><span class="ds-code">Lead · 1.12rem</span><span class="lead">Desenvolvemos pesquisas personalizadas com nanopartículas.</span></div>
    <div class="ds-row"><span class="ds-code">Corpo · 16px / 1.6</span><span>A nanotecnologia permite desenvolver materiais com novas propriedades.</span></div>
    <div class="ds-row"><span class="ds-code">Rótulo · Geist Mono 0.78rem</span><span class="label">Áreas de atuação</span></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><span class="label">05 Componentes</span><h2 class="h2 grad">Blocos de construção.</h2></div>
    <div class="chips" style="gap:10px;align-items:center">
      <a class="btn" href="#">Primário ${icon.arrow}</a>
      <a class="btn btn--ghost" href="#">Secundário</a>
      <a class="btn btn--white" href="#">Branco</a>
      <a class="btn btn--sm" href="#">Pequeno</a>
      <a class="link" href="#">Link ${icon.arrow}</a>
      <span class="chip">Chip</span>
      <a class="announce" href="#"><b>Novidade</b>Anúncio ${icon.arrow}</a>
    </div>
    <div class="grid g3 mt-4">
      <article class="card element"><div class="element__top"><span>29</span><span>nano</span></div><div class="element__sym">Cu</div><div class="element__name">Cobre</div><div class="element__form">Nanocobre 99,97% metálico</div><div class="chips"><span class="chip">Agro</span><span class="chip">Saúde</span></div></article>
      <div class="card"><div class="card__icon">${icon.flask}</div><h3 class="h3">Cartão</h3><p class="muted">Borda de 1px. Passe o cursor: a borda acende em laranja seguindo o mouse.</p></div>
      <div class="card"><div class="front__visual pipeline" style="margin:0"><div class="pipe is-done"><i>01</i>Etapa concluída<span>done</span></div><div class="pipe is-on"><i>02</i>Etapa ativa<span>on</span></div><div class="pipe"><i>03</i>Próxima etapa<span>next</span></div></div></div>
    </div>
  </div>
</section>

<section class="section bordered">
  <div class="container">
    <div class="section-head"><span class="label">06 Espaço, forma e movimento</span><h2 class="h2 grad">Ritmo consistente.</h2></div>
    <div class="ds-row"><span class="ds-code">Container</span><span class="small muted">1200px · gutter clamp(20px, 4vw, 40px) · seção clamp(72px, 9vw, 128px)</span></div>
    <div class="ds-row"><span class="ds-code">Raios</span><span class="small muted">8 · 12 · 16 · 24 · pílula</span></div>
    <div class="ds-row"><span class="ds-code">Linhas</span><span class="small muted">1px rgba(255,255,255,.08) no escuro · rgba(0,0,0,.08) no claro</span></div>
    <div class="ds-row"><span class="ds-code">Easing</span><span class="small muted">cubic-bezier(.16, 1, .3, 1) para entradas e revelações</span></div>
    <div class="ds-row"><span class="ds-code">Hero</span><span class="small muted">Enxame de 2.600 partículas que se transforma: nanopartícula, rede cristalina e símbolo NanoBrasil. Arraste para girar, clique para dispersar.</span></div>
  </div>
</section>`;
}
