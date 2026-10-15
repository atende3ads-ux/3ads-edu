import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const html = await readFile(path.join(dist, 'index.html'), 'utf8');
const htaccess = await readFile(path.join(dist, '.htaccess'), 'utf8');
const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
const privacySource = await readFile(path.join(root, 'src/privacy.ts'), 'utf8');
const programModalSource = await readFile(path.join(root, 'src/components/ProgramModal.tsx'), 'utf8');

assert.match(html, /<html\b[^>]*lang="pt-BR"[^>]*data-standalone/, 'O HTML deve ser pt-BR e permitir abertura local.');
assert.match(html, /<title>3ADS EDU/, 'O título da página deve identificar a 3ADS EDU.');
assert.match(html, /<link rel="canonical" href="https:\/\/3adsedu\.com\.br\/"/, 'A canonical pública está ausente.');
assert.match(html, /property="og:title"/, 'Os metadados Open Graph estão ausentes.');
assert.match(html, /name="twitter:card"/, 'Os metadados do Twitter estão ausentes.');
assert.match(html, /application\/ld\+json/, 'Os dados estruturados estão ausentes.');
assert.match(html, /<div id="root"><\/div>/, 'O ponto de montagem do React está ausente.');
assert.match(html, /<script type="module">[\s\S]+<\/script>/, 'O JavaScript compilado deve estar incorporado no HTML.');
assert.match(html, /<style>[\s\S]+<\/style>/, 'O CSS compilado deve estar incorporado no HTML.');
assert.doesNotMatch(html, /<script\b[^>]*\btype="module"[^>]*\bsrc=/, 'O HTML local não deve depender de um módulo JavaScript externo.');
assert.doesNotMatch(html, /src="\/src\/main\.tsx"/, 'O build não deve apontar para o arquivo TypeScript.');
assert.match(html, /GTM-K82W4KD/, 'O contêiner do Google Tag Manager deve estar presente no gerenciador de consentimento.');
assert.doesNotMatch(html, /googletagmanager\.com\/gtag\/js/, 'O GA4 não deve ser instalado diretamente além do GTM.');
assert.match(privacySource, /dataLayerCommand\('consent', 'default',[\s\S]*?loadTagManager\(\);/, 'O consentimento padrão deve ser definido antes de carregar o GTM.');
assert.doesNotMatch(privacySource, /if \(preferences\.analytics && preferences\.marketing\) loadTagManager\(\)/, 'O GTM necessário não pode depender de consentimento opcional.');
assert.match(html, /18 horas de imersão/, 'O modal de IA para Negócios deve incluir a carga horária publicada.');
assert.match(html, /Confira como foram outras edições/, 'O modal de IA para Negócios deve incluir a galeria de edições anteriores.');
assert.match(html, /formato-treinamentos\.webp/, 'A galeria do programa deve incluir fotos locais de edições anteriores.');
assert.match(programModalSource, /role="dialog"[\s\S]*aria-modal="true"/, 'O modal de programa deve expor semântica acessível.');
assert.match(html, /Validação concluída\. Nenhum dado foi enviado/, 'O formulário sem endpoint não pode simular envio bem-sucedido.');
assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/, 'As fontes devem ser servidas localmente.');
assert.match(robots, /Sitemap: https:\/\/3adsedu\.com\.br\/sitemap\.xml/, 'O robots.txt deve apontar para o sitemap canônico.');
assert.match(sitemap, /<loc>https:\/\/3adsedu\.com\.br\/<\/loc>/, 'O sitemap deve conter a URL pública canônica.');
assert.match(htaccess, /Content-Security-Policy-Report-Only/, 'A CSP deve iniciar em modo Report-Only.');
assert.match(htaccess, /Referrer-Policy/, 'O cabeçalho Referrer-Policy está ausente.');
assert.doesNotMatch(htaccess, /__SCRIPT_HASHES__/, 'Os hashes da CSP não foram atualizados.');
for (const match of html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
  const hash = `'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`;
  assert.ok(htaccess.includes(hash), `A CSP não autoriza o script inline ${hash}.`);
}

let assets = 0;
async function verifyAssets(relative = '') {
  const entries = await readdir(path.join(root, 'public', relative), { withFileTypes: true });
  for (const entry of entries) {
    const asset = path.join(relative, entry.name);
    if (entry.isDirectory()) {
      await verifyAssets(asset);
      continue;
    }
    if (asset === '.htaccess') continue;
    assert.ok(entry.isFile(), `Mídia deve ser um arquivo regular: ${asset}`);
    const source = await readFile(path.join(root, 'public', asset));
    const built = await readFile(path.join(dist, asset));
    assert.ok(source.equals(built), `A mídia está ausente ou foi alterada no build: ${asset}`);
    assets += 1;
  }
}

await verifyAssets();
assert.ok((await stat(path.join(dist, 'media/edu-hero-2.mp4'))).size > 0, 'O vídeo precisa estar no build.');
assert.match(html, /rel="preload" href="\.\/media\/edu-hero-2-poster\.webp" as="image"/, 'O pôster de LCP deve ser descoberto no HTML inicial.');

// URLs relativas devem funcionar também em /nome-do-repositorio/, usado pelo Pages.
for (const prefix of ['https://example.github.io/', 'https://example.github.io/3ads-edu/']) {
  for (const asset of ['./media/edu-hero-2.mp4', './brand/3ads-edu-white.png', './brand/3ads-edu-blue.png']) {
    const url = new URL(asset, prefix);
    assert.ok(url.href.startsWith(prefix), 'Uma mídia escapou do diretório de publicação.');
  }
}

console.log(`Build validado: HTML independente e ${assets} mídias locais idênticas aos originais.`);
