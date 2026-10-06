// src/components/brinquedos/BrinquedoCard.tsx

import type { LucideIcon } from "lucide-react";
import { MessageCircle, Ruler, Users } from "lucide-react";
import FotoPainel, { CORES_PAINEL } from "@/components/brinquedos/FotoPainel";
import type { Brinquedo } from "@/data/brinquedos";
import { whatsappLink } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/format";

/**
 * Card de um brinquedo: foto, nome, medidas, capacidade, preço avulso e botão
 * para consultar no WhatsApp. Usado na vitrine da home e no catálogo.
 */

function InfoLinha({ Icon, texto }: { Icon: LucideIcon; texto: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" aria-hidden />
      <span>{texto}</span>
    </li>
  );
}

interface BrinquedoCardProps {
  brinquedo: Brinquedo;
  /** Posição na lista: define a cor do painel e o atraso da animação. */
  index: number;
}

export default function BrinquedoCard({ brinquedo, index }: BrinquedoCardProps) {
  const { nome, imagem, especificacoes, capacidade, preco, comMonitor } = brinquedo;

  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}
      className="group flex flex-col rounded-[1.75rem] border border-brand-blue/10 bg-white p-3 transition-[box-shadow,border-color] duration-300 hover:border-brand-blue/20 hover:shadow-[0_24px_48px_-24px_rgba(10,46,92,0.35)]"
    >
      <FotoPainel
        fotos={imagem ? [{ src: imagem, alt: nome }] : []}
        cor={CORES_PAINEL[index % CORES_PAINEL.length]}
        nome={nome}
        selo={comMonitor ? "Com monitor" : undefined}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
        className="aspect-[4/3]"
      />

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <h3 className="text-lg font-black leading-snug text-brand-blue">{nome}</h3>

        <ul className="mt-3 space-y-2 text-sm leading-snug text-slate-600">
          <InfoLinha Icon={Ruler} texto={especificacoes} />
          <InfoLinha Icon={Users} texto={capacidade} />
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <p className="leading-none">
            <span className="block text-xs font-bold text-slate-500">Locação avulsa</span>
            <span className="mt-1.5 block text-2xl font-black text-brand-blue">{formatPrice(preco)}</span>
          </p>

          <a
            href={whatsappLink(`Olá! Gostaria de saber a disponibilidade do brinquedo: ${nome}.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar disponibilidade: ${nome}`}
            className="flex h-11 items-center gap-2 rounded-full bg-brand-blue px-5 text-sm font-extrabold text-white transition-colors hover:bg-brand-blue-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}
