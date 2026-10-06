// src/config/site.ts

/**
 * Configuração central do site: nome, endereço público e dados de contato.
 * É o único lugar para mudar telefone, Instagram, região etc.
 *
 * Nada aqui é segredo: tudo já aparece na página. Segredos (chaves de API,
 * tokens) nunca entram em arquivos do projeto; usariam variáveis de ambiente
 * sem o prefixo NEXT_PUBLIC_, que ficam só no servidor.
 */

/**
 * Endereço público do site, usado no sitemap, no robots.txt e nas metatags de
 * compartilhamento. Defina NEXT_PUBLIC_SITE_URL no .env.local (veja
 * .env.example) e na hospedagem quando o domínio estiver no ar.
 */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export const SITE = {
  name: "Balão Mágico",
  tagline: "Festas & Diversão",
  description:
    "Aluguel de brinquedos para festas infantis em Sapiranga - RS e região. Cama elástica, tobogã inflável, piscina de bolinhas e combos promocionais.",
  url: siteUrl,
  locale: "pt_BR",
  logo: "/images/logos/logo.png",
} as const;

export const CONTACT = {
  whatsappNumber: "5551992379704",
  formattedPhone: "(51) 99237-9704",
  /** Telefone no formato internacional (usado nos dados estruturados para o Google). */
  internationalPhone: "+55 51 99237-9704",
  instagramUser: "@balaomagico_cia",
  instagramUrl: "https://instagram.com/balaomagico_cia",
  /**
   * TODO: preencher com a URL real da página no Facebook.
   * Enquanto estiver vazio, o Facebook não aparece no site.
   */
  facebookUrl: "" as string,
  serviceArea: "Sapiranga - RS e região",
  city: "Sapiranga",
  state: "RS",
} as const;
