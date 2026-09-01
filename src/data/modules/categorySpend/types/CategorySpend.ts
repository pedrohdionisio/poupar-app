import type { ProductCategoryType } from './CategorySpendTypes';

/**
 * Separado de `CategorySpendTypes.ts` de propósito: lá vive o espelho da API,
 * em centavos; aqui vive o que a UI consome, já traduzido pelo mapper.
 */
export interface ICategorySpend {
  /** `YYYY-MM` — a rota devolve uma linha por categoria em cada mês. */
  month: string;
  category: ProductCategoryType;
  /** Total gasto na categoria naquele mês, em reais. */
  totalAmount: number;
  itemCount: number;
}
