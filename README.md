# 3ADS EDU

Landing page em React + TypeScript + Tailwind CSS, com Vite e ícones Lucide. Copy adaptada para a 3ADS EDU, identidade oficial da marca e composição editorial inspirada na referência Nevio. O formulário é validado no navegador; não há backend ou webhook configurado.

- Repositório: [atende3ads-ux/3ads-edu](https://github.com/atende3ads-ux/3ads-edu)
- Site: [3adsedu.com.br](https://3adsedu.com.br/)

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

## Publicação no cPanel

O servidor cPanel não possui Node.js. Por isso, o build é gerado localmente e armazenado em `deploy.zip`; o arquivo `.cpanel.yml` extrai somente o conteúdo estático em `/home1/carlo589/3adsedu.com.br`.

- Execute `npm run check` antes de recriar o pacote.
- Gere `deploy.zip` a partir do conteúdo de `dist/`, sem adicionar a pasta `dist` como nível extra.
- O push não publica sozinho: o deploy deve ser acionado no **Git Version Control** do cPanel somente quando houver autorização específica.
- `.htaccess` segue no pacote e aplica cache, compressão, cabeçalhos de segurança e CSP em modo Report-Only.

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

Os botões de contato abrem o WhatsApp oficial **+55 (62) 98200-5986**, com a mensagem fornecida no briefing. Não enviam a mensagem automaticamente. Todos os sete programas abrem modais internos. O evento `cta_click` não contém PII e só entra no `dataLayer` quando as categorias opcionais necessárias estiverem autorizadas.

Cada programa abre um modal interno com escopo, carga horária, aprendizados, descrição, público e galeria. O formulário replica os campos essenciais e a validação do formulário institucional, mas não envia dados: nenhum endpoint HTTPS próprio foi confirmado para `3adsedu.com.br`. Após a validação, a interface informa essa limitação e oferece o WhatsApp como alternativa, sem incluir os dados preenchidos na URL.

Os modais também têm URLs compartilháveis no formato `https://3adsedu.com.br/{slug}`. O `.htaccess` entrega o aplicativo para esses sete caminhos, remove a barra final para manter os ativos relativos corretos e o React sincroniza modal, título, canonical, histórico e botão Voltar do navegador. Ao abrir um modal por um card, a URL muda sem recarregar a página; ao acessar o endereço diretamente, o modal correspondente já aparece aberto.

## Privacidade e medição

- Consentimento em modo básico, com estado inicial negado para `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization`.
- O visitante pode aceitar, rejeitar, personalizar e reabrir as preferências pelo rodapé. A decisão, a data, o modo e a versão `1.0` ficam em `localStorage` sob `3adsedu_privacy_preferences`.
- `GTM-K82W4KD` é a fonte única do rastreamento. O contêiner público já contém `G-KSCEVLS4H0`, Meta Pixel e Microsoft Clarity, portanto o GA4 não é carregado novamente pelo HTML.
- O contêiner GTM é carregado junto com a página como recurso necessário, depois que o Consent Mode define Analytics e Marketing como negados por padrão. A escolha do visitante atualiza esses sinais; ao revogar uma categoria, cookies próprios conhecidos são removidos sem descarregar o contêiner.
- As tags publicadas dentro do GTM devem ter verificações de consentimento compatíveis com `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization`, inclusive tags de terceiros sem suporte nativo ao Consent Mode.
- A ficha informa Clarity `yxrgmrz2ip`, mas o contêiner publicado usa `nbgrz39vnu`. A divergência precisa ser resolvida no GTM antes de afirmar qual propriedade recebe os dados.
- Política de Privacidade e Termos de Uso não foram publicados: os respectivos conteúdos jurídicos e a aprovação ainda não foram fornecidos.
- A CSP permanece em `Report-Only` para observação segura no ambiente publicado. Ela libera os hosts oficiais necessários ao GTM, Google Analytics e Google Ads, além dos fornecedores já usados pelo contêiner. YouTube não é liberado porque a página não incorpora um player. Webhook não é liberado porque não há URL de destino confirmada; quando houver, deve ser incluída nominalmente em `connect-src` e `form-action`, nunca por curinga amplo.

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
- Fotos dos formatos: quatro arquivos fornecidos pelo usuário, renomeados semanticamente e convertidos para WebP; o arquivo RAW do Carlos foi revelado localmente antes da compressão. Os originais permanecem preservados fora do projeto.
- Foto da seção de experiências: arquivo fornecido pelo usuário e convertido para WebP em 1200 × 1600. O JPG original permanece preservado fora do projeto.
- Retrato atualizado de Nathália Machado: arquivo fornecido pelo usuário, recortado e convertido para WebP em 576 × 576 para manter a proporção dos demais trainers. O PNG original permanece preservado fora do projeto.
- Thumbnails dos sete programas: arquivos fornecidos pelo usuário e convertidos para WebP em 1400 × 800 para uso responsivo nos cards.

`edu-hero-2.mp4` é o vídeo escolhido pelo usuário: aproximadamente 6 segundos, 1920 × 1080, 24 fps, 1,68 MB, H.264, sem áudio e faststart. Os originais do Desktop não foram modificados. A capa WebP é priorizada; o vídeo é carregado depois do evento `load`, reproduz em loop e não é baixado quando o sistema solicita movimento reduzido ou o navegador indica economia de dados.

Geist é servida localmente em WOFF2, com fallback para a fonte do sistema. As animações usam CSS e IntersectionObserver, sem bibliotecas adicionais.

A faixa de marcas usa duas sequências idênticas em um loop linear, independente da rolagem, sem pausa no hover e sem controles visíveis. A cópia visual é oculta dos leitores de tela. Com movimento reduzido no sistema, todas as marcas aparecem em uma grade estática.

## Acessibilidade

Um único H1, navegação por âncoras, link para pular ao conteúdo, textos alternativos, FAQ e formatos com estado acessível, menu mobile com Escape/contenção de foco/bloqueio de rolagem e suporte a `prefers-reduced-motion`. Texto claro permanece sobre o vídeo no desktop e no celular.

O build inclui o marcador `data-standalone` independentemente do idioma do HTML, evitando ciclos de redirecionamento ao abrir o arquivo local.
