/**
 * Separado de `ProductTypes.ts` de propósito: lá vive o espelho da API, em
 * centavos; aqui vive o que a UI consome, já traduzido pelo mapper.
 */
export interface IAccountProduct {
  productKey: string;
  name: string;
  purchasesCount: number;
  /** Preço unitário da última compra, em reais. */
  lastUnitPrice: number;
}

export interface IPricePoint {
  purchasedAt: string;
  /** Preço unitário em reais. */
  unitPrice: number;
}
