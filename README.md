# 3ADS EDU

Landing page em React + TypeScript + Tailwind CSS, com Vite e ícones Lucide. Copy adaptada para a 3ADS EDU, identidade oficial da marca e composição editorial inspirada na referência Nevio. Sem formulário ou backend.

- Repositório: [atende3ads-ux/3ads-edu](https://github.com/atende3ads-ux/3ads-edu)
- Site: [3ADS EDU no GitHub Pages](https://atende3ads-ux.github.io/3ads-edu/)

## Visualizar e editar

Use Node.js 24, conforme `.nvmrc` (compatibilidade mínima: 22.12). Após clonar o repositório, execute `npm ci`. Para abrir o HTML por duplo clique, execute também `npm run build` antes.

- Com o servidor ativo: http://127.0.0.1:5173/
- Por duplo clique: abra o `index.html` da raiz. Ele encaminha para `dist/index.html`, com React e CSS já compilados.
- Também é possível abrir `dist/index.html` diretamente. Mantenha as pastas `dist/media/`, `dist/images/` e `dist/brand/` junto dele.

```sh
npm ci             # instala as versões do package-lock.json, se necessário
npm run dev        # inicia a prévia com atualização automática
npm run typecheck  # verifica o TypeScript
npm run check      # compila e verifica o HTML e todas as mídias
npm run build      # atualiza dist/ para publicação ou duplo clique
npm run preview    # serve o build localmente
```

Depois de editar o código, rode `npm run build` para atualizar a versão de duplo clique. Não edite `dist/` nem `node_modules/` manualmente. O comando `build:html` continua disponível como alias de `build`.

## Publicação no GitHub Pages

O fluxo `.github/workflows/deploy-pages.yml` instala as dependências, verifica o TypeScript, compila o site, confere o HTML e as mídias e publica somente `dist/`.

- Cada push em `main` atualiza o site automaticamente.
- Pull requests executam as verificações sem publicar.
- Para republicar sem alterar arquivos, use **Actions → Publicar no GitHub Pages → Run workflow**.
- Em **Settings → Pages**, a origem de publicação deve ser **GitHub Actions**.
- A base relativa do Vite mantém imagens, vídeo e logo funcionando no endereço `/3ads-edu/`, no servidor local e no HTML aberto por duplo clique.

`node_modules/`, `dist/`, caches, arquivos de editor e credenciais ficam fora do Git. As versões locais de `node_modules/` e `dist/` são preservadas. Não é necessário Git LFS para as mídias atuais.

Para enviar alterações:

```sh
npm run check
git add src public README.md
git commit -m "Atualiza a página da 3ADS EDU"
git push origin main
```

Inclua também os arquivos de configuração quando forem modificados. Nunca adicione arquivos `.env`, chaves ou tokens ao repositório.

## Organização

```text
src/
  App.tsx                    seções, programas, formatos e FAQ
  content.ts                 links, programas, formatos, mentores e perguntas
  styles.css                 identidade visual, responsividade e animações
  main.tsx                   entrada React
  components/
    ActionLink.tsx           botão-link compartilhado
    ClientLogos.tsx          carrossel contínuo das oito marcas
    Hero.tsx                 vídeo e abertura
    Logo.tsx                 logo oficial EDU, nas versões branca e azul
    Navbar.tsx               navegação fixa e menu mobile
    ProgramHighlight.tsx     destaque dos sete programas
    Reveal.tsx               aparição progressiva durante a rolagem
public/
  favicon.png                ícone oficial
  brand/                     logotipo e logos de clientes
  images/                    retratos e fotos reais dos encontros
  media/                     vídeo edu-hero-2 e imagem de capa
scripts/
  create-preview.mjs         prepara o HTML para duplo clique
  verify-build.mjs           verifica o HTML compilado e as mídias
.github/workflows/
  deploy-pages.yml           verifica e publica no GitHub Pages
```

## Conteúdo e navegação

A página contém abertura, marcas, desafios, sete programas, quatro formatos, metodologia, experiências, mentores, FAQ e contato.

Os botões de contato abrem o WhatsApp oficial **+55 (62) 98200-5986**, com a mensagem fornecida no briefing. Não enviam a mensagem automaticamente. Os programas apontam para as respectivas páginas oficiais da 3ADS. Nenhum formulário foi incluído.

### Provas sociais pendentes

O briefing não contém números confirmados de empresas atendidas pela EDU, depoimentos completos nem resultados de cases. Por isso:

- O destaque da abertura informa **7 programas**, contando os programas fornecidos, em vez de inventar uma quantidade de clientes.
- Os logos estão identificados como clientes da **3ADS em diferentes frentes**, não como clientes exclusivos da EDU.
- Experiências apresenta uma galeria real, sem atribuir resultados ou depoimentos a participantes.
- Cases com métricas, clientes específicos da EDU e depoimentos podem ser adicionados quando confirmados.

## Mídia e fontes

Todos os logos e fotografias estão salvos localmente, sem dependência de hotlink. Origem dos materiais:

- Logo EDU: três PNGs oficiais fornecidos pelo usuário, preservados em `public/brand/3ads-edu-{blue,gray,white}.png`. A versão branca é usada sobre o vídeo e no rodapé; a azul, no menu de fundo claro. As imagens não recebem filtros de cor, deformações nem identificação EDU adicionada por texto.
- [Site oficial 3ADS](https://3ads.com.br/): ícone e logos de clientes.
- [3ADS Educação](https://3ads.com.br/educacao/): formatos, fotos de treinamento/workshop e destinos dos programas.
- [Sobre a 3ADS](https://3ads.com.br/sobre-nos/): retratos dos mentores.
- [Growth e Sales](https://3ads.com.br/produtos-edu/growth-e-sales/): foto de turma.
- [Nevio](https://nevio-website-template.webflow.io/): referência de diagramação e movimento; sem reutilização de scripts ou imagens do template.
- Foto da equipe: arquivo original fornecido pelo usuário, convertido para WebP em 1600 × 1200 para uso no site. O JPG original permanece preservado fora do projeto.

`edu-hero-2.mp4` é o vídeo escolhido pelo usuário: aproximadamente 6 segundos, 1920 × 1080, 24 fps, 1,68 MB, H.264, sem áudio e faststart. Os originais do Desktop não foram modificados. O vídeo reproduz automaticamente em loop, sem controles visíveis, e tem imagem de capa. Não inicia automaticamente quando o sistema solicita movimento reduzido.

Geist é carregada pelo Google Fonts, com fallback local para a fonte do sistema. As animações usam CSS e IntersectionObserver, sem bibliotecas adicionais. A arte de IA é composta em CSS, sem imagens geradas.

A faixa de marcas usa duas sequências idênticas em um loop linear, independente da rolagem, sem pausa no hover e sem controles visíveis. A cópia visual é oculta dos leitores de tela. Com movimento reduzido no sistema, todas as marcas aparecem em uma grade estática.

## Acessibilidade

Um único H1, navegação por âncoras, link para pular ao conteúdo, textos alternativos, FAQ e formatos com estado acessível, menu mobile com Escape/contenção de foco/bloqueio de rolagem e suporte a `prefers-reduced-motion`. Texto claro permanece sobre o vídeo no desktop e no celular.

O build inclui o marcador `data-standalone` independentemente do idioma do HTML, evitando ciclos de redirecionamento ao abrir o arquivo local.
