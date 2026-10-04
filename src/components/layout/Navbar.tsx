"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly hasDropdown?: boolean;
  readonly disabled?: boolean;
  readonly disabledReason?: string;
}

/* -------------------------------------------------------------------------- */
/* Configuração                                                               */
/* -------------------------------------------------------------------------- */

const PRIMARY_NAV: readonly NavItem[] = [
  { label: "INÍCIO", href: "/" },
  { label: "CATÁLOGO", href: "/catalogo" },
  { label: "BRINQUEDOS", href: "/#brinquedos", hasDropdown: true },
  {
    label: "AGENDA",
    href: "#",
    disabled: true,
    disabledReason: "Página em construção",
  },
] as const;

const SECONDARY_NAV: readonly NavItem[] = [
  { label: "Quem somos", href: "/#sobre" },
  { label: "Dúvidas frequentes", href: "/#faq" },
] as const;

const CONTACT = {
  whatsappLabel: "(51) 99237-9704",
  whatsappUrl: "https://wa.me/5551992379704",
  instagramLabel: "@balaomagico_cia",
  instagramUrl: "https://instagram.com/balaomagico_cia",
} as const;

const CTA = {
  label: "FALE CONOSCO",
  href: "/#contato",
} as const;

/**
 * Paleta da marca, para referência:
 *   navy #1E293B | azul #124A8A | azul claro #4FA3D1
 *   coral #F56A4A (hover #e05737) | amarelo #FFB719 | creme #FFF8E9
 *
 * As classes abaixo usam os valores literais de propósito: o Tailwind lê as
 * classes como texto no código-fonte e não consegue gerar nada montado com
 * template literal, como `text-[${cor}]`. Para usar nomes no lugar dos hex,
 * declare a paleta em theme.extend.colors do tailwind.config.
 */

/* -------------------------------------------------------------------------- */
/* Ícones                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * O lucide-react removeu os ícones de marca nas versões recentes,
 * então o glifo do Instagram fica aqui como SVG inline.
 */
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponentes                                                             */
/* -------------------------------------------------------------------------- */

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function ExternalLink({ href, children, className = "" }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 transition hover:text-[#FFB719] ${className}`}
    >
      {children}
    </a>
  );
}

function TopBar() {
  return (
    <div className="bg-[#1E293B] text-white">
      <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-between px-4 text-xs font-medium sm:px-6">
        <div className="flex items-center gap-6">
          <ExternalLink href={CONTACT.whatsappUrl}>
            <MessageCircle className="h-4 w-4 text-[#FFB719]" aria-hidden />
            <span>{CONTACT.whatsappLabel}</span>
          </ExternalLink>

          <ExternalLink href={CONTACT.instagramUrl} className="hidden sm:flex">
            <InstagramIcon className="h-4 w-4 text-[#FFB719]" />
            <span>{CONTACT.instagramLabel}</span>
          </ExternalLink>
        </div>

        <div className="flex items-center gap-6">
          {SECONDARY_NAV.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="hidden transition hover:text-[#FFB719] sm:block"
            >
              {label}
            </a>
          ))}

          <a
            href={CTA.href}
            className="rounded-full bg-[#F56A4A] px-4 py-1.5 text-[11px] font-bold tracking-wider text-white transition-all hover:bg-[#e05737] hover:shadow-md"
          >
            {CTA.label}
          </a>
        </div>
      </div>
    </div>
  );
}

interface LogoProps {
  onNavigate: () => void;
}

function Logo({ onNavigate }: LogoProps) {
  return (
    <a
      href="/"
      onClick={onNavigate}
      className="flex shrink-0 items-center py-1 transition-opacity hover:opacity-90"
    >
      <img
        src="/images/logos/logo.png"
        alt="Balão Mágico - Festas & Diversão"
        className="h-auto w-auto max-h-[64px] max-w-[220px] object-contain sm:max-h-[76px]"
      />
    </a>
  );
}

interface DesktopNavProps {
  activeHref: string;
}

function DesktopNav({ activeHref }: DesktopNavProps) {
  return (
    <nav className="hidden flex-1 items-center justify-center gap-8 px-8 lg:flex">
      {PRIMARY_NAV.map((item) => (
        <DesktopNavItem key={item.label} item={item} isActive={item.href === activeHref} />
      ))}
    </nav>
  );
}

