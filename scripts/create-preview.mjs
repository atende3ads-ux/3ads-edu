import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Torna o próprio dist/index.html compatível com servidor e duplo clique.
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distRoot = path.join(projectRoot, 'dist');
let html = await readFile(path.join(distRoot, 'index.html'), 'utf8');
html = html.replace(/<html\b([^>]*)>/, '<html$1 data-standalone>');

for (const match of html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g)) {
  if (/^https?:/.test(match[1])) continue;
  const source = await readFile(path.join(distRoot, match[1]), 'utf8');
  html = html.replace(match[0], () => `<script type="module">${source.replaceAll('</script', '<\\/script')}</script>`);
}

for (const match of html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)) {
  if (/^https?:/.test(match[1])) continue;
  const styles = await readFile(path.join(distRoot, match[1]), 'utf8');
  const standaloneStyles = styles.replace(/url\((['"]?)(?:\.\.\/|\/)fonts\//g, 'url($1./fonts/');
  html = html.replace(match[0], () => `<style>${standaloneStyles}</style>`);
}

const favicon = await readFile(path.join(projectRoot, 'public/favicon.png'));
html = html.replace('href="./favicon.png"', `href="data:image/png;base64,${favicon.toString('base64')}"`);
await writeFile(path.join(distRoot, 'index.html'), html);

const scriptHashes = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => `'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`)
  .join(' ');
const htaccessPath = path.join(distRoot, '.htaccess');
const htaccess = (await readFile(htaccessPath, 'utf8')).replace('__SCRIPT_HASHES__', scriptHashes);
await writeFile(htaccessPath, htaccess);
console.log('dist/index.html pronto para duplo clique. Mantenha as pastas media/, images/ e brand/ junto.');
