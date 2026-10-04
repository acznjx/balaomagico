// src/app/catalogo/page.tsx

import Image from "next/image";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { whatsappLink } from "@/lib/contact";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface Combo {
  readonly nome: string;
  readonly emoji: string;
  readonly titulo: string;
  readonly descricao: string;
  readonly preco: number;
  readonly imagem: string;
  /** Selo no canto da imagem, ex.: "Mais completo". */
  readonly selo?: string;
  /** Destaca o cartão com borda amarela e selo em coral. */
  readonly destaque?: boolean;
}

interface Individual {
  readonly nome: string;
  readonly preco: number;
  readonly imagem: string;
  /** Etiqueta acima do nome. O padrão é "Avulso". */
  readonly etiqueta?: "Avulso" | "Com monitor";
}

/* -------------------------------------------------------------------------- */
/* Configuração                                                               */
/* -------------------------------------------------------------------------- */

const PAGE = {
  badge: "TABELA OFICIAL DE PREÇOS",
  description:
    "Escolha entre nossos combos promocionais ou monte sua festa com os brinquedos individuais. Qualidade e diversão garantidas para as crianças.",
} as const;

const COMBOS: readonly Combo[] = [
  {
    nome: "ARCO ÍRIS",
    emoji: "🌈",
    titulo: "Cama elástica + Super tobogã + Monitor",
    descricao: "Muita aventura com estrutura completa e segurança profissional.",
    preco: 430,
    imagem:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    selo: "Mais completo",
  },
  {
    nome: "DIVERSÃO",
    emoji: "🎉",
    titulo: "Cama elástica + Piscina de bolinha",
    descricao: "Perfeito para festas em espaço reduzido com muita alegria.",
    preco: 200,
    imagem:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    selo: "Mais econômico",
  },
  {
    nome: "CASTELO",
    emoji: "🏰",
    titulo: "Tobogã castelinho piscina de bolinha + Cama elástica",
    descricao: "A combinação ideal para garantir a diversão da criançada.",
    preco: 380,
    imagem:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
  },
  {
    nome: "BALÃO MÁGICO",
    emoji: "🎈",
    titulo: "Super tobogã + Piscina de bolinha + Cama elástica",
    descricao: "O pacote completo de alegria para festas inesquecíveis.",
    preco: 455,
    imagem:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    selo: "🔥 Mais vendido",
    destaque: true,
  },
] as const;

const INDIVIDUAIS: readonly Individual[] = [
  {
    nome: "Escorregador + Gangorra e Cavalinho",
    preco: 60,
    imagem:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
  },
  {
    nome: "Cama Elástica P",
    preco: 85,
    imagem:
      "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=600&q=80",
  },
  {
    nome: "Cama Elástica M",
    preco: 120,
    imagem:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80",
  },
  {
    nome: "Piscina de Bolinhas",
    preco: 80,
    imagem:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
  },
  {
    nome: "Super Tobogã 4,4m + Monitor",
    preco: 380,
    imagem:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80",
    etiqueta: "Com monitor",
  },
  {
    nome: "Tobogã + Piscina de Bolinhas + Monitor",
    preco: 330,
    imagem:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    etiqueta: "Com monitor",
  },
] as const;

/** Formata o valor no padrão brasileiro, sem centavos. */
function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });
}

/**
 * Paleta da marca, para referência:
 *   azul #124A8A (hover #0d3566) | coral #F56A4A | amarelo #FFB719
 *   creme #FFF8E9 | verde WhatsApp #25D366 (hover #20ba5a)
 */

/* -------------------------------------------------------------------------- */
/* Subcomponentes                                                             */
/* -------------------------------------------------------------------------- */

function PageHeader() {
  return (
    <section className="relative overflow-hidden bg-[#124A8A] py-16 text-white lg:py-20">
      <div className="pointer-events-none absolute right-0 top-0 h-[350px] w-[350px] rounded-full bg-[#FFB719]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#F56A4A]/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] space-y-4 px-4 text-center sm:px-6">
        <div className="inline-flex animate-pulse items-center gap-2 rounded-full bg-[#FFB719] px-4 py-1 text-xs font-black tracking-wider text-[#124A8A] shadow-lg">
          <Sparkles className="h-4 w-4 text-[#F56A4A]" aria-hidden />
          <span>{PAGE.badge}</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
          Nosso{" "}
          <span className="text-[#FFB719] underline decoration-[#F56A4A] decoration-4 underline-offset-4">
            Catálogo
          </span>{" "}
          de Brinquedos
        </h1>

        <p className="mx-auto max-w-2xl text-sm font-medium text-[#FFF8E9]/90 sm:text-base lg:text-lg">
          {PAGE.description}
        </p>
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  eyebrowClassName: string;
  emoji: string;
  title: string;
  note: string;
}

function SectionHeader({ eyebrow, eyebrowClassName, emoji, title, note }: SectionHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-end">
      <div>
        <span className={`text-xs font-black uppercase tracking-widest ${eyebrowClassName}`}>
          {eyebrow}
        </span>
        <h2 className="mt-1 flex items-center gap-2.5 text-2xl font-black text-[#124A8A] sm:text-3xl">
          <span aria-hidden>{emoji}</span>
          <span>{title}</span>
        </h2>
      </div>

      <p className="text-xs font-bold text-slate-500">{note}</p>
    </div>
  );
}

