// src/components/home/ContatoRedes.tsx

import type { ReactNode } from "react";
import { Clock, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/BrandIcons";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface SocialNetwork {
  readonly label: string;
  readonly href: string;
  readonly Icon: (props: { className?: string }) => ReactNode;
}

interface ContactDetail {
  readonly text: string;
  readonly Icon: typeof Clock;
}

/* -------------------------------------------------------------------------- */
/* Configuração                                                               */
/* -------------------------------------------------------------------------- */

const WHATSAPP_NUMBER = "5551992379704";
const FORMATTED_PHONE = "(51) 99237-9704";

/** Monta o link do WhatsApp já com a mensagem codificada. */
function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const SECTION = {
  tag: "FALE CONOSCO",
  title: "Entre em contato e siga nossas redes",
  subtitle:
    "Estamos prontos para atender você, tirar dúvidas e garantir a diversão do seu evento.",
} as const;

const SOCIAL_NETWORKS: readonly SocialNetwork[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/balaomagico_cia",
    Icon: InstagramIcon,
  },
  {
    // TODO: trocar pela URL real da página no Facebook.
    label: "Facebook",
    href: "https://facebook.com",
    Icon: FacebookIcon,
  },
] as const;

const CONTACT_DETAILS: readonly ContactDetail[] = [
  { text: "Seg. a Sáb.: 08:00 às 20:00", Icon: Clock },
  { text: FORMATTED_PHONE, Icon: Phone },
] as const;

/**
 * Paleta da marca, para referência:
 *   azul #124A8A | coral #F56A4A | amarelo #FFB719 | creme #FFF8E9
 *   verde WhatsApp #25D366 (hover #20ba5a)
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
      <span className="inline-block rounded-full bg-[#FFB719] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#124A8A] shadow-md">
        {SECTION.tag}
      </span>

      <h2 className="text-3xl font-black text-white sm:text-4xl">{SECTION.title}</h2>

      <p className="text-sm font-medium text-[#FFF8E9]/90 sm:text-base">{SECTION.subtitle}</p>
    </div>
  );
}

interface ContactCardProps {
  icon: ReactNode;
  /** Cor de fundo do quadrado do ícone, ex.: "bg-[#25D366]". */
  iconBackground: string;
  title: string;
  description: string;
  /** Conteúdo extra logo abaixo da descrição, dentro do bloco de topo. */
  children?: ReactNode;
  /** Rodapé fixado na base do cartão, útil para o botão de ação. */
  footer?: ReactNode;
  className?: string;
}

function ContactCard({
  icon,
  iconBackground,
  title,
  description,
  children,
  footer,
  className = "",
}: ContactCardProps) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all hover:bg-white/15 sm:p-8 ${className}`}
    >
      <div className="space-y-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-lg ${iconBackground}`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-black text-white">{title}</h3>
          <p className="mt-1 text-xs text-[#FFF8E9]/80 sm:text-sm">{description}</p>
        </div>

        {children}
      </div>

      {footer && <div className="mt-6">{footer}</div>}
    </div>
  );
}

function WhatsappCard() {
  return (
    <ContactCard
      icon={<MessageCircle className="h-6 w-6 fill-white text-white" aria-hidden />}
      iconBackground="bg-[#25D366]"
      title="WhatsApp direto"
      description="Atendimento rápido para orçamentos e reservas de datas."
      footer={
        <a
          href={whatsappLink("Olá! Gostaria de tirar dúvidas sobre a locação.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-xs font-black tracking-wider !text-white shadow-lg transition-all hover:bg-[#20ba5a] hover:scale-[1.02]"
        >
          CHAMAR NO WHATSAPP
        </a>
      }
    />
  );
}

function SocialCard() {
  return (
    <ContactCard
      icon={<Share2 className="h-6 w-6 text-[#124A8A]" aria-hidden />}
      iconBackground="bg-[#FFB719]"
      title="Redes sociais"
      description="Acompanhe fotos de festas reais, novidades e feedbacks de clientes."
      footer={
        <div className="grid grid-cols-2 gap-3">
          {SOCIAL_NETWORKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-white/20 py-3 text-xs font-black !text-white shadow-sm transition-all hover:bg-white/30"
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      }
    />
  );
}

function LocationCard() {
  return (
    <ContactCard
      className="md:col-span-2 lg:col-span-1"
      icon={<MapPin className="h-6 w-6 text-white" aria-hidden />}
      iconBackground="bg-[#F56A4A]"
      title="Atendimento local"
      description="Atendemos Sapiranga - RS e cidades vizinhas com frete super facilitado."
      footer={
        <div className="border-t border-white/10 pt-3 text-center text-[11px] font-extrabold uppercase tracking-wider text-[#FFB719]">
          Monte seu orçamento sem compromisso
        </div>
      }
    >
      <ul className="space-y-2.5 border-t border-white/10 pt-3 text-xs font-medium text-[#FFF8E9]/90 sm:text-sm">
        {CONTACT_DETAILS.map(({ text, Icon }) => (
          <li key={text} className="flex items-center gap-2.5">
            <Icon className="h-4 w-4 shrink-0 text-[#FFB719]" aria-hidden />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </ContactCard>
  );
}

/* -------------------------------------------------------------------------- */
/* Componente principal                                                       */
/* -------------------------------------------------------------------------- */

export default function ContatoRedes() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-[#124A8A] py-16 text-white lg:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFB719]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1300px] space-y-12 px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WhatsappCard />
          <SocialCard />
          <LocationCard />
        </div>
      </div>
    </section>
  );
}