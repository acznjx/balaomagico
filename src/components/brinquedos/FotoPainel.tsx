// src/components/brinquedos/FotoPainel.tsx

import Image from "next/image";

/**
 * Painel colorido com as fotos recortadas dos brinquedos, no mesmo estilo do
 * hero. Usado nos cards da vitrine (1 foto) e dos combos (até 2 fotos).
 */

export const CORES_PAINEL = ["bg-brand-yellow-soft", "bg-brand-sky-light", "bg-brand-coral-soft"] as const;

/** Tamanho real das fotos recortadas, para manter a proporção certa. */
const DIMENSOES: Record<string, { width: number; height: number }> = {
  "/images/brinquedos/super-toboga.png": { width: 1000, height: 948 },
  "/images/brinquedos/cama-elastica.png": { width: 1000, height: 886 },
  "/images/brinquedos/castelinho.png": { width: 1000, height: 667 },
  "/images/brinquedos/piscina-bolinhas.png": { width: 410, height: 426 },
  "/images/brinquedos/kit-baby.png": { width: 920, height: 632 },
  "/images/brinquedos/cama-elastica-p.png": { width: 301, height: 336 },
};
const dimensoes = (src: string) => DIMENSOES[src] ?? { width: 1000, height: 1000 };

export interface Foto {
  readonly src: string;
  readonly alt: string;
}

interface FotoPainelProps {
  fotos: readonly Foto[];
  /** Classe de fundo do painel, de preferência uma de CORES_PAINEL. */
  cor: string;
  /** Texto para leitores de tela quando não há foto. */
  nome: string;
  /** Selo no canto superior esquerdo, ex.: "Com monitor". */
  selo?: string;
  /** Selo em coral, para chamar mais atenção. */
  seloDestaque?: boolean;
  /** Larguras ocupadas pelo card na tela (para o Next gerar o tamanho certo). */
  sizes: string;
  className?: string;
}

export default function FotoPainel({ fotos, cor, nome, selo, seloDestaque, sizes, className = "" }: FotoPainelProps) {
  const [principal, segunda] = fotos;

  return (
    <div className={`relative overflow-hidden rounded-2xl ${cor} ${className}`}>
      {/* círculo claro atrás das fotos, como no hero */}
      <div className="absolute left-1/2 top-[10%] aspect-square w-[78%] -translate-x-1/2 rounded-full bg-white/55" aria-hidden />

      {principal ? (
        <>
          <div className="absolute inset-x-[12%] bottom-[9%] h-[7%] rounded-[50%] bg-brand-blue/15 blur-md" aria-hidden />

          {segunda ? (
            // Duas fotos: a primeira à esquerda e a segunda à frente, à direita.
            // O tamanho segue a altura do painel, então funciona em qualquer proporção.
            <>
              <Image
                src={principal.src}
                alt={principal.alt}
                {...dimensoes(principal.src)}
                sizes={sizes}
                className="absolute bottom-[10%] left-[4%] h-[74%] w-auto max-w-[60%] object-contain object-bottom transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
              />
              <Image
                src={segunda.src}
                alt={segunda.alt}
                {...dimensoes(segunda.src)}
                sizes={sizes}
                className="absolute bottom-[8%] right-[4%] h-[62%] w-auto max-w-[54%] object-contain object-bottom transition-transform delay-75 duration-500 ease-out group-hover:-translate-y-1.5"
              />
            </>
          ) : (
            <Image
              src={principal.src}
              alt={principal.alt}
              fill
              sizes={sizes}
              className="object-contain px-[9%] pb-[10%] pt-[8%] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
            />
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <Image src="/images/marca/balao.png" alt="" width={488} height={499} sizes="64px" className="w-14 opacity-50" />
          <span className="text-sm font-bold text-brand-blue/60">Foto em breve</span>
          <span className="sr-only">{nome}</span>
        </div>
      )}

      {selo && (
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-extrabold shadow-sm ${
            seloDestaque ? "bg-brand-coral text-white" : "bg-white text-brand-blue"
          }`}
        >
          {selo}
        </span>
      )}
    </div>
  );
}