interface DesktopNavItemProps {
  item: NavItem;
  isActive: boolean;
}

function DesktopNavItem({ item, isActive }: DesktopNavItemProps) {
  const { label, href, hasDropdown, disabled, disabledReason } = item;

  return (
    <div className="group/item relative">
      <a
        href={href}
        aria-disabled={disabled || undefined}
        aria-current={isActive ? "page" : undefined}
        title={disabled ? disabledReason : undefined}
        onClick={(event) => {
          if (disabled) event.preventDefault();
        }}
        className={[
          "group relative flex items-center gap-1.5 py-4 text-[13px] font-black tracking-wide transition-colors",
          "text-[#124A8A]",
          disabled ? "cursor-not-allowed opacity-60" : "hover:text-[#F56A4A]",
        ].join(" ")}
      >
        {label}

        {hasDropdown && (
          <ChevronDown
            className="h-4 w-4 text-[#4FA3D1] transition-transform duration-200 group-hover:rotate-180 group-hover:text-[#F56A4A]"
            aria-hidden
          />
        )}

        {isActive && (
          <span
            className="absolute bottom-2 left-0 h-[3px] w-full rounded-full bg-[#FFB719]"
            aria-hidden
          />
        )}
      </a>

      {disabled && disabledReason && (
        <span className="absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg group-hover/item:block">
          {disabledReason}
        </span>
      )}
    </div>
  );
}

interface MobileDrawerProps {
  onNavigate: () => void;
}

function MobileDrawer({ onNavigate }: MobileDrawerProps) {
  return (
    <div
      id="mobile-menu"
      className="animate-in fade-in slide-in-from-top-3 border-b border-[#FFF8E9] bg-white shadow-2xl duration-200 lg:hidden"
    >
      <nav className="mx-auto flex max-w-[1200px] flex-col space-y-3 px-6 py-8">
        {PRIMARY_NAV.map(({ label, href, hasDropdown, disabled, disabledReason }) => (
          <div key={label}>
            <a
              href={href}
              aria-disabled={disabled || undefined}
              onClick={(event) => {
                if (disabled) {
                  event.preventDefault();
                  return;
                }
                onNavigate();
              }}
              className={[
                "flex items-center justify-between border-b border-slate-100 py-3.5 text-base font-black transition-colors",
                disabled
                  ? "cursor-not-allowed text-slate-400 opacity-60"
                  : "text-[#124A8A] hover:text-[#F56A4A]",
              ].join(" ")}
            >
              <span>{label}</span>
              {hasDropdown && (
                <ChevronDown className="h-5 w-5 text-[#4FA3D1]" aria-hidden />
              )}
            </a>

            {disabled && disabledReason && (
              <span className="block pt-1 text-xs font-medium text-amber-600">
                ({disabledReason})
              </span>
            )}
          </div>
        ))}

        <div className="space-y-3 pt-6">
          {SECONDARY_NAV.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={onNavigate}
              className="block text-sm font-bold text-slate-600 hover:text-[#124A8A]"
            >
              {label}
            </a>
          ))}

          <div className="pt-2">
            <a
              href={CTA.href}
              onClick={onNavigate}
              className="flex items-center justify-center rounded-full bg-[#F56A4A] px-6 py-4 text-base font-black tracking-wider text-white shadow-lg transition-all hover:bg-[#e05737]"
            >
              {CTA.label}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Componente principal                                                       */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((open) => !open), []);

  // Fecha o menu ao trocar de rota
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Fecha o menu com a tecla Esc
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <TopBar />

      <div className="border-b border-[#FFF8E9] bg-white">
        <div className="mx-auto flex h-[96px] max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <Logo onNavigate={closeMobileMenu} />

          <DesktopNav activeHref={pathname} />

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF8E9] text-[#124A8A] shadow-sm transition-colors hover:bg-[#124A8A] hover:text-white lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-7 w-7" aria-hidden />
            ) : (
              <Menu className="h-7 w-7" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && <MobileDrawer onNavigate={closeMobileMenu} />}
    </header>
  );
}