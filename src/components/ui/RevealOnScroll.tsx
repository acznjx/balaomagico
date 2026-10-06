"use client";

// src/components/ui/RevealOnScroll.tsx

import { useEffect } from "react";

/**
 * Faz os elementos marcados com o atributo `data-reveal` aparecerem
 * (subindo levemente) quando entram na tela. Fica uma vez só no layout.
 *
 * Uso: <div data-reveal>...</div>
 * Atraso opcional para entrar em sequência: className="[--reveal-delay:120ms]"
 *
 * Detalhes:
 * - Marca o elemento com o atributo `data-visible` (e não com uma classe),
 *   porque o React reescreve o `className` quando o componente renderiza de
 *   novo e apagaria a marcação.
 * - Também observa elementos que aparecem depois (troca de página, conteúdo
 *   carregado depois, recarregamento do `npm run dev`).
 * - O estado escondido só vale com JavaScript ativo (classe "js" no <html>),
 *   então sem JS o conteúdo aparece normalmente. Veja globals.css.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const mostrar = (el: Element) => el.setAttribute("data-visible", "");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(mostrar);
      return;
    }

    const intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mostrar(entry.target);
            intersection.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const observarPendentes = () => {
      document.querySelectorAll("[data-reveal]:not([data-visible])").forEach((el) => intersection.observe(el));
    };
    observarPendentes();

    // Elementos novos ou re-renderizados entram na observação automaticamente.
    const mutation = new MutationObserver(observarPendentes);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
