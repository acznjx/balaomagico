"use client";

import { ArrowRight, Check, Clock, Flame, MessageCircle, Sparkles } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface CallToAction {
  readonly label: string;
  readonly href: string;
}

interface HeroContent {
  readonly badge: string;
  readonly titleHighlight: string;
  readonly description: string;
  readonly primaryCta: CallToAction;
  readonly whatsappCta: CallToAction;
}

interface FeaturedCombo {
  readonly title: string;
  readonly price: string;
  readonly duration: string;
  readonly image: string;
  readonly items: readonly string[];
  readonly whatsappMessage: string;
}

/* -------------------------------------------------------------------------- */
/* Configuração                                                               */
/* -------------------------------------------------------------------------- */

const WHATSAPP_NUMBER = "5551992379704";

/** Monta o link do WhatsApp já com a mensagem codificada. */
function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const HERO: HeroContent = {
  badge: "ATENDIMENTO EM SAPIRANGA - RS E REGIÃO",
  titleHighlight: "inesquecível",
  description:
    "Transforme qualquer evento em um parque de diversões particular. Brinquedos incríveis, combos promocionais e muita segurança para a criançada.",
  primaryCta: {
    label: "VER PREÇOS E COMBOS",
    href: "#combos",
  },
  whatsappCta: {
    label: "CONSULTAR LOCAÇÃO",
    href: whatsappLink("Olá! Gostaria de consultar a locação de brinquedos."),
  },
} as const;

const FEATURED: FeaturedCombo = {
  title: "Combo Arco Íris",
  price: "R$ 430",
  duration: "4 horas de festa",
  image:
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
  items: ["Cama elástica", "Super tobogã", "Monitor incluso"],
  whatsappMessage: "Olá! Gostaria de garantir o Combo Arco Íris por R$ 430.",
} as const;

/**
 * Paleta da marca, para referência:
 *   azul escuro #0a2e5c | azul #124A8A | azul card #18559e / #0f3d73
 *   coral #F56A4A (hover #e05737) | amarelo #FFB719
 *   verde WhatsApp #25D366 (hover #20ba5a)
 *
 * As classes usam os valores literais de propósito: o Tailwind lê as classes
 * como texto no código-fonte e não gera nada montado com template literal.
 * Para usar nomes no lugar dos hex, declare a paleta em
 * theme.extend.colors do tailwind.config.
 */

/* -------------------------------------------------------------------------- */
/* Subcomponentes                                                             */
/* -------------------------------------------------------------------------- */

function BackgroundEffects() {
  return (
    <>
      <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-[#FFB719]/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-[#F56A4A]/20 blur-[120px]" />
    </>
  );
}

interface WhatsappButtonProps {
  href: string;
  label: string;
  className?: string;
}

/**
 * O !text-white existe porque o estilo global de <a> sobrescreve a cor herdada.
 * Se esse reset global for removido, o ! pode sair daqui.
 */
function WhatsappButton({ href, label, className = "" }: WhatsappButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] font-black tracking-wider !text-white shadow-xl shadow-[#25D366]/25 transition-all hover:bg-[#20ba5a] hover:scale-105 active:scale-95 ${className}`}
    >
      <MessageCircle className="h-5 w-5 shrink-0 fill-white text-[#25D366]" aria-hidden />
      <span>{label}</span>
    </a>
  );
}

function HeroContent() {
  return (
    <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
      <div className="inline-flex animate-pulse items-center gap-2 rounded-full bg-[#FFB719] px-4 py-1.5 text-xs font-black tracking-wider text-[#124A8A] shadow-lg">
        <Flame className="h-4 w-4 text-[#F56A4A]" aria-hidden />
        <span>{HERO.badge}</span>
      </div>

      <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl">
        Sua festa{" "}
        <span className="text-[#FFB719] underline decoration-[#F56A4A] decoration-4 underline-offset-4">
          {HERO.titleHighlight}
        </span>{" "}
        com diversão garantida!
      </h1>

      <p className="mx-auto max-w-xl text-base font-medium leading-relaxed text-slate-200 sm:text-lg lg:mx-0">
        {HERO.description}
      </p>

      <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
        <a
          href={HERO.primaryCta.href}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#F56A4A] px-8 py-4 text-sm font-black tracking-wider !text-white shadow-xl shadow-[#F56A4A]/25 transition-all hover:bg-[#e05737] hover:scale-105 active:scale-95 sm:w-auto"
        >
          <span>{HERO.primaryCta.label}</span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>

        <WhatsappButton
          href={HERO.whatsappCta.href}
          label={HERO.whatsappCta.label}
          className="w-full px-8 py-4 text-sm sm:w-auto"
        />
      </div>
    </div>
  );
}

function ComboImage() {
  return (
    <div className="relative h-44 w-full overflow-hidden">
      <img
        src={FEATURED.image}
        alt={FEATURED.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#15539e] via-transparent to-transparent" />

      <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#FFB719] px-4 py-1 text-[11px] font-black uppercase tracking-wider text-[#124A8A] shadow-md">
        <Sparkles className="h-3 w-3 fill-[#124A8A]" aria-hidden />
        <span>Mais popular</span>
      </div>

      <div className="absolute bottom-3 left-4 right-4 text-center">
        <h3 className="text-lg font-black uppercase tracking-tight text-white drop-shadow-md">
          {FEATURED.title}
        </h3>
      </div>
    </div>
  );
}

function ComboPrice() {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-center shadow-inner">
      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#FFB719]">
        Valor especial do combo
      </span>

      <div className="my-0.5 text-3xl font-black text-white drop-shadow">{FEATURED.price}</div>

      <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-0.5 text-[11px] font-bold text-amber-100">
        <Clock className="h-3 w-3 text-[#FFB719]" aria-hidden />
        <span>{FEATURED.duration}</span>
      </div>
    </div>
  );
}

function ComboItems() {
  return (
    <ul className="space-y-2 px-1">
      {FEATURED.items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-xs font-bold text-white">
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FFB719]">
            <Check className="h-2.5 w-2.5 text-[#124A8A]" strokeWidth={4} aria-hidden />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FeaturedComboCard() {
  return (
    <div className="flex justify-center lg:col-span-5">
      <div className="group relative w-full max-w-[360px] overflow-hidden rounded-2xl border-2 border-[#FFB719]/40 bg-gradient-to-b from-[#18559e] to-[#0f3d73] text-white shadow-2xl">
        <ComboImage />

        <div className="space-y-4 bg-white/5 p-5 backdrop-blur-sm">
          <ComboPrice />
          <ComboItems />

          <WhatsappButton
            href={whatsappLink(FEATURED.whatsappMessage)}
            label="QUERO ESSE COMBO"
            className="w-full py-3.5 text-xs"
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Componente principal                                                       */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-[#0a2e5c] py-12 text-white lg:py-16"
    >
      <BackgroundEffects />

      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <HeroContent />
          <FeaturedComboCard />
        </div>
      </div>
    </section>
  );
}