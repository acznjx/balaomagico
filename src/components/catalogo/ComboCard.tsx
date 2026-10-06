// src/components/catalogo/ComboCard.tsx

import { Check, Clock } from "lucide-react";
import FotoPainel, { CORES_PAINEL } from "@/components/brinquedos/FotoPainel";
import WhatsappButton from "@/components/ui/WhatsappButton";
import { comboTitulo, type Combo } from "@/data/combos";
import { formatPrice } from "@/lib/format";

interface ComboCardProps {
  combo: Combo;
  /** Posição na lista: define a cor do painel e o atraso da animação. */
  index: number;
}

/** Card de combo: fotos dos brinquedos, o que vem no combo, preço e reserva. */
export default function ComboCard({ combo, index }: ComboCardProps) {
  const { nome, itens, descricao, preco, fotos, duracao, selo, destaque } = combo;

  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as React.CSSProperties}
      className={`group flex flex-col rounded-[1.75rem] border bg-white p-3 transition-[box-shadow,border-color] duration-300 hover:shadow-[0_24px_48px_-24px_rgba(10,46,92,0.35)] ${
        destaque ? "border-brand-yellow ring-2 ring-brand-yellow" : "border-brand-blue/10 hover:border-brand-blue/20"
      }`}
    >
      <FotoPainel
        fotos={fotos.map((src) => ({ src, alt: "" }))}
        cor={CORES_PAINEL[index % CORES_PAINEL.length]}
        nome={`Combo ${nome}`}
        selo={selo}
        seloDestaque={destaque}
        sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 90vw"
        className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/10]"
      />

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-5">
        <h3 className="text-xl font-black leading-tight text-brand-blue">Combo {nome}</h3>
        <p className="mt-1.5 text-sm leading-snug text-slate-600">{descricao}</p>

        <ul className="mt-4 grid gap-2 text-sm font-semibold text-brand-ink sm:grid-cols-2" aria-label={`O que vem no combo: ${comboTitulo(combo)}`}>
          {itens.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" strokeWidth={3} aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-3">
            <p className="leading-none">
              <span className="block text-xs font-bold text-slate-500">Valor do combo</span>
              <span className="mt-1.5 block text-3xl font-black text-brand-blue">{formatPrice(preco)}</span>
            </p>
            {duracao && (
              <p className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {duracao}
              </p>
            )}
          </div>

          <WhatsappButton
            message={`Olá! Quero reservar o Combo ${nome}: ${comboTitulo(combo)} (${formatPrice(preco)}).`}
            className="mt-4 h-12 w-full rounded-full text-sm font-extrabold"
          >
            Reservar este combo
          </WhatsappButton>
        </div>
      </div>
    </article>
  );
}
