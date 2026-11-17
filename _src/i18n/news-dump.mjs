// Mostra os blocos de texto de notícias (por índice) para tradução: node _src/i18n/news-dump.mjs 0 1 2
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const DIR = path.dirname(fileURLToPath(import.meta.url));
const news = JSON.parse(fs.readFileSync(path.join(DIR, '../noticias.json'), 'utf8'));
for (const i of process.argv.slice(2).map(Number)) {
  const a = news[i]; console.log(`\n### ${i} ${a.slug}`);
  a.blocks.forEach((b, k) => console.log(`[${k}] ${b.tag}: ${b.tag === 'img' ? (b.caption || '(sem legenda)') : b.tag === 'iframe' ? '(iframe)' : b.html}`));
}
