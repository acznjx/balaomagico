// src/data/brinquedos.ts

/**
 * Cadastro único dos brinquedos.
 * A home (vitrine) e o catálogo (tabela de preços) leem daqui, então nome,
 * foto e preço ficam sempre iguais nas duas páginas.
 *
 * Para adicionar um brinquedo: inclua um objeto novo na lista BRINQUEDOS.
 * Para trocar uma foto: use uma imagem com fundo transparente (PNG) em
 * public/images/brinquedos e ajuste `imagem`. As fotos originais, com fundo,
 * ficam em public/images/kids.
 */

export interface Brinquedo {
  /** Identificador estável, usado como key no React e para ligar aos combos. */
  readonly id: string;
  readonly nome: string;
  /** Caminho a partir de /public. Sem foto, o card mostra um placeholder. */
  readonly imagem?: string;
  readonly especificacoes: string;
  readonly capacidade: string;
  /** Valor da locação avulsa, em reais. */
  readonly preco: number;
  /** A locação inclui um monitor acompanhando as crianças. */
  readonly comMonitor?: boolean;
}

export const BRINQUEDOS = [
  {
    id: "kit-baby",
    nome: "Escorregador + Gangorra e Cavalinho",
    imagem: "/images/brinquedos/kit-baby.png",
    especificacoes: "Kit lúdico voltado para o público infantil menor",
    capacidade: "Ideal para 2 a 4 crianças pequenas ao mesmo tempo",
    preco: 60,
  },
  {
    id: "cama-elastica-p",
    nome: "Cama Elástica P",
    imagem: "/images/brinquedos/cama-elastica-p.png",
    especificacoes: "Tamanho compacto, ideal para espaços menores",
    capacidade: "Recomendado para 1 a 2 crianças por vez",
    preco: 85,
  },
  {
    id: "cama-elastica-m",
    nome: "Cama Elástica M",
    imagem: "/images/brinquedos/cama-elastica.png",
    especificacoes: "Diâmetro: 2,44 m | Rede de proteção lateral",
    capacidade: "Indicado para crianças de 3 a 12 anos | Até 80 kg",
    preco: 120,
  },
  {
    id: "piscina-bolinhas",
    nome: "Piscina de Bolinhas",
    imagem: "/images/brinquedos/piscina-bolinhas.png",
    especificacoes: "Acompanha centenas de bolinhas coloridas e limpas",
    capacidade: "Indicado para crianças de 1 a 6 anos",
    preco: 80,
  },
  {
    id: "super-toboga",
    nome: "Super Tobogã 4,4 m",
    imagem: "/images/brinquedos/super-toboga.png",
    especificacoes: "Altura: 4,4 metros | Estrutura inflável de grande porte",
    capacidade: "Uso rotativo seguro com monitoria especializada",
    preco: 380,
    comMonitor: true,
  },
  {
    id: "toboga-castelinho",
    nome: "Tobogã Castelinho com Piscina de Bolinhas",
    imagem: "/images/brinquedos/castelinho.png",
    especificacoes: "Medidas: 5,00 m C x 2,40 m L x 2,60 m A",
    capacidade: "Indicado para 3 a 15 anos | Até 5 crianças por vez",
    preco: 330,
    comMonitor: true,
  },
] as const satisfies readonly Brinquedo[];

/** Mesma lista, com os brinquedos que têm foto primeiro (para as vitrines). */
export const BRINQUEDOS_COM_FOTO_PRIMEIRO = [...BRINQUEDOS].sort(
  (a, b) => Number(!("imagem" in a)) - Number(!("imagem" in b)),
);
