// src/components/layout/Footer.tsx

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import { NAV_ITEMS } from "@/config/navigation";
import { CONTACT, SITE } from "@/config/site";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";

/* -------------------------------------------------------------------------- */
/* Configuração                                                               */
/* -------------------------------------------------------------------------- */

/** Atalhos para as partes do catálogo. */
const LINKS_CATALOGO = [
  { label: "Combos promocionais", href: "/catalogo#combos" },
  { label: "Brinquedos avulsos", href: "/catalogo#individuais" },
  { label: "Consultar frete", href: whatsappLink(WHATSAPP_MESSAGES.frete) },
] as const;

/** Redes sociais. O Facebook só aparece quando a URL estiver preenchida. */
const REDES = [
  { label: "WhatsApp", href: whatsappLink(), Icon: MessageCircle },
  { label: "Instagram", href: CONTACT.instagramUrl, Icon: InstagramIcon },
  { label: "Facebook", href: CONTACT.facebookUrl, Icon: FacebookIcon },
].filter((rede) => rede.href);

/* -------------------------------------------------------------------------- */
/* Subcomponentes                                                             */
/* -------------------------------------------------------------------------- */

function FooterTitle({ children }: { children: string }) {
  return <h2 className="mb-5 text-xs font-black uppercase tracking-[0.14em] text-brand-yellow">{children}</h2>;
}

const linkClass =
  "text-white/70 underline decoration-transparent decoration-2 underline-offset-[5px] transition-colors hover:text-white hover:decoration-brand-yellow";

/** Link interno (Next) ou externo (nova aba), conforme o endereço. */
function FooterLink({ href, children }: { href: string; children: string }) {
  const externo = href.startsWith("http");
  return externo ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  ) : (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Componente principal                                                       */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-6 gap-y-12 px-4 pb-12 pt-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        {/* Marca */}
        <div className="col-span-2 lg:col-span-5 lg:pr-12">
          <Link href="/" aria-label={`${SITE.name}, página inicial`} className="inline-block">
            {/* Versão do logo com contorno branco, para ficar legível no fundo escuro */}
            <Image
              src="/images/logos/logo-contorno.png"
              alt={`${SITE.name} - ${SITE.tagline}`}
              width={682}
              height={700}
              sizes="120px"
              className="h-[120px] w-auto"
            />
          </Link>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/70">
            Aluguel de cama elástica, tobogã inflável e piscina de bolinhas para festas infantis em{" "}
            {CONTACT.serviceArea}.
          </p>

          <ul className="mt-6 flex gap-2">
            {REDES.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-navy"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navegação */}
        <nav aria-label="Rodapé" className="lg:col-span-2">
          <FooterTitle>Navegação</FooterTitle>
          <ul className="space-y-3 text-[15px]">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <FooterLink href={href}>{label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Catálogo */}
        <div className="lg:col-span-2">
          <FooterTitle>Catálogo</FooterTitle>
          <ul className="space-y-3 text-[15px]">
            {LINKS_CATALOGO.map(({ label, href }) => (
              <li key={label}>
                <FooterLink href={href}>{label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div className="col-span-2 lg:col-span-3">
          <FooterTitle>Contato</FooterTitle>
          <ul className="space-y-4 text-[15px]">
            <li>
              <span className="block text-xs text-white/50">WhatsApp</span>
              <FooterLink href={whatsappLink()}>{CONTACT.formattedPhone}</FooterLink>
            </li>
            <li>
              <span className="block text-xs text-white/50">Instagram</span>
              <FooterLink href={CONTACT.instagramUrl}>{CONTACT.instagramUser}</FooterLink>
            </li>
            <li>
              <span className="block text-xs text-white/50">Atendimento</span>
              <span className="text-white/70">{CONTACT.serviceArea}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Linha final */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col-reverse items-center justify-between gap-4 px-4 py-6 text-sm text-white/50 sm:flex-row sm:px-6">
          <p>
            © {year} {SITE.name} · {SITE.tagline}
          </p>
          <a href="#" className="group flex items-center gap-2 transition-colors hover:text-white">
            Voltar ao topo
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
