# NanoBrasil — site

Site estático (HTML/CSS/JS puro, sem dependências em produção).

## Rodar localmente
    node _src/serve.mjs        # http://localhost:5173

## Editar conteúdo e regenerar as páginas
Os textos ficam em `_src/data.mjs` (institucional) e `_src/noticias.json` (29 notícias).
O layout das páginas está em `_src/pages.mjs`, cabeçalho/rodapé em `_src/layout.mjs`.

    cd _src && npm install      # uma vez (instala o parser usado na tradução)
    node _src/build.mjs        # gera os .html em /, /en/ e /es/

## Publicar
Envie para a hospedagem tudo desta pasta **exceto** `_src/` e este README.

## Estrutura
- `index.html` — home (hero com partículas formando o símbolo)
- `sobre.html`, `areas.html`, `nanoparticulas.html`, `nanotecnologia.html`, `equipe.html`, `noticias.html`, `contato.html`
- `noticias/*.html` — 29 notícias completas
- `design-system.html` — documentação do design system
- `assets/css/main.css` — tokens + componentes
- `assets/js/main.js` — interações; `assets/js/hero.js` — animação do hero
- `assets/img/brand/` — logo sólida (gerada do arquivo original; cor aplicada via CSS)

Imagens originais (não otimizadas) ficam em `../_source/original-images/`.



## Idiomas
O site é gerado em português (`/`), inglês (`/en/`) e espanhol (`/es/`). Ao abrir uma página em português, o visitante é redirecionado para inglês ou espanhol se esse for o idioma preferido do navegador; qualquer outro idioma fica no português (padrão). O seletor no menu troca o idioma e guarda a escolha.

Para traduzir um texto novo: `node _src/build.mjs --extract`, adicione a tradução em `_src/i18n/tr-src.mjs`, rode `node _src/i18n/gen.mjs` e depois `node _src/build.mjs`. O que ficar sem tradução aparece em `_src/i18n/missing.json`. As notícias têm o texto completo traduzido em `_src/i18n/news/<slug>.mjs` (um item por bloco: parágrafos, títulos e legendas). Notícia nova sem esse arquivo aparece em inglês/espanhol com o texto em português e um aviso.
