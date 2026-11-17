// Núcleo de tradução: extrai e substitui unidades de texto no HTML gerado em português.
// Uma "unidade" é: (a) o innerHTML de um elemento com texto misturado a tags inline (strong, b, br…),
// (b) um nó de texto simples, ou (c) um atributo legível (alt, aria-label, placeholder, title, meta).
import { parseHTML } from 'linkedom';

export const LANGS = ['pt', 'en', 'es'];
export const HTML_LANG = { pt: 'pt-BR', en: 'en', es: 'es' };
export const OG_LOCALE = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'SVG', 'NOSCRIPT', 'CODE', 'SELECT', 'OPTION']);
const INLINE = new Set(['STRONG', 'B', 'EM', 'BR', 'SMALL', 'A', 'SPAN', 'I']);
const ATTRS = ['alt', 'aria-label', 'placeholder', 'title'];
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const hasLetters = (s) => /\p{L}{2,}/u.test(s);
// não precisa de tradução: símbolos químicos, marcas, contatos, números
const KEEP = /^(nano|NanoBrasil|POOF|BH-TEC|LinkedIn|YouTube|Instagram|WhatsApp|E-mail|BASF|CTNano|Henkel|Nitro|MCassab|Tigre|Vale|Vibra|WEG Tintas|US\$|[A-Z][a-z]?|[\d\s.,:+–\-/·%µnm]+|.*@.*|https?:.*|\d+ \p{L}{3,4} \d{4}|\d+ min)$/u;

const isIconHolder = (el) => !!el.querySelector && !!el.querySelector('svg');
const isMixed = (el) => {
  let text = false, inline = false;
  for (const n of el.childNodes) {
    if (n.nodeType === 3) { if (norm(n.textContent)) text = true; }
    else if (n.nodeType === 1) {
      if (!INLINE.has(n.tagName) || isIconHolder(n) || n.tagName === 'SPAN' && n.querySelector('*:not(br)')) return false;
      inline = true;
    }
  }
  return text && inline;
};
const skipEl = (el) => SKIP_TAGS.has(el.tagName) || el.hasAttribute('data-article') || el.hasAttribute('data-no-i18n');

/** Percorre as unidades traduzíveis de um documento. cb(kind, key, apply) — apply(novoTexto) substitui. */
export function walk(document, cb) {
  const visit = (el) => {
    if (el.tagName === 'SELECT' && el.hasAttribute('aria-label')) { const v = norm(el.getAttribute('aria-label')); cb('attr', v, (t) => el.setAttribute('aria-label', t)); }
    if (skipEl(el)) return;
    // junta nós de texto vizinhos (entidades como &amp; dividem o texto)
    for (let n = el.firstChild; n; n = n.nextSibling) {
      while (n.nodeType === 3 && n.nextSibling && n.nextSibling.nodeType === 3) { n.textContent += n.nextSibling.textContent; n.nextSibling.remove(); }
    }
    for (const a of ATTRS) if (el.hasAttribute && el.hasAttribute(a)) {
      const v = norm(el.getAttribute(a)); if (hasLetters(v) && !KEEP.test(v)) cb('attr', v, (t) => el.setAttribute(a, t));
    }
    if (el.tagName === 'INPUT' && el.getAttribute('type') === 'radio') {
      const v = norm(el.getAttribute('value') || ''); if (hasLetters(v)) cb('attr', v, (t) => el.setAttribute('value', t));
    }
    if (isMixed(el)) {
      const v = norm(el.innerHTML); if (hasLetters(v)) cb('html', v, (t) => { el.innerHTML = t; });
      return;
    }
    for (const n of [...el.childNodes]) {
      if (n.nodeType === 3) {
        const raw = n.textContent, v = norm(raw);
        if (!hasLetters(v) || KEEP.test(v)) continue;
        cb('text', v, (t) => { const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0]; n.textContent = lead + t + trail; });
      } else if (n.nodeType === 1) visit(n);
    }
  };
  // <title> e metas
  const title = document.querySelector('title');
  if (title) { const v = norm(title.textContent).replace(/\s*\|\s*NanoBrasil$/, '').replace(/^NanoBrasil\s*\|\s*/, ''); if (hasLetters(v) && v !== 'NanoBrasil') cb('text', v, (t) => { title.textContent = title.textContent.includes('| NanoBrasil') && !title.textContent.startsWith('NanoBrasil |') ? `${t} | NanoBrasil` : `NanoBrasil | ${t}`; }); }
  for (const m of document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[property="og:title"]')) {
    const v = norm(m.getAttribute('content') || '').replace(/\s*\|\s*NanoBrasil$/, '').replace(/^NanoBrasil\s*\|\s*/, '');
    if (hasLetters(v)) cb('attr', v, (t) => m.setAttribute('content', m.getAttribute('property') === 'og:title' ? `${t} | NanoBrasil` : t));
  }
  // dados da equipe (bios) dentro de JSON
  const td = document.getElementById('team-data');
  if (td) {
    const data = JSON.parse(td.textContent);
    data.forEach((p) => { for (const k of ['role', 'bio']) cb('text', norm(p[k]), (t) => { p[k] = t; }); });
    cb('commit', null, () => { td.textContent = JSON.stringify(data).replace(/</g, '\\u003c'); });
  }
  visit(document.body);
}

