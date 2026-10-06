// src/lib/whatsapp.ts

import { CONTACT } from "@/config/site";

/** Mensagens prontas usadas em mais de um lugar do site. */
export const WHATSAPP_MESSAGES = {
  geral: "Olá! Gostaria de consultar a locação de brinquedos.",
  duvidas: "Olá! Gostaria de tirar dúvidas sobre a locação.",
  frete: "Olá! Gostaria de consultar o valor do frete para o meu endereço.",
} as const;

/**
 * Monta o link do WhatsApp já com a mensagem codificada.
 * A mensagem pode ser escrita em português normal, com acento e espaço;
 * o encodeURIComponent garante que nenhum caractere quebre ou altere o link.
 */
export function whatsappLink(message: string = WHATSAPP_MESSAGES.geral): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
