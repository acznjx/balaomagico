"use client";

// src/components/layout/Navbar.tsx

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, MessageCircle, X } from "lucide-react";
import { InstagramIcon } from "@/components/icons/BrandIcons";
import { NAV_ITEMS } from "@/config/navigation";
import { CONTACT, SITE } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

/* -------------------------------------------------------------------------- */
/* Linha de informações (rola junto com a página)                             */
/* -------------------------------------------------------------------------- */

function TopBar() {
  return (
    <div className="bg-brand-navy text-white">
      <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-between gap-4 px-4 text-xs font-semibold sm:px-6">
        <p className="flex min-w-0 items-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-yellow" aria-hidden />
          <span className="truncate">
            <span className="hidden sm:inline">Atendemos </span>
            {CONTACT.serviceArea}
          </span>
        </p>

        <div className="flex shrink-0 items-center gap-5">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-brand-yellow"
          >
            <MessageCircle className="h-3.5 w-3.5 text-brand-yellow" aria-hidden />
            {CONTACT.formattedPhone}
          </a>
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 transition-colors hover:text-brand-yellow sm:flex"
          >
            <InstagramIcon className="h-3.5 w-3.5 text-brand-yellow" />
            {CONTACT.instagramUser}
          </a>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Menu mobile                                                                */
/* -------------------------------------------------------------------------- */

interface MobileMenuProps {
  pathname: string;
  top: number;
  onClose: () => void;
}

function MobileMenu({ pathname, top, onClose }: MobileMenuProps) {
  return (
    <div
      id="menu-mobile"
      style={{ top }}
      className="fixed inset-x-0 bottom-0 z-40 flex animate-slide-down flex-col overflow-y-auto border-t border-brand-blue/10 bg-white lg:hidden"
    >
      <nav aria-label="Menu" className="px-4 pt-2 sm:px-6">
        <ul>
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = href === pathname;
            return (
              <li key={href} className="border-b border-slate-100">
                <Link
                  href={href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-14 items-center justify-between text-xl font-extrabold ${
                    isActive ? "text-brand-coral" : "text-brand-blue"
                  }`}
                >
                  {label}
                  {isActive && <span className="h-2 w-2 rounded-full bg-brand-yellow" aria-hidden />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto space-y-4 bg-brand-blue px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 text-white sm:px-6">
        <a
          href={CONTACT.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <InstagramIcon className="h-4 w-4 text-brand-yellow" />
          {CONTACT.instagramUser}
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-center gap-2.5 rounded-2xl bg-whatsapp text-base font-extrabold text-white transition-colors hover:bg-whatsapp-dark"
        >
          <MessageCircle className="h-5 w-5 fill-white text-whatsapp" aria-hidden />
          Fazer orçamento no WhatsApp
        </a>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Componente principal                                                       */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menuTop, setMenuTop] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMenuOpen = menuTop !== null;

  // Fecha o menu ao trocar de página (padrão do React para "resetar estado
  // quando algo muda", sem useEffect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuTop(null);
  }

  // Depois de rolar, o menu fica mais baixo e ganha sombra.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Com o menu mobile aberto: trava a rolagem da página e fecha com Esc.
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuTop(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    // O menu abre logo abaixo do header, onde quer que ele esteja na tela.
    setMenuTop((top) => (top === null ? (headerRef.current?.getBoundingClientRect().bottom ?? 0) : null));
  };
  const closeMenu = () => setMenuTop(null);

  return (
    <>
      <TopBar />

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
          isScrolled || isMenuOpen ? "shadow-[0_8px_24px_-14px_rgba(10,46,92,0.45)]" : ""
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-4 transition-[height] duration-300 sm:px-6 ${
            isScrolled ? "h-[68px] lg:h-[76px]" : "h-[76px] lg:h-[100px]"
          }`}
        >
          {/* Logo principal */}
          <Link href="/" aria-label={`${SITE.name}, página inicial`} className="flex h-full shrink-0 items-center py-1.5">
            <Image
              data-brand-logo
              src={SITE.logo}
              alt={`${SITE.name} - ${SITE.tagline}`}
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 88px, 64px"
              loading="eager"
              fetchPriority="high"
              className="h-full w-auto"
            />
          </Link>

          <nav aria-label="Principal" className="hidden h-full lg:block">
            <ul className="flex h-full items-center gap-1">
              {NAV_ITEMS.map(({ label, href }) => {
                const isActive = href === pathname;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`group relative flex items-center px-4 py-2 text-[15px] font-extrabold transition-colors ${
                        isActive ? "text-brand-blue" : "text-brand-blue/65 hover:text-brand-blue"
                      }`}
                    >
                      {label}
                      <span
                        className={`absolute inset-x-4 -bottom-0.5 h-[3px] origin-left rounded-full bg-brand-yellow transition-transform duration-300 ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                        aria-hidden
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fazer orçamento no WhatsApp"
              className="flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-brand-coral text-sm font-extrabold text-white transition-colors hover:bg-brand-coral-dark sm:w-auto sm:px-5"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              <span className="hidden sm:inline">Fazer orçamento</span>
            </a>

            <button
              type="button"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              aria-controls="menu-mobile"
              onClick={toggleMenu}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue/5 text-brand-blue transition-colors hover:bg-brand-blue hover:text-white lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {menuTop !== null && <MobileMenu pathname={pathname} top={menuTop} onClose={closeMenu} />}
    </>
  );
}
