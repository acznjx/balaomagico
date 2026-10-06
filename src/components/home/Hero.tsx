// src/components/home/Hero.tsx

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WhatsappButton from "@/components/ui/WhatsappButton";

/**
 * Hero da home, no azul da marca: título, uma frase, duas ações e os
 * brinquedos sobre um painel amarelo.
 *
 * Os elementos com a classe "reveal" entram em sequência quando a página
 * carrega (ou logo depois da abertura do site). O atraso de cada um fica em
 * --reveal-delay. Veja globals.css.
 *
 * As fotos dos brinquedos (public/images/brinquedos) são recortes sem fundo das
 * fotos originais de public/images/kids. O balão (public/images/marca) é recortado do logo.
 */
export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-brand-blue">
      {/* brilhos suaves nas cores da marca */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-brand-sky/40 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-brand-yellow/15 blur-[120px]" aria-hidden />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 pb-24 pt-10 sm:gap-12 sm:px-6 sm:pb-28 sm:pt-14 md:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pb-32 lg:pt-20 xl:gap-20">
        {/* Texto */}
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <h1 className="reveal text-balance font-display text-[clamp(2.25rem,1.5rem+3.6vw,3.9rem)] font-black leading-[1.04] tracking-tight text-white">
            Aluguel de brinquedos para festas infantis
          </h1>

          <p className="reveal mx-auto mt-5 max-w-md text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-relaxed text-white/80 [--reveal-delay:120ms] sm:mt-6 lg:mx-0">
            Cama elástica, tobogã inflável e piscina de bolinhas para aniversários e eventos em Sapiranga e região.
          </p>

          <div className="reveal mt-8 flex flex-col gap-3 [--reveal-delay:240ms] sm:mt-10 sm:flex-row sm:justify-center lg:justify-start">
            <WhatsappButton className="h-14 whitespace-nowrap rounded-full px-7 text-base font-extrabold shadow-[0_10px_24px_-10px_rgba(37,211,102,0.8)]">
              Reservar pelo WhatsApp
            </WhatsappButton>

            <Link
              href="/catalogo"
              className="group flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-coral px-7 text-base font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(245,106,74,0.8)] transition-colors hover:bg-brand-coral-dark"
            >
              Ver combos e preços
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Imagem */}
        <div className="reveal relative mx-auto aspect-[4/3] w-full max-w-[540px] overflow-hidden rounded-[clamp(1.25rem,3vw,2rem)] bg-brand-yellow shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)] [--reveal-delay:180ms] lg:max-w-none">
          {/* círculo claro atrás dos brinquedos + alguns confetes */}
          <div className="absolute left-1/2 top-[12%] aspect-square w-[80%] -translate-x-1/2 rounded-full bg-white/40" aria-hidden />
          <span className="absolute left-[8%] top-[12%] h-[3%] w-[3%] min-h-2 min-w-2 rounded-full bg-brand-coral" aria-hidden />
          <span className="absolute left-[20%] top-[24%] h-[2%] w-[2%] min-h-1.5 min-w-1.5 rounded-full bg-white" aria-hidden />
          <span className="absolute right-[30%] top-[8%] h-[2.4%] w-[2.4%] min-h-2 min-w-2 rounded-full bg-brand-blue" aria-hidden />
          <span className="absolute left-[40%] top-[6%] h-[1.6%] w-[1.6%] min-h-1.5 min-w-1.5 rounded-full bg-brand-sky" aria-hidden />
          <div className="absolute inset-x-[10%] bottom-[8%] h-[6%] rounded-[50%] bg-brand-coral-dark/30 blur-lg" aria-hidden />

          <Image
            src="/images/marca/balao.png"
            alt=""
            width={488}
            height={499}
            sizes="(min-width: 1024px) 130px, 20vw"
            loading="eager"
            className="absolute right-[7%] top-[7%] w-[20%] max-w-[130px] motion-safe:animate-float"
          />

          <Image
            src="/images/brinquedos/super-toboga.png"
            alt="Super tobogã inflável"
            width={1000}
            height={948}
            sizes="(min-width: 1024px) 330px, 56vw"
            loading="eager"
            fetchPriority="high"
            className="absolute bottom-[9%] left-[4%] z-10 w-[58%]"
          />

          <Image
            src="/images/brinquedos/cama-elastica.png"
            alt="Cama elástica com rede de proteção"
            width={1000}
            height={886}
            sizes="(min-width: 1024px) 290px, 50vw"
            loading="eager"
            className="absolute bottom-[7%] right-[3%] z-10 w-[50%]"
          />
        </div>
      </div>

      {/* Curva suave fechando o hero (a próxima seção é branca) */}
      <svg
        className="absolute inset-x-0 -bottom-px h-[clamp(28px,5vw,64px)] w-full text-white"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0 64 V40 C 360 0 1080 0 1440 40 V64 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
