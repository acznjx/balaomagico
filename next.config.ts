import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy (CSP): lista do que a página pode carregar e de onde.
 * Se alguém conseguir injetar um <script> ou um <iframe> de outro domínio, o
 * navegador bloqueia.
 *
 * - Tudo vem do próprio site ('self'): scripts, estilos, fontes e imagens.
 *   As fotos e a fonte Nunito são servidas pelo próprio Next.
 * - 'unsafe-inline' em script-src é necessário porque o site é estático e o
 *   Next coloca pequenos scripts na página. A alternativa (nonce) obrigaria
 *   todas as páginas a serem geradas a cada visita. Veja:
 *   node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md
 * - 'unsafe-eval' só no `npm run dev` (o recarregamento automático precisa).
 * - frame-ancestors 'none': ninguém pode exibir o site dentro de um iframe
 *   (evita clickjacking).
 * - Links do WhatsApp/Instagram são navegação normal, não precisam de exceção.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Em produção (HTTPS), qualquer recurso http:// é trocado por https://.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Não deixa o navegador "adivinhar" o tipo de arquivo (evita executar um
  // arquivo de texto como script).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Proteção contra iframe para navegadores antigos (o CSP acima cobre os novos).
  { key: "X-Frame-Options", value: "DENY" },
  // Ao clicar num link externo, envia só o domínio, nunca o caminho completo.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desliga recursos do navegador que o site não usa.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  // Isola a janela do site de janelas abertas por outros domínios.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Em produção: força HTTPS por 2 anos, inclusive nos subdomínios.
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
];

const nextConfig: NextConfig = {
  // Não anuncia "X-Powered-By: Next.js" (não dar pistas da tecnologia usada).
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    // Todas as fotos ficam em /public; nenhum domínio externo é liberado.
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
