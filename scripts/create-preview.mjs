import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Torna o próprio dist/index.html compatível com servidor e duplo clique.
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distRoot = path.join(projectRoot, 'dist');
let html = await readFile(path.join(distRoot, 'index.html'), 'utf8');
html = html.replace(/<html\b([^>]*)>/, '<html$1 data-standalone>');

for (const match of html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g)) {
  const source = await readFile(path.join(distRoot, match[1]), 'utf8');
  html = html.replace(match[0], () => `<script type="module">${source.replaceAll('</script', '<\\/script')}</script>`);
}

for (const match of html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)) {
  if (/^https?:/.test(match[1])) continue;
  const styles = await readFile(path.join(distRoot, match[1]), 'utf8');
  html = html.replace(match[0], () => `<style>${styles}</style>`);
}

const favicon = await readFile(path.join(projectRoot, 'public/favicon.png'));
html = html.replace('href="./favicon.png"', `href="data:image/png;base64,${favicon.toString('base64')}"`);
await writeFile(path.join(distRoot, 'index.html'), html);
console.log('dist/index.html pronto para duplo clique. Mantenha as pastas media/, images/ e brand/ junto.');
