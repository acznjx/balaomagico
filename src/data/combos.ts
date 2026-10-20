// src/data/combos.ts

/**
 * Combos promocionais, listados no catálogo (/catalogo).
 */

export interface Combo {
  readonly id: string;
  readonly nome: string;
  /** O que vem no combo. O título do card é montado juntando os itens. */
  readonly itens: readonly string[];
  readonly descricao: string;
  /** Valor do combo, em reais. */
  readonly preco: number;
  /**
   * Fotos recortadas (PNG sem fundo) dos brinquedos do combo, até três.
   * A primeira fica à esquerda, a segunda à direita e a terceira (se houver)
   * menor, na frente e no centro.
   */
  readonly fotos: readonly string[];
  /** Tempo de festa incluso, quando definido. */
  readonly duracao?: string;
  /** Selo no canto da foto, ex.: "Mais completo". */
  readonly selo?: string;
  /** Destaca o card (borda amarela e selo em coral). */
  readonly destaque?: boolean;
}

const FOTO = {
  superToboga: "/images/brinquedos/super-toboga.png",
  camaElastica: "/images/brinquedos/cama-elastica.png",
  castelinho: "/images/brinquedos/castelinho.png",
  piscina: "/images/brinquedos/piscina-bolinhas.png",
} as const;

export const COMBOS = [
  {
    id: "arco-iris",
    nome: "Arco Íris",
    itens: ["Cama elástica", "Super tobogã", "Monitor incluso"],
    descricao: "Muita aventura com estrutura completa e segurança profissional.",
    preco: 430,
    fotos: [FOTO.superToboga, FOTO.camaElastica],
    duracao: "4 horas de festa",
    selo: "Mais completo",
  },
  {
    id: "diversao",
    nome: "Diversão",
    itens: ["Cama elástica", "Piscina de bolinhas"],
    descricao: "Perfeito para festas em espaço reduzido.",
    preco: 200,
    fotos: [FOTO.camaElastica, FOTO.piscina],
    selo: "Mais econômico",
  },
  {
    id: "castelo",
    nome: "Castelo",
    itens: ["Tobogã castelinho com piscina de bolinhas", "Cama elástica"],
    descricao: "A combinação ideal para garantir a diversão da criançada.",
    preco: 380,
    fotos: [FOTO.castelinho, FOTO.camaElastica],
  },
  {
    id: "balao-magico",
    nome: "Balão Mágico",
    itens: ["Super tobogã", "Piscina de bolinhas", "Cama elástica"],
    descricao: "O pacote completo de diversão para festas inesquecíveis.",
    preco: 470,
    fotos: [FOTO.superToboga, FOTO.camaElastica, FOTO.piscina],
    selo: "Mais vendido",
    destaque: true,
  },
] as const satisfies readonly Combo[];

/** Texto de título do combo, ex.: "Cama elástica + Super tobogã". */
export function comboTitulo(combo: Combo): string {
  return combo.itens.join(" + ");
}
