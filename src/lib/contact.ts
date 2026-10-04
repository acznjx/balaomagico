// src/lib/contact.ts

/**
 * Dados de contato da empresa em um lugar só.
 * Qualquer componente que precise do número ou de um link do WhatsApp
 * importa daqui, para que uma mudança de telefone não precise ser caçada
 * por vários arquivos.
 */

export const CONTACT = {
  whatsappNumber: "5551992379704",
  formattedPhone: "(51) 99237-9704",
  instagramUser: "@balaomagico_cia",
  instagramUrl: "https://instagram.com/balaomagico_cia",
  // TODO: trocar pela URL real da página no Facebook.
  facebookUrl: "https://facebook.com",
  openingHours: "Seg. a Sáb.: 08:00 às 20:00",
} as const;

/**
 * Monta o link do WhatsApp já com a mensagem codificada.
 * A mensagem pode ser escrita em português normal, com acento e espaço.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Mensagem padrão de consulta sobre um item específico do catálogo. */
export function whatsappItemLink(itemName: string): string {
  return whatsappLink(`Olá! Gostaria de mais informações sobre: ${itemName}.`);
}