// Gera o site estático em 3 idiomas: node _src/build.mjs
//   /           → português (padrão)
//   /en/, /es/  → inglês e espanhol (traduzidos pelos dicionários em _src/i18n/*.json)
// node _src/build.mjs --extract  → atualiza _src/i18n/strings.json com todos os textos a traduzir
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { layout } from './layout.mjs';
import * as P from './pages.mjs';
import { designSystem } from './ds.mjs';
import { extract, translate, localize } from './i18n/core.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, '_src');
const news = JSON.parse(fs.readFileSync(path.join(SRC, 'noticias.json'), 'utf8'));
const write = (rel, html) => { const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };

const pages = [
  ['index.html', { title: '', description: 'A NanoBrasil desenvolve pesquisas personalizadas com nanopartículas e fornece nanopartículas para a indústria. Hub de nanotecnologia da América Latina, no BH-TEC.', body: P.home(news), scripts: ['hero.js', 'vortex.js'] }],
  ['sobre.html', { title: 'Quem somos', active: 'sobre', description: 'A NanoBrasil é o hub de nanotecnologia na América Latina, sediada no BH-TEC, com laboratório e equipe técnica especializada.', body: P.sobre() }],
  ['areas.html', { title: 'Áreas de atuação', active: 'areas', description: 'Avicultura, tintas, agro, home care, polímeros, construção, têxtil, pet e saúde: aplicações de nanopartículas da NanoBrasil.', body: P.areasPage() }],
  ['nanoparticulas.html', { title: 'Nanopartículas', active: 'nanoparticulas', description: 'Nanocobre, óxido de zinco, dióxido de titânio, silício, carbonato de cálcio e mais: nanopartículas estabilizadas e padronizadas para a sua indústria.', body: P.nanoparticulas() }],
  ['nanotecnologia.html', { title: 'Nanotecnologia: da ciência à indústria', active: 'nanotecnologia', description: 'Por que nanotecnologia? Vantagens, aplicações e como a NanoBrasil leva a ciência à indústria.', body: P.nanotecnologia() }],
  ['equipe.html', { title: 'Equipe', active: 'equipe', description: 'Conheça a equipe multidisciplinar da NanoBrasil: gestão, equipe técnica e administrativo-financeiro.', body: P.equipe() }],
  ['noticias.html', { title: 'Notícias', active: 'noticias', description: 'Notícias da Agência de Notícias NanoBrasil.', body: P.noticias(news) }],
  ['privacidade.html', { title: 'Política de privacidade', description: 'Como a NanoBrasil coleta, usa, armazena e protege os dados pessoais de quem entra em contato, e como solicitar a exclusão dos seus dados.', body: P.privacidade() }],
  ['contato.html', { title: 'Contato', description: 'Fale com a NanoBrasil: pesquisa personalizada, compra de nanopartículas e consultoria em nanotecnologia.', body: P.contato() }],
];

// páginas em português (HTML base)
const out = pages.map(([rel, opts]) => ({ rel, html: layout(opts) }));
for (const a of news) {
  const excerpt = (a.blocks.find(b => b.tag === 'p')?.html || '').replace(/<[^>]+>/g, '').slice(0, 155);
  const opts = { title: a.title, active: 'noticias', root: '../', body: P.article(a, news) };
  // nos outros idiomas a descrição usa o título traduzido (o corpo do artigo fica em português)
  out.push({ rel: `noticias/${a.slug}.html`, html: layout({ ...opts, description: excerpt }), alt: layout({ ...opts, description: a.title }), article: a });
}

if (process.argv.includes('--extract')) {
  const keys = new Map();
  for (const p of out) for (const k of extract(p.alt || p.html)) keys.set(k, (keys.get(k) || 0) + 1);
  const file = path.join(SRC, 'i18n/strings.json');
  fs.writeFileSync(file, JSON.stringify([...keys.keys()], null, 1));
  console.log(`${keys.size} textos únicos → ${path.relative(ROOT, file)}`);
  process.exit(0);
}

const NOTE = {
  en: 'This article is available in Portuguese only.',
  es: 'Este artículo está disponible solo en portugués.',
};
const dicts = { en: JSON.parse(fs.readFileSync(path.join(SRC, 'i18n/en.json'), 'utf8')), es: JSON.parse(fs.readFileSync(path.join(SRC, 'i18n/es.json'), 'utf8')) };

for (const p of out) write(p.rel, localize(p.html, 'pt', p.rel));
// o design system é documentação interna: só em português, sem seletor nem versões alternativas
write('design-system.html', localize(layout({ title: 'Design System', description: 'Design system do site NanoBrasil.', body: designSystem() }), 'pt', 'design-system.html')
  .replace(/<link[^>]*rel="alternate"[^>]*>/g, '').replace(/<div class="lang[^"]*" data-lang="">[\s\S]*?<\/ul><\/div>/g, '').replace(/<nav class="lang lang--mobile"[\s\S]*?<\/ul><\/nav>/g, ''));

// traduções do corpo das notícias: _src/i18n/news/<slug>.mjs → { en: [...], es: [...] } (um item por bloco)
const newsTr = {};
for (const a of news) {
  const file = path.join(SRC, 'i18n/news', a.slug + '.mjs');
  if (!fs.existsSync(file)) continue;
  const tr = (await import(pathToFileURL(file).href)).default;
  for (const lang of ['en', 'es']) {
    if (!tr[lang]) continue;
    if (tr[lang].length !== a.blocks.length) throw new Error(`${a.slug} [${lang}]: ${tr[lang].length} blocos traduzidos, esperado ${a.blocks.length}`);
    a.blocks.forEach((b, k) => { if (b.tag !== 'iframe' && typeof tr[lang][k] !== 'string') throw new Error(`${a.slug} [${lang}] bloco ${k} vazio`); });
  }
  newsTr[a.slug] = tr;
}
// artigo com os blocos no idioma pedido (imagens mantêm a foto, trocam a legenda)
const localizedArticle = (a, lang) => ({ ...a, blocks: a.blocks.map((b, k) => b.tag === 'img' ? { ...b, caption: newsTr[a.slug][lang][k] } : b.tag === 'iframe' ? b : { ...b, html: newsTr[a.slug][lang][k] }) });

const report = {};
for (const lang of ['en', 'es']) {
  const missing = new Set();
  for (const p of out) {
    let src = p.alt || p.html;
    const done = p.article && newsTr[p.article.slug]?.[lang];
    if (done) src = layout({ title: p.article.title, active: 'noticias', root: '../', description: p.article.title, body: P.article(localizedArticle(p.article, lang), news) });
    let html = translate(src, lang, dicts[lang], missing);
    // notícias ainda sem tradução do corpo: avisa que o texto está em português
    if (p.article && !done) html = html.replace(/(<article[^>]*data-article[^>]*>)/, `$1<p class="article-note">${NOTE[lang]}</p>`);
    write(`${lang}/${p.rel}`, localize(html, lang, p.rel));
  }
  report[lang] = [...missing];
}
fs.writeFileSync(path.join(SRC, 'i18n/missing.json'), JSON.stringify(report, null, 1));
console.log(`ok: ${pages.length} páginas + ${news.length} notícias × 3 idiomas · sem tradução: en ${report.en.length}, es ${report.es.length} · notícias traduzidas: ${Object.keys(newsTr).length}/${news.length}`);
