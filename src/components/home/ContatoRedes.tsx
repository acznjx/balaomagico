// src/components/home/ContatoRedes.tsx

import WhatsappButton from "@/components/ui/WhatsappButton";
import { CONTACT } from "@/config/site";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";

/**
 * Seção de contato da home.
 * Uma frase grande, uma ação principal (WhatsApp) e os canais em colunas,
 * separados por linhas finas. Sem cartões nem ícones decorativos.
 */

interface Canal {
  readonly rotulo: string;
  readonly valor: string;
  /** Sem link, o item aparece só como texto. */
  readonly href?: string;
}

/** Canais exibidos. O Facebook só entra quando a URL estiver preenchida. */
const CANAIS: readonly Canal[] = [
  { rotulo: "WhatsApp", valor: CONTACT.formattedPhone, href: whatsappLink() },
  { rotulo: "Instagram", valor: CONTACT.instagramUser, href: CONTACT.instagramUrl },
  ...(CONTACT.facebookUrl ? [{ rotulo: "Facebook", valor: "Balão Mágico", href: CONTACT.facebookUrl }] : []),
  { rotulo: "Atendimento", valor: CONTACT.serviceArea },
];

export default function ContatoRedes() {
  return (
    <section id="contato" className="relative bg-brand-blue text-white">
      {/* Curva suave abrindo a seção (a anterior é branca), espelhando o hero */}
      <svg
        className="absolute inset-x-0 -top-px h-[clamp(28px,5vw,64px)] w-full text-white"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0 0 V24 C 360 64 1080 64 1440 24 V0 Z" fill="currentColor" />
      </svg>

      <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-[clamp(5.5rem,4rem+6vw,9rem)] sm:px-6 lg:pb-24">
        <div data-reveal className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <h2 className="text-balance text-[clamp(2.25rem,1.3rem+4vw,4.5rem)] font-black leading-[1] tracking-tight">
            Vamos montar a sua festa?
          </h2>

          <div className="lg:pb-2">
            <p className="max-w-md text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-relaxed text-white/75">
              Consulte datas, tire dúvidas e receba o seu orçamento pelo WhatsApp.
            </p>
            <WhatsappButton
              message={WHATSAPP_MESSAGES.duvidas}
              className="mt-6 h-14 w-full whitespace-nowrap rounded-full px-8 text-base font-extrabold sm:inline-flex sm:w-auto"
            >
              Chamar no WhatsApp
            </WhatsappButton>
          </div>
        </div>

        <dl
          data-reveal
          className="mt-14 grid border-t border-white/20 [--reveal-delay:120ms] sm:grid-cols-2 lg:mt-20 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-fr"
        >
          {CANAIS.map(({ rotulo, valor, href }) => (
            <div key={rotulo} className="border-b border-white/20 py-6 sm:pr-8 lg:border-b-0">
              <dt className="text-sm font-semibold text-white/55">{rotulo}</dt>
              <dd className="mt-2 text-lg font-extrabold sm:text-xl">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-white/0 decoration-2 underline-offset-[6px] transition-colors hover:decoration-brand-yellow"
                  >
                    {valor}
                  </a>
                ) : (
                  valor
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
