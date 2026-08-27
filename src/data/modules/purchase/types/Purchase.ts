/**
 * Separado de `PurchaseTypes.ts` de propósito: lá vive o espelho da API, em
 * centavos; aqui vive o que a UI consome, já traduzido pelo useCase.
 */
export interface IPurchase {
  id: string;
  merchantName: string;
  purchasedAt: string;
  itemsCount: number;
  /** Valor total em reais. */
  totalAmount: number;
}
