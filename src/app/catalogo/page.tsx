// src/app/catalogo/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import BrinquedoCard from "@/components/brinquedos/BrinquedoCard";
import ComboCard from "@/components/catalogo/ComboCard";
import WhatsappButton from "@/components/ui/WhatsappButton";
import { BRINQUEDOS_COM_FOTO_PRIMEIRO } from "@/data/brinquedos";
import { COMBOS } from "@/data/combos";
import { CONTACT } from "@/config/site";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Combos e preços",
  description:
    "Tabela de preços da Balão Mágico: combos promocionais e brinquedos avulsos para festas infantis em Sapiranga - RS e região.",
  alternates: { canonical: "/catalogo" },
};

/* -------------------------------------------------------------------------- */
/* Subcomponentes                                                             */
/* -------------------------------------------------------------------------- */

/** Atalhos para as seções da página. */
const SECOES = [
  { label: "Combos", href: "#combos" },
  { label: "Brinquedos avulsos", href: "#individuais" },
  { label: "Frete", href: "#frete" },
] as const;

function Cabecalho() {
  return (
    <section className="relative overflow-hidden bg-brand-blue text-white">
      <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-14 sm:px-6 sm:pb-28 sm:pt-20 lg:pb-32">
        <h1 className="reveal max-w-3xl text-balance text-[clamp(2.4rem,1.5rem+4vw,4.25rem)] font-black leading-[1.02] tracking-tight">
          Combos e preços
        </h1>
        <p className="reveal mt-5 max-w-xl text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-relaxed text-white/80 [--reveal-delay:100ms]">
          Escolha um combo pronto ou monte a sua festa com os brinquedos avulsos. Valores para {CONTACT.serviceArea},
          com frete à parte conforme a distância.
        </p>

        <nav aria-label="Seções do catálogo" className="reveal mt-8 flex flex-wrap gap-2 [--reveal-delay:200ms]">
          {SECOES.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold transition-colors hover:border-white hover:bg-white hover:text-brand-blue"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Foto do castelinho à direita, só em telas grandes (no celular o texto ocupa a largura toda) */}
      <Image
        src="/images/brinquedos/castelinho.png"
        alt=""
        width={1000}
        height={667}
        sizes="460px"
        loading="eager"
        className="reveal pointer-events-none absolute bottom-6 right-[max(1.5rem,calc((100vw-1200px)/2))] z-10 hidden h-auto w-[38%] max-w-[460px] drop-shadow-[0_24px_24px_rgba(0,0,0,0.35)] [--reveal-delay:150ms] lg:block"
      />

      {/* Curva suave fechando o cabeçalho, igual ao hero da home */}
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

interface TituloSecaoProps {
  titulo: string;
  descricao: string;
}

function TituloSecao({ titulo, descricao }: TituloSecaoProps) {
  return (
    <header data-reveal className="max-w-2xl">
      <h2 className="text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-black leading-[1.08] tracking-tight text-brand-blue">
        {titulo}
      </h2>
      <p className="mt-3 text-[clamp(1rem,0.95rem+0.3vw,1.1rem)] leading-relaxed text-slate-600">{descricao}</p>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Página                                                                     */
/* -------------------------------------------------------------------------- */

export default function CatalogoPage() {
  return (
    <>
      <Cabecalho />

      <div className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:pb-24">
          {/* Combos */}
          <section id="combos" className="pb-16 pt-12 sm:pt-16 lg:pb-24">
            <TituloSecao
              titulo="Combos"
              descricao="Pacotes prontos com os brinquedos que mais combinam, por um valor melhor do que alugar separado."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {COMBOS.map((combo, index) => (
                <ComboCard key={combo.id} combo={combo} index={index} />
              ))}
            </div>
          </section>

          {/* Avulsos */}
          <section id="individuais" className="border-t border-brand-blue/10 py-16 lg:py-24">
            <TituloSecao
              titulo="Brinquedos avulsos"
              descricao="Alugue só o que precisa ou junte vários brinquedos para montar a sua festa."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {BRINQUEDOS_COM_FOTO_PRIMEIRO.map((brinquedo, index) => (
                <BrinquedoCard key={brinquedo.id} brinquedo={brinquedo} index={index} />
              ))}
            </div>
          </section>

          {/* Frete */}
          <section
            id="frete"
            data-reveal
            className="grid items-center gap-6 rounded-[1.75rem] bg-brand-sky-light px-6 py-8 sm:px-10 sm:py-10 md:grid-cols-[1fr_auto]"
          >
            <div>
              <h2 className="text-2xl font-black text-brand-blue sm:text-3xl">Frete</h2>
              <p className="mt-2 max-w-xl leading-relaxed text-slate-600">
                O valor do deslocamento depende do endereço da festa. Envie a sua localização pelo WhatsApp e
                informamos o frete junto com o orçamento.
              </p>
            </div>
            <WhatsappButton
              message={WHATSAPP_MESSAGES.frete}
              className="h-14 whitespace-nowrap rounded-full px-8 text-base font-extrabold"
            >
              Consultar frete
            </WhatsappButton>
          </section>
        </div>
      </div>
    </>
  );
}
