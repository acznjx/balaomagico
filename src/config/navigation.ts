// src/config/navigation.ts

/**
 * Links do menu, usados pelo Navbar e pelo Footer.
 * Fica fora do Navbar porque ele é um Client Component ("use client"), e
 * constantes exportadas de um arquivo client não podem ser lidas por Server
 * Components como o Footer.
 *
 * Quando a página de Agenda existir, é só adicionar { label: "Agenda", href: "/agenda" }.
 */

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Brinquedos", href: "/#brinquedos" },
  { label: "Combos e preços", href: "/catalogo" },
  { label: "Contato", href: "/#contato" },
];
