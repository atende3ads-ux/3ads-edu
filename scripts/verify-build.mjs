import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const html = await readFile(path.join(dist, 'index.html'), 'utf8');

assert.match(html, /<html\b[^>]*lang="pt-BR"[^>]*data-standalone/, 'O HTML deve ser pt-BR e permitir abertura local.');
assert.match(html, /<title>3ADS EDU/, 'O título da página deve identificar a 3ADS EDU.');
assert.match(html, /<div id="root"><\/div>/, 'O ponto de montagem do React está ausente.');
assert.match(html, /<script type="module">[\s\S]+<\/script>/, 'O JavaScript compilado deve estar incorporado no HTML.');
assert.match(html, /<style>[\s\S]+<\/style>/, 'O CSS compilado deve estar incorporado no HTML.');
assert.doesNotMatch(html, /<script\b[^>]*\bsrc=/, 'O HTML local não deve depender de um módulo JavaScript externo.');
assert.doesNotMatch(html, /src="\/src\/main\.tsx"/, 'O build não deve apontar para o arquivo TypeScript.');

let assets = 0;
async function verifyAssets(relative = '') {
  const entries = await readdir(path.join(root, 'public', relative), { withFileTypes: true });
  for (const entry of entries) {
    const asset = path.join(relative, entry.name);
    if (entry.isDirectory()) {
      await verifyAssets(asset);
      continue;
    }
    assert.ok(entry.isFile(), `Mídia deve ser um arquivo regular: ${asset}`);
    const source = await readFile(path.join(root, 'public', asset));
    const built = await readFile(path.join(dist, asset));
    assert.ok(source.equals(built), `A mídia está ausente ou foi alterada no build: ${asset}`);
    assets += 1;
  }
}

await verifyAssets();
assert.ok((await stat(path.join(dist, 'media/edu-hero-2.mp4'))).size > 0, 'O vídeo precisa estar no build.');

// URLs relativas devem funcionar também em /nome-do-repositorio/, usado pelo Pages.
for (const prefix of ['https://example.github.io/', 'https://example.github.io/3ads-edu/']) {
  for (const asset of ['./media/edu-hero-2.mp4', './brand/3ads-edu-white.png', './brand/3ads-edu-blue.png']) {
    const url = new URL(asset, prefix);
    assert.ok(url.href.startsWith(prefix), 'Uma mídia escapou do diretório de publicação.');
  }
}

console.log(`Build validado: HTML independente e ${assets} mídias locais idênticas aos originais.`);
