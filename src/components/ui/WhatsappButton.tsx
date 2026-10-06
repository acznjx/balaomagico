// src/components/ui/WhatsappButton.tsx

import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

interface WhatsappButtonProps {
  /** Mensagem que já vem escrita no WhatsApp. Sem ela, usa a mensagem geral. */
  message?: string;
  children: ReactNode;
  /** Classes extras: largura, padding, tamanho e peso do texto, sombra. */
  className?: string;
}

/** Botão verde que abre uma conversa no WhatsApp com a mensagem pronta. */
export default function WhatsappButton({ message, children, className = "" }: WhatsappButtonProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2.5 rounded-2xl bg-whatsapp text-white transition-colors hover:bg-whatsapp-dark ${className}`}
    >
      <MessageCircle className="h-5 w-5 shrink-0 fill-white text-whatsapp" aria-hidden />
      <span>{children}</span>
    </a>
  );
}
