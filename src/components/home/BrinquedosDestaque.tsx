// src/components/home/BrinquedosDestaque.tsx

import type { LucideIcon } from "lucide-react";
import { ArrowRight, MessageCircle, Ruler, ShieldCheck, Sparkles, Users } from "lucide-react";

function whatsappItemLink(message: string): string {
  const number = (
    (import.meta.env as unknown as { VITE_WHATSAPP_NUMBER?: string }).VITE_WHATSAPP_NUMBER ?? ""
  ).replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface Brinquedo {
  readonly nome: string;
  readonly imagem: string;
  readonly especificacoes: string;
  readonly capacidade: string;
  /** Mensagem própria do WhatsApp. Sem isso, é gerada a partir do nome. */
  readonly mensagemWhatsApp?: string;
}

/* -------------------------------------------------------------------------- */
/* Configuração                                                               */
/* -------------------------------------------------------------------------- */

const SECTION = {
  badge: "VITRINE DE BRINQUEDOS",
  title: "Conheça nossas opções de brinquedos",
  description:
    "Equipamentos higienizados, seguros e ideais para transformar a sua festa em um momento inesquecível.",
} as const;

const BRINQUEDOS: readonly Brinquedo[] = [
  {
    nome: "Escorregador + Gangorra e Cavalinho",
    imagem: "/images/kids/Castelinho.png",
    especificacoes: "Kit lúdico voltado para o público infantil menor",
    capacidade: "Ideal para 2 a 4 crianças pequenas ao mesmo tempo",
  },
  {
    nome: "Cama Elástica P",
    imagem: "/images/kids/camaelastica.png",
    especificacoes: "Tamanho compacto ideal para espaços menores",
    capacidade: "Recomendado para 1 a 2 crianças por vez",
  },
  {
    nome: "Cama Elástica M",
    imagem: "/images/kids/camaelastica.png",
    especificacoes: "Diâmetro: 2,44 m | Rede de proteção lateral",
    capacidade: "Indicado para crianças de 3 a 12 anos | Até 80 kg",
  },
  {
    nome: "Piscina de Bolinhas",
    imagem: "/images/kids/Castelinho.png",
    especificacoes: "Acompanha centenas de bolinhas coloridas e limpas",
    capacidade: "Indicado para crianças de 1 a 6 anos",
  },
  {
    nome: "Super Tobogã 4,4m",
    imagem: "/images/kids/super.png",
    especificacoes: "Altura: 4,4 metros | Estrutura inflável de grande porte",
    capacidade: "Uso rotativo seguro com monitoria especializada",
  },
  {
    nome: "Tobogã com Piscina de Bolinhas",
    imagem: "/images/kids/super.png",
    especificacoes: "Medidas: 5,00 m C x 2,40 m L x 2,60 m A",
    capacidade: "Indicado para 3 a 15 anos | Até 5 crianças por vez",
  },
] as const;

/**
 * Paleta da marca, para referência:
 *   azul #124A8A (hover #0d3566) | coral #F56A4A | amarelo #FFB719
 *
 * As classes usam os valores literais de propósito: o Tailwind lê as classes
 * como texto no código-fonte e não gera nada montado com template literal.
 */

/* -------------------------------------------------------------------------- */
/* Subcomponentes                                                             */
/* -------------------------------------------------------------------------- */

function SectionHeader() {
  return (
    <div className="mx-auto max-w-2xl space-y-3 text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#124A8A]/10 px-4 py-1.5 text-xs font-black tracking-wider text-[#124A8A]">
        <Sparkles className="h-4 w-4 text-[#F56A4A]" aria-hidden />
        <span>{SECTION.badge}</span>
      </div>

      <h2 className="text-3xl font-black text-[#124A8A] sm:text-4xl">{SECTION.title}</h2>

      <p className="text-sm font-medium text-slate-600 sm:text-base">{SECTION.description}</p>
    </div>
  );
}

interface SpecRowProps {
  Icon: LucideIcon;
  text: string;
  /** Linha divisória acima, usada a partir do segundo item. */
  withDivider?: boolean;
}

function SpecRow({ Icon, text, withDivider = false }: SpecRowProps) {
  return (
    <div
      className={`flex items-start gap-3 text-xs font-semibold text-slate-700 ${
        withDivider ? "border-t border-slate-200/60 pt-2" : ""
      }`}
    >
      <div className="mt-0.5 shrink-0 rounded-lg bg-[#124A8A]/10 p-1.5 text-[#124A8A]">
        <Icon className="h-3.5 w-3.5" aria-hidden />
      </div>
      <span className="leading-relaxed">{text}</span>
    </div>
  );
}

function BrinquedoCard({ brinquedo }: { readonly brinquedo: Brinquedo }) {
  const { nome, imagem, especificacoes, capacidade, mensagemWhatsApp } = brinquedo;

  const href = mensagemWhatsApp
    ? whatsappItemLink(mensagemWhatsApp)
    : whatsappItemLink(nome);

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-lg shadow-slate-200/40 transition-all duration-500 hover:border-[#FFB719]/60 hover:shadow-2xl">
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        <img
          src={imagem}
          alt={nome}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/60 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-white shadow-sm backdrop-blur-md">
          <ShieldCheck className="h-3.5 w-3.5 text-[#FFB719]" aria-hidden />
          <span>Disponível</span>
        </div>

        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-lg font-black leading-snug tracking-tight text-white drop-shadow-md">
            {nome}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-5 bg-white p-6">
        <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <SpecRow Icon={Ruler} text={especificacoes} />
          <SpecRow Icon={Users} text={capacidade} withDivider />
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#124A8A] py-3.5 text-xs font-black tracking-wider !text-white shadow-md shadow-[#124A8A]/15 transition-all hover:bg-[#0d3566] hover:scale-[1.02] active:scale-95"
        >
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
          <span>CONSULTAR DISPONIBILIDADE</span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Componente principal                                                       */
/* -------------------------------------------------------------------------- */

export default function BrinquedosDestaque() {
  return (
    <section id="brinquedos" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-[1300px] space-y-14 px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BRINQUEDOS.map((brinquedo) => (
            <BrinquedoCard key={brinquedo.nome} brinquedo={brinquedo} />
          ))}
        </div>
      </div>
    </section>
  );
}