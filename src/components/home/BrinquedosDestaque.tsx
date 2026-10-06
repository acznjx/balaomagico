// src/components/home/BrinquedosDestaque.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrinquedoCard from "@/components/brinquedos/BrinquedoCard";
import { BRINQUEDOS_COM_FOTO_PRIMEIRO } from "@/data/brinquedos";

/**
 * Vitrine de brinquedos da home. O card de cada brinquedo é o mesmo usado no
 * catálogo (components/brinquedos/BrinquedoCard.tsx).
 */

/* -------------------------------------------------------------------------- */
/* Componente principal                                                       */
/* -------------------------------------------------------------------------- */

export default function BrinquedosDestaque() {
  return (
    <section id="brinquedos" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <header data-reveal className="flex flex-col gap-5 text-center sm:text-left md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-balance text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-black leading-[1.08] tracking-tight text-brand-blue">
              Conheça nossos brinquedos
            </h2>
            <p className="mt-3 text-[clamp(1rem,0.95rem+0.3vw,1.1rem)] leading-relaxed text-slate-600">
              Equipamentos higienizados e seguros para a sua festa. Alugue avulso ou monte um combo.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="group hidden shrink-0 items-center gap-2 text-base font-extrabold text-brand-blue md:flex"
          >
            <span className="underline decoration-brand-yellow decoration-[3px] underline-offset-[6px]">
              Ver combos e preços
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3">
          {BRINQUEDOS_COM_FOTO_PRIMEIRO.map((brinquedo, index) => (
            <BrinquedoCard key={brinquedo.id} brinquedo={brinquedo} index={index} />
          ))}
        </div>

        <div data-reveal className="mt-10 flex justify-center md:hidden">
          <Link
            href="/catalogo"
            className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-coral px-7 text-base font-extrabold text-white transition-colors hover:bg-brand-coral-dark sm:w-auto"
          >
            Ver combos e preços
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
