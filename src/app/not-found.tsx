// src/app/not-found.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

/** Página 404, mostrada para qualquer endereço que não existe no site. */
export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:py-32">
      <Image src="/images/marca/balao.png" alt="" width={488} height={499} sizes="112px" className="w-28 motion-safe:animate-float" />
      <h1 className="mt-8 text-[clamp(2rem,1.5rem+2vw,3rem)] font-black leading-tight text-brand-blue">
        Esta página voou para longe
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        O endereço que você acessou não existe ou mudou de lugar.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex h-14 items-center justify-center rounded-full bg-brand-blue px-7 font-extrabold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Voltar ao início
        </Link>
        <Link
          href="/catalogo"
          className="group flex h-14 items-center justify-center gap-2 rounded-full bg-brand-coral px-7 font-extrabold text-white transition-colors hover:bg-brand-coral-dark"
        >
          Ver combos e preços
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
