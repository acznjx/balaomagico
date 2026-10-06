// src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Nunito } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Intro, { INTRO_SCRIPT } from "@/components/layout/Intro";
import Navbar from "@/components/layout/Navbar";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { SITE } from "@/config/site";
import "./globals.css";

/**
 * Nunito é a tipografia do manual da marca. O next/font baixa a fonte no build
 * e serve pelo próprio site: nenhuma requisição ao Google é feita pelo
 * visitante (melhor para privacidade e permite um CSP restrito).
 */
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Base para transformar caminhos relativos (imagens, links) em URLs completas
  // nas metatags de compartilhamento.
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "aluguel de brinquedos",
    "festas infantis",
    "brinquedos para festas",
    "cama elástica",
    "piscina de bolinhas",
    "brinquedos infláveis",
    "Sapiranga",
    SITE.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: "/",
    images: [{ url: SITE.logo, width: 1254, height: 1254, alt: `${SITE.name} - ${SITE.tagline}` }],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#124a8a",
};

/**
 * Layout raiz: menu e rodapé aparecem em todas as páginas, então ficam aqui
 * em vez de serem importados em cada page.tsx.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: o script da abertura pode adicionar a classe
    // "intro" no <html> antes do React carregar.
    <html lang="pt-BR" className={nunito.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        {/* Decide se a abertura roda, antes da página aparecer. */}
        <Script id="intro" strategy="beforeInteractive">
          {INTRO_SCRIPT}
        </Script>
        <LocalBusinessJsonLd />

        {/* Atalho para quem navega pelo teclado ou leitor de tela */}
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-full bg-brand-yellow px-5 py-3 font-extrabold text-brand-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>

        <Intro />
        <Navbar />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealOnScroll />
      </body>
    </html>
  );
}
