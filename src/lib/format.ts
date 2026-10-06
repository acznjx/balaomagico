// src/lib/format.ts

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formata o valor no padrão brasileiro, sem centavos. Ex.: 430 -> "R$ 430". */
export function formatPrice(value: number): string {
  // O Intl usa um espaço "não separável" entre R$ e o número; trocamos por um
  // espaço comum para o texto ficar igual no servidor e no navegador.
  return BRL.format(value).replace(/ /g, " ");
}
