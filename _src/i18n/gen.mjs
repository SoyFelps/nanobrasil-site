// Gera _src/i18n/en.json e es.json a partir de strings.json (textos extraídos) + tr-src.mjs (traduções)
// uso: node _src/build.mjs --extract && node _src/i18n/gen.mjs && node _src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import SRC from './tr-src.mjs';
import { team } from '../data.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const strings = JSON.parse(fs.readFileSync(path.join(DIR, 'strings.json'), 'utf8'));
const names = new Set(team.flatMap(g => g.people.map(p => p.name)));
const en = {}, es = {}, used = new Set(), unmatched = [];

for (const s of strings) {
  if (names.has(s)) { en[s] = s; es[s] = s; continue; }
  let hit = SRC.find(e => e[0] === s);
  if (!hit) hit = SRC.find(e => e[0].endsWith('…') && s.startsWith(e[0].slice(0, -1)));
  if (!hit) { unmatched.push(s); continue; }
  used.add(hit); en[s] = hit[1]; es[s] = hit[2];
}
fs.writeFileSync(path.join(DIR, 'en.json'), JSON.stringify(en, null, 1));
fs.writeFileSync(path.join(DIR, 'es.json'), JSON.stringify(es, null, 1));
console.log(`traduzidos: ${Object.keys(en).length}/${strings.length}`);
if (unmatched.length) console.log('SEM TRADUÇÃO:\n' + unmatched.map(s => '  · ' + s.slice(0, 110)).join('\n'));
const unused = SRC.filter(e => !used.has(e));
if (unused.length) console.log('entradas não usadas:\n' + unused.map(e => '  · ' + e[0].slice(0, 80)).join('\n'));