function ComboCard({ combo }: { readonly combo: Combo }) {
  const { nome, emoji, titulo, descricao, preco, imagem, selo, destaque } = combo;

  const href = whatsappLink(
    `Olá! Quero reservar o Combo ${nome}: ${titulo} (${formatPrice(preco)})`,
  );

  return (
    <article
      className={`group flex flex-col justify-between overflow-hidden rounded-[24px] border-2 bg-white shadow-xl transition-all ${
        destaque ? "border-[#FFB719] hover:shadow-2xl" : "border-slate-100 hover:border-[#FFB719]"
      }`}
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={imagem}
          alt={`Combo ${nome}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {selo && (
          <div
            className={`absolute right-0 top-0 rounded-bl-2xl px-4 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-md ${
              destaque ? "bg-[#F56A4A] text-white" : "bg-[#FFB719] text-[#124A8A]"
            }`}
          >
            {selo}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-4 p-6 sm:p-8">
        <div>
          <div
            className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-[#124A8A] shadow-sm ${
              destaque ? "bg-[#FFB719]/20" : "bg-[#FFF8E9]"
            }`}
            aria-hidden
          >
            {emoji}
          </div>

          <h3 className="text-lg font-black text-[#124A8A] transition-colors group-hover:text-[#F56A4A] sm:text-xl">
            {nome}: {titulo}
          </h3>

          <p className="mt-1 text-xs font-bold text-slate-500">{descricao}</p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Valor do combo
            </span>
            <div className="text-2xl font-black text-[#F56A4A] sm:text-3xl">
              {formatPrice(preco)}
            </div>
          </div>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#124A8A] px-4 py-3 text-xs font-black tracking-wider !text-white shadow-md transition-all hover:bg-[#0d3566]"
          >
            <span>RESERVAR</span>
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </article>
  );
}

function IndividualCard({ item }: { readonly item: Individual }) {
  const { nome, preco, imagem, etiqueta = "Avulso" } = item;

  const href = whatsappLink(
    `Olá! Gostaria de alugar o item: ${nome} (${formatPrice(preco)})`,
  );

  const isMonitor = etiqueta === "Com monitor";

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-[20px] border border-slate-100 bg-white shadow-md transition-all hover:shadow-lg">
      <div className="relative h-36 w-full overflow-hidden bg-slate-100">
        <Image
          src={imagem}
          alt={nome}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
        <div className="space-y-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
              isMonitor ? "bg-[#FFB719]/10 text-amber-800" : "bg-[#F56A4A]/10 text-[#F56A4A]"
            }`}
          >
            {etiqueta}
          </span>

          <h3 className="pt-1 text-base font-black text-[#124A8A]">{nome}</h3>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400">Valor</span>
            <div className="text-xl font-black text-[#124A8A]">{formatPrice(preco)}</div>
          </div>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#FFF8E9] px-3.5 py-2 text-xs font-black text-[#124A8A] transition-all hover:bg-[#124A8A] hover:!text-white"
          >
            Solicitar
          </a>
        </div>
      </div>
    </article>
  );
}

function DeliveryNotice() {
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#124A8A] p-6 text-white shadow-xl sm:p-8 md:flex-row">
      <div className="flex items-center gap-4 text-center md:text-left">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFB719] text-2xl font-bold text-[#124A8A] shadow-md"
          aria-hidden
        >
          📍
        </div>

        <div>
          <h2 className="text-lg font-black text-white">
            Precisa de entrega em outra localidade?
          </h2>
          <p className="mt-0.5 text-xs font-medium text-[#FFF8E9]/90 sm:text-sm">
            Consultar valor do deslocamento para bairros distantes ou cidades vizinhas.
          </p>
        </div>
      </div>

      <a
        href={whatsappLink("Olá! Gostaria de consultar o valor do deslocamento para o meu endereço.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex shrink-0 items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-black tracking-wider !text-white shadow-lg transition-all hover:bg-[#20ba5a] hover:scale-105"
      >
        <MessageCircle className="h-5 w-5 fill-white text-[#25D366]" aria-hidden />
        <span>CONSULTAR TAXA DE FRETE</span>
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Página                                                                     */
/* -------------------------------------------------------------------------- */

export default function CatalogoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <PageHeader />

      <main className="mx-auto max-w-[1200px] space-y-16 px-4 py-12 sm:px-6 lg:py-16">
        <section id="combos" className="space-y-8">
          <SectionHeader
            eyebrow="Pacotes promocionais"
            eyebrowClassName="text-[#F56A4A]"
            emoji="🎈"
            title="Combos especiais para festa"
            note="* Consulte a disponibilidade de data para Sapiranga e região."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {COMBOS.map((combo) => (
              <ComboCard key={combo.nome} combo={combo} />
            ))}
          </div>
        </section>

        <section id="individuais" className="space-y-8 pt-6">
          <SectionHeader
            eyebrow="Locação avulsa"
            eyebrowClassName="text-[#124A8A]"
            emoji="🎪"
            title="Brinquedos individuais"
            note="Monte o seu próprio pacote combinando os itens que desejar."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDIVIDUAIS.map((item) => (
              <IndividualCard key={item.nome} item={item} />
            ))}
          </div>
        </section>

        <DeliveryNotice />
      </main>
    </div>
  );
}