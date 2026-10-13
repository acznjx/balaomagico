# Balão Mágico | Festas & Diversão

Site da Balão Mágico, locação de brinquedos para festas infantis em Sapiranga - RS e região.

Feito com **Next.js 16** (App Router), **React 19**, **TypeScript** e **Tailwind CSS 4**.
Todas as páginas são geradas de forma estática no build.

## Como rodar

Requer Node.js 20.9 ou mais novo (veja `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # no Windows: copy .env.example .env.local
npm run dev                  # http://localhost:3000
```

| Comando              | O que faz                                              |
| -------------------- | ------------------------------------------------------ |
| `npm run dev`        | Servidor de desenvolvimento                            |
| `npm run build`      | Gera a versão de produção                              |
| `npm start`          | Roda a versão de produção (depois do build)            |
| `npm run lint`       | Verifica o código com ESLint                           |
| `npm run typecheck`  | Verifica os tipos do TypeScript                        |
| `npm run check`      | Lint + tipos (rode antes de cada commit)               |
| `npm run audit:prod` | Procura vulnerabilidades nas dependências de produção  |

## Variáveis de ambiente

| Variável               | Para que serve                                                        |
| ---------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Endereço público do site, usado no sitemap, robots.txt e compartilhamento |

Defina no `.env.local` (desenvolvimento) e no painel da hospedagem (produção).
O `.env.local` não vai para o Git.

## Estrutura

```
src/
├── app/                        # Rotas (App Router)
│   ├── layout.tsx              # Layout raiz: fonte, metadados, menu, rodapé
│   ├── page.tsx                # Home (/)
│   ├── catalogo/page.tsx       # Combos e preços (/catalogo)
│   ├── privacidade/page.tsx    # Política de privacidade e cookies (/privacidade)
│   ├── not-found.tsx           # Página 404
│   ├── sitemap.ts / robots.ts  # /sitemap.xml e /robots.txt
│   ├── icon.png, apple-icon.png, favicon.ico
│   └── globals.css             # Tema da marca (@theme) e estilos base
├── components/
│   ├── layout/                 # Navbar, Footer e a abertura animada (Intro)
│   ├── home/                   # Seções da home (Hero, vitrine, contato)
│   ├── catalogo/               # Componentes só do catálogo
│   ├── brinquedos/             # Card de brinquedo e painel de fotos (home + catálogo)
│   ├── seo/                    # Dados estruturados para o Google
│   └── ui/                     # Peças genéricas (botão do WhatsApp, animação ao rolar)
├── config/                     # Configuração do site
│   ├── site.ts                 # Nome, URL, telefone, redes, região
│   └── navigation.ts           # Itens do menu
├── data/                       # Conteúdo
│   ├── brinquedos.ts           # Brinquedos: nome, foto, medidas, preço
│   └── combos.ts               # Combos promocionais
└── lib/                        # Funções utilitárias, sem interface
    ├── whatsapp.ts             # Links do WhatsApp e mensagens prontas
    └── format.ts               # Formatação de preço (R$)
```

**Regras da organização**

- **Conteúdo fica em `data/` e configuração em `config/`.** Componentes não guardam
  preços, nomes ou telefones; só leem desses arquivos.
- **Server Components por padrão.** Só têm `"use client"` os componentes que
  precisam de interação no navegador (`Navbar`, `Intro`, `RevealOnScroll`).
- **Imports absolutos** com `@/` (ex.: `@/config/site`).
- Componentes usados em mais de uma página ficam em uma pasta por assunto
  (`brinquedos/`), não na pasta da página.

## Tarefas do dia a dia

| Quero...                             | Onde mexer                                               |
| ------------------------------------ | -------------------------------------------------------- |
| Mudar preço, medida ou nome          | `src/data/brinquedos.ts`                                 |
| Criar ou editar um combo             | `src/data/combos.ts`                                     |
| Mudar telefone, Instagram, região    | `src/config/site.ts`                                     |
| Ativar o Facebook                    | Preencha `facebookUrl` em `src/config/site.ts`           |
| Trocar a foto de um brinquedo        | PNG **sem fundo** em `public/images/brinquedos/`, depois ajuste `imagem` |
| Mudar uma cor da marca               | Bloco `@theme` em `src/app/globals.css`                  |
| Atualizar a política de privacidade | `src/app/privacidade/page.tsx` (mude também `ATUALIZADO_EM`) |
| Adicionar uma página ao menu         | `src/config/navigation.ts` e `src/app/sitemap.ts`        |

### Imagens

- `public/images/brinquedos/`: fotos recortadas, sem fundo (usadas no site)
- `public/images/kids/`: fotos originais, com fundo (arquivo)
- `public/images/logos/`: logo principal e a versão com contorno branco (rodapé)
- `public/images/marca/`: balão do logo, usado como ícone de apoio

Ao adicionar uma foto usada nos combos, inclua também o tamanho dela em
`DIMENSOES` (`src/components/brinquedos/FotoPainel.tsx`).

## Segurança

O site não tem login, formulário nem banco de dados: todo contato acontece pelo
WhatsApp. Mesmo assim, ele segue estas práticas:

- **Cabeçalhos de segurança** em todas as respostas (`next.config.ts`):
  - **Content-Security-Policy:** só carrega scripts, estilos, fontes e imagens do
    próprio domínio, bloqueia plugins (`object-src 'none'`) e impede que o site
    seja exibido dentro de iframes (`frame-ancestors 'none'`).
  - **Strict-Transport-Security:** força HTTPS em produção.
  - **X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
    Permissions-Policy e Cross-Origin-Opener-Policy.**
  - O cabeçalho `X-Powered-By` foi desligado.
- **Nada externo é carregado.** A fonte é baixada no build e servida pelo
  próprio site, e as imagens ficam em `/public`. Nenhum domínio externo é
  liberado em `images`.
- **Links externos** (WhatsApp, Instagram) abrem em nova aba com
  `rel="noopener noreferrer"`.
- **Mensagens do WhatsApp** são codificadas com `encodeURIComponent`.
- **JSON-LD** é gerado só a partir da configuração e tem o `<` escapado.
- **Sem segredos no código.** Só existe `NEXT_PUBLIC_SITE_URL`, que é pública.
  Se um dia houver uma chave de API, ela vai numa variável **sem**
  `NEXT_PUBLIC_` e nunca no Git.

**Sobre o `'unsafe-inline'` no CSP:** o Next.js coloca pequenos scripts na
página, então um CSP sem `'unsafe-inline'` exigiria nonces. Com nonces, todas as
páginas passariam a ser geradas a cada visita, em vez de estáticas. Para um site
sem dados de usuário, a recomendação da documentação do Next é esta configuração
(`node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`).

**Antes de publicar:**

1. Rode `npm run audit:prod` e atualize o que for apontado.
2. Defina `NEXT_PUBLIC_SITE_URL` com o domínio real (com `https://`).
3. Depois do deploy, teste os cabeçalhos em https://securityheaders.com.

## Pendências

- [ ] URL da página do Facebook em `src/config/site.ts`
- [ ] Domínio definitivo em `NEXT_PUBLIC_SITE_URL`
- [ ] Página de Agenda
