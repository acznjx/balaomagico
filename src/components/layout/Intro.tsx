"use client";

// src/components/layout/Intro.tsx

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Abertura do site: o logo sobe no centro da tela, alguns confetes estouram
 * em volta e o logo "voa" até o lugar dele no menu.
 *
 * Quem decide se a abertura roda é o script INTRO_SCRIPT, que roda antes da
 * página aparecer (layout.tsx) e adiciona a classe "intro" no <html>:
 * - roda só uma vez por sessão do navegador;
 * - nunca roda para quem ativou "reduzir movimento" no sistema.
 * Sem a classe "intro", este componente fica escondido pelo CSS e não faz nada.
 * O script também adiciona a classe "js", usada pelo RevealOnScroll.
 */

const STORAGE_KEY = "bm-intro";

export const INTRO_SCRIPT = `(function(){var d=document.documentElement;d.classList.add("js");try{if(sessionStorage.getItem("${STORAGE_KEY}")!=="1"&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro")}}catch(e){}})();`;

/** Confetes: ângulo (graus), distância (% do tamanho do logo) e cor. */
const CONFETES = [
  { angulo: -150, distancia: 62, cor: "bg-brand-yellow", tamanho: "h-3 w-3" },
  { angulo: -110, distancia: 70, cor: "bg-brand-coral", tamanho: "h-2.5 w-2.5" },
  { angulo: -60, distancia: 66, cor: "bg-brand-sky", tamanho: "h-3.5 w-3.5" },
  { angulo: -20, distancia: 72, cor: "bg-brand-yellow", tamanho: "h-2 w-2" },
  { angulo: 25, distancia: 64, cor: "bg-brand-blue", tamanho: "h-3 w-3" },
  { angulo: 160, distancia: 68, cor: "bg-brand-sky", tamanho: "h-2.5 w-2.5" },
  { angulo: 200, distancia: 60, cor: "bg-brand-coral", tamanho: "h-3 w-3" },
] as const;

const EASE = "cubic-bezier(.22,1,.36,1)";
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Intro() {
  const fundoRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const confetesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro")) return;

    let terminou = false;
    const terminar = () => {
      if (terminou) return;
      terminou = true;
      html.classList.remove("intro");
      // Durante a abertura a página não rola; se o link tinha âncora
      // (ex.: /#brinquedos), vai até ela agora.
      if (window.location.hash) {
        document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView();
      }
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // navegação privada sem sessionStorage: a abertura só roda de novo
      }
    };

    // Segurança: se algo travar, a página aparece de qualquer jeito.
    const limite = setTimeout(terminar, 4500);
    // Clique ou tecla pula a abertura.
    window.addEventListener("pointerdown", terminar, { once: true });
    window.addEventListener("keydown", terminar, { once: true });

    async function animar() {
      const fundo = fundoRef.current;
      const logo = logoRef.current;
      const confetes = confetesRef.current;
      const destino = document.querySelector<HTMLElement>("[data-brand-logo]");
      if (!fundo || !logo || !confetes || !destino) return terminar();

      // 1. O logo sobe como um balão.
      await logo.animate(
        [
          { opacity: 0, transform: "translateY(60px) scale(.8)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 900, easing: EASE, fill: "both" },
      ).finished;

      // 2. Confetes estouram em volta.
      const tamanhoLogo = logo.getBoundingClientRect().width;
      Array.from(confetes.children).forEach((el, i) => {
        const { angulo, distancia } = CONFETES[i];
        const rad = (angulo * Math.PI) / 180;
        const d = (tamanhoLogo * distancia) / 100;
        (el as HTMLElement).animate(
          [
            { opacity: 0, transform: "translate(-50%,-50%) scale(.2)" },
            { opacity: 1, transform: `translate(calc(-50% + ${Math.cos(rad) * d * 0.7}px), calc(-50% + ${Math.sin(rad) * d * 0.7}px)) scale(1)`, offset: 0.5 },
            { opacity: 0, transform: `translate(calc(-50% + ${Math.cos(rad) * d}px), calc(-50% + ${Math.sin(rad) * d}px)) scale(.6)` },
          ],
          { duration: 900, delay: i * 40, easing: "ease-out", fill: "both" },
        );
      });

      await wait(650);
      if (terminou) return;

      // 3. O logo voa até o lugar dele no menu e o fundo some.
      const origem = logo.getBoundingClientRect();
      const alvo = destino.getBoundingClientRect();
      const dx = alvo.left + alvo.width / 2 - (origem.left + origem.width / 2);
      const dy = alvo.top + alvo.height / 2 - (origem.top + origem.height / 2);
      const escala = alvo.width / origem.width;

      fundo.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 650, delay: 200, easing: "ease", fill: "forwards" });
      await logo.animate([{ transform: "none" }, { transform: `translate(${dx}px, ${dy}px) scale(${escala})` }], {
        duration: 900,
        easing: EASE,
        fill: "forwards",
      }).finished;

      terminar();
    }

    animar();

    return () => {
      clearTimeout(limite);
      window.removeEventListener("pointerdown", terminar);
      window.removeEventListener("keydown", terminar);
    };
  }, []);

  return (
    <div className="intro-veil fixed inset-0 z-[100] items-center justify-center" aria-hidden>
      <div ref={fundoRef} className="absolute inset-0 bg-white" />

      <div ref={confetesRef} className="pointer-events-none absolute left-1/2 top-1/2">
        {CONFETES.map(({ cor, tamanho }, i) => (
          <span key={i} className={`absolute left-0 top-0 rounded-full opacity-0 ${cor} ${tamanho}`} />
        ))}
      </div>

      <div ref={logoRef} className="relative aspect-square w-[min(62vw,320px)] opacity-0">
        <Image src="/images/logos/logo.png" alt="" fill sizes="320px" loading="eager" fetchPriority="high" />
      </div>
    </div>
  );
}
