import { nav, contact } from './data.mjs';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const icon = {
  globe: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" stroke="currentColor" stroke-width="1.6"/></svg>',
  arrow: '<svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  left: '<svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  right: '<svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  close: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  check: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 10.5l3.2 3.2L15 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  search: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.8"/><path d="m14 14 3.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  pin: '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 18s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Z" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="8" r="2.2" stroke="currentColor" stroke-width="1.6"/></svg>',
  phone: '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 3h3l1.5 4-2 1.3a10 10 0 0 0 5.2 5.2L13 11.5l4 1.5v3a2 2 0 0 1-2 2A13 13 0 0 1 2 5a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  mail: '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="m3 5.5 7 5.5 7-5.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  linkedin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4V9.75Z"/></svg>',
  youtube: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.75 15.1V8.9L15.5 12l-5.75 3.1Z"/></svg>',
  instagram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>',
  whatsapp: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/></svg>',
  flask: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 15h10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  atom: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="1.8" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="currentColor" stroke-width="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="currentColor" stroke-width="1.6"/></svg>',
  compass: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  leaf: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M5 19c3-4 6-6.5 10-8.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  bolt: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  sparkle: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  heart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8 12h2l1-2 2 4 1-2h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

const brand = (root) => `<a class="brand" href="${root}index.html" aria-label="NanoBrasil, página inicial"><span class="logo-mask logo-symbol" aria-hidden="true"></span><span class="logo-mask logo-wordmark" aria-hidden="true"></span></a>`;

export function layout({ title, description, body, active = '', root = '', scripts = [] }) {
  const links = nav.map(n => `<a href="${root}${n.href}"${n.key === active ? ' aria-current="page"' : ''}>${n.label}</a>`).join('');
  const mlinks = nav.map(n => `<a class="mm-link" href="${root}${n.href}">${n.label}</a>`).join('');
  const fullTitle = title ? `${title} | NanoBrasil` : 'NanoBrasil | Pesquisa personalizada e nanopartículas para a indústria';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<script id="nb-lang-boot">(function(){var L='__LANG__',A='__ALT__';window.NB_LANG=L;if(L!=='pt')return;var s=null;try{s=localStorage.getItem('nb-lang')}catch(e){}var t=s;if(!t){var ls=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];for(var i=0;i<ls.length;i++){var c=String(ls[i]).slice(0,2).toLowerCase();if(c==='pt'||c==='en'||c==='es'){t=c;break}}}if(t&&t!=='pt'&&A[t])location.replace(A[t])})();</script>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#08080A">
<meta name="color-scheme" content="dark">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<link rel="icon" type="image/png" href="${root}assets/img/brand/favicon.png">
<link rel="apple-touch-icon" href="${root}assets/img/brand/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}assets/css/main.css">
</head>
<body>
<a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
<div class="progress" aria-hidden="true"></div>
<header class="nav" data-nav>
  <div class="container nav__inner">
    ${brand(root)}
    <nav class="nav__links" aria-label="Principal">${links}</nav>
    <div class="nav__cta">
      <div class="lang lang--nav" data-lang><button class="lang__btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Idioma" data-lang-btn>${icon.globe}<span data-lang-current data-no-i18n>PT</span><i class="lang__chev" aria-hidden="true"></i></button><ul class="lang__menu" data-no-i18n><li><a data-lang-opt="pt" hreflang="pt-BR" lang="pt-BR"><span>Português</span><small>PT</small></a></li><li><a data-lang-opt="en" hreflang="en" lang="en"><span>English</span><small>EN</small></a></li><li><a data-lang-opt="es" hreflang="es" lang="es"><span>Español</span><small>ES</small></a></li></ul></div>
      <a class="btn btn--sm btn--ghost" href="${root}contato.html">Fale conosco</a>
      <button class="nav__toggle" aria-label="Abrir menu" aria-expanded="false" data-menu-toggle><span></span></button>
    </div>
  </div>
</header>
<div class="mobile-menu" data-mobile-menu>
  <nav aria-label="Menu móvel">${mlinks}<a class="mm-link" href="${root}contato.html" style="color:var(--accent)">Fale conosco</a></nav>
  <div><nav class="lang lang--mobile" aria-label="Idioma"><ul class="lang__menu" data-no-i18n><li><a data-lang-opt="pt" hreflang="pt-BR" lang="pt-BR"><span>Português</span><small>PT</small></a></li><li><a data-lang-opt="en" hreflang="en" lang="en"><span>English</span><small>EN</small></a></li><li><a data-lang-opt="es" hreflang="es" lang="es"><span>Español</span><small>ES</small></a></li></ul></nav><div class="mono small muted mt-2">${contact.email}<br>${contact.phone}</div></div>
</div>
<main id="conteudo">
${body}
</main>
${footer(root)}
<a class="wa-float" href="${contact.whatsapp}?text=${encodeURIComponent('Olá, NanoBrasil! Vim pelo site e gostaria de falar com a equipe comercial.')}" target="_blank" rel="noopener" aria-label="Fale conosco pelo WhatsApp">
  <span class="wa-float__icon">${icon.whatsapp}</span><span class="wa-float__label">Fale no WhatsApp</span>
</a>
<div class="cookie" data-cookie role="region" aria-label="Aviso de cookies" hidden>
  <p class="cookie__text">Usamos apenas o armazenamento necessário para o site funcionar, como a sua preferência de idioma. Se você aceitar, poderemos usar cookies de medição para entender como o site é usado. <a href="${root}privacidade.html">Saiba mais</a></p>
  <div class="cookie__actions">
    <button class="btn btn--ghost btn--sm" type="button" data-cookie-choice="necessary">Somente necessários</button>
    <button class="btn btn--sm" type="button" data-cookie-choice="all">Aceitar</button>
  </div>
</div>
<script src="${root}assets/js/main.js" defer></script>
${scripts.map(s => `<script src="${root}assets/js/${s}" defer></script>`).join('\n')}
</body>
</html>`;
}

export function footer(root = '') {
  return `<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <span class="logo-mask logo-full" role="img" aria-label="NanoBrasil"></span>
        <p>O hub de nanotecnologia na América Latina. Pesquisa personalizada, consultoria e nanopartículas para a indústria.</p>
        <div class="socials">
          <a href="${contact.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon.linkedin}</a>
          <a href="${contact.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${icon.youtube}</a>
          <a href="${contact.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon.instagram}</a>
        </div>
      </div>
      <div>
        <h4>Empresa</h4>
        <ul>
          <li><a href="${root}sobre.html">Quem somos</a></li>
          <li><a href="${root}equipe.html">Equipe</a></li>
          <li><a href="${root}noticias.html">Notícias</a></li>
          <li><a href="${root}nanotecnologia.html">Nanotecnologia</a></li>
        </ul>
      </div>
      <div>
        <h4>Soluções</h4>
        <ul>
          <li><a href="${root}index.html#frentes">Pesquisa e desenvolvimento</a></li>
          <li><a href="${root}index.html#frentes">Assessoria e consultoria</a></li>
          <li><a href="${root}nanoparticulas.html">Nanopartículas</a></li>
          <li><a href="${root}areas.html">Áreas de atuação</a></li>
        </ul>
      </div>
      <div>
        <h4>Contato</h4>
        <ul class="footer__contact">
          <li>${icon.pin}<address>${contact.address} - ${contact.cep}, ${contact.city}</address></li>
          <li>${icon.phone}<a href="${contact.whatsapp}" target="_blank" rel="noopener">${contact.phone}</a></li>
          <li>${icon.mail}<a href="mailto:${contact.email}">${contact.email}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© ${new Date().getFullYear()} NanoBrasil. Todos os direitos reservados.</span>
      <a href="${root}privacidade.html">Política de privacidade</a>
      <span class="status">Sediada no ${contact.park}</span>
    </div>
  </div>
</footer>`;
}

export const ctaBlock = (root = '') => `<section class="section">
  <div class="container">
    <div class="cta reveal-scale noise">
      <canvas data-particles="cta" aria-hidden="true"></canvas>
      <div class="glow"></div>
      <span class="label">Vamos conversar?</span>
      <h2 class="h1 grad">A nanotecnologia pode ser a solução para impulsionar seu negócio.</h2>
      <p class="lead">Conte o desafio da sua indústria. Nós desenhamos a pesquisa e fornecemos as nanopartículas para levar a solução à escala.</p>
      <div class="cta__actions">
        <a class="btn btn--lg" href="${root}contato.html">Entre em contato conosco ${icon.arrow}</a>
        <a class="btn btn--lg btn--ghost" href="${contact.whatsapp}" target="_blank" rel="noopener">${icon.whatsapp} WhatsApp</a>
      </div>
    </div>
  </div>
</section>`;