/** Extrai as unidades de um HTML (para gerar/atualizar os dicionários). */
export function extract(html) {
  const { document } = parseHTML(html); const out = [];
  walk(document, (kind, key) => { if (key) out.push(key); });
  return out;
}

const MONTHS = {
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'],
};
// textos com partes variáveis
const PATTERNS = {
  en: [[/^Saiba mais sobre (.+)$/, 'More about $1'], [/^(\d+) publicações$/, '$1 articles'], [/^(\d+) min de leitura$/, '$1 min read'], [/^Aplicação de nanotecnologia em (.+)$/, null]],
  es: [[/^Saiba mais sobre (.+)$/, 'Más sobre $1'], [/^(\d+) publicações$/, '$1 publicaciones'], [/^(\d+) min de leitura$/, '$1 min de lectura'], [/^Aplicação de nanotecnologia em (.+)$/, null]],
};

/**
 * Traduz um HTML português para `lang`, ajustando caminhos (a página passa a viver em /lang/).
 * missing: Set onde são registradas as unidades sem tradução.
 */
export function translate(html, lang, dict, missing) {
  const { document } = parseHTML(html);
  if (lang !== 'pt') {
    const pending = [];
    walk(document, (kind, key, apply) => {
      if (kind === 'commit') { pending.push(apply); return; }
      let t = dict[key];
      if (t === undefined) {
        for (const [re, rep] of PATTERNS[lang]) if (re.test(key)) {
          if (rep) t = key.replace(re, rep);
          else { const m = key.match(re); const area = dict[m[1][0].toUpperCase() + m[1].slice(1)]; t = area ? (lang === 'en' ? `Nanotechnology applied to ${area.toLowerCase()}` : `Nanotecnología aplicada a ${area.toLowerCase()}`) : undefined; }
          break;
        }
      }
      if (t === undefined) { missing.add(key); return; }
      apply(t);
    });
    pending.forEach((f) => f());
    // datas dos cards (ex.: "10 nov 2026")
    for (const s of document.querySelectorAll('.news-card__meta span:first-child')) {
      s.textContent = s.textContent.replace(/(\d+) (\p{L}+) (\d{4})/u, (m, d, mo, y) => { const i = MONTHS.pt.indexOf(mo); return i < 0 ? m : lang === 'en' ? `${MONTHS.en[i]} ${d}, ${y}` : `${d} ${MONTHS.es[i]} ${y}`; });
    }
    // data do artigo (ex.: "08/07/2026")
    for (const s of document.querySelectorAll('.article-meta span:first-child')) {
      s.textContent = s.textContent.replace(/(\d{2})\/(\d{2})\/(\d{4})/, (m, d, mo, y) => lang === 'en' ? `${MONTHS.en[+mo - 1]} ${+d}, ${y}` : `${+d} ${MONTHS.es[+mo - 1]} ${y}`);
    }
    // busca de notícias usa o título traduzido
    for (const c of document.querySelectorAll('.news-card')) { const h = c.querySelector('.news-card__title'); if (h) c.setAttribute('data-search', h.textContent.toLowerCase()); }
    // os caminhos para /assets sobem um nível (a página está em /en/ ou /es/)
    for (const el of document.querySelectorAll('[src], [href]')) for (const a of ['src', 'href']) {
      const v = el.getAttribute(a); if (v && /^(\.\.\/)*assets\//.test(v)) el.setAttribute(a, '../' + v);
    }
  }
  return '<!doctype html>\n' + document.documentElement.outerHTML;
}

/** Ajustes comuns a todos os idiomas: lang, alternates, seletor, variável global. relPath = caminho da página relativo ao site (ex.: "noticias/x.html"). */
export function localize(html, lang, relPath) {
  const { document } = parseHTML(html);
  document.documentElement.setAttribute('lang', HTML_LANG[lang]);
  const depth = (lang === 'pt' ? 0 : 1) + relPath.split('/').length - 1;
  const up = '../'.repeat(depth);
  const urlFor = (l) => up + (l === 'pt' ? '' : l + '/') + relPath;
  const head = document.head;
  for (const l of LANGS) {
    const link = document.createElement('link'); link.setAttribute('rel', 'alternate'); link.setAttribute('hreflang', HTML_LANG[l]); link.setAttribute('href', urlFor(l)); head.appendChild(link);
  }
  const xd = document.createElement('link'); xd.setAttribute('rel', 'alternate'); xd.setAttribute('hreflang', 'x-default'); xd.setAttribute('href', urlFor('pt')); head.appendChild(xd);
  const og = document.querySelector('meta[property="og:locale"]'); if (og) og.setAttribute('content', OG_LOCALE[lang]);
  for (const a of document.querySelectorAll('[data-lang-opt]')) {
    const l = a.getAttribute('data-lang-opt');
    a.setAttribute('href', urlFor(l));
    if (l === lang) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  }
  for (const c of document.querySelectorAll('[data-lang-current]')) c.textContent = lang.toUpperCase();
  const boot = document.getElementById('nb-lang-boot');
  if (boot) boot.textContent = boot.textContent.replace("'__LANG__'", `'${lang}'`).replace("'__ALT__'", JSON.stringify({ pt: urlFor('pt'), en: urlFor('en'), es: urlFor('es') }));
  return '<!doctype html>\n' + document.documentElement.outerHTML;
}
