export type TPeriodId = '7d' | '15d' | '30d' | '3m' | '6m' | '1a';

export interface IPeriodOption {
  id: TPeriodId;
  /** Texto da pill (`7 dias`). */
  label: string;
}

export interface ISpendPoint {
  /** Rótulo curto do ponto no eixo X (`ago.`, `sem 1`, `seg`). */
  label: string;
  /** Valor gasto no ponto, em reais. */
  amount: number;
}

export interface ICategorySpend {
  id: string;
  name: string;
  amount: number;
}

export interface IMerchantSpend {
  id: string;
  /** Nome curto: precisa caber no rótulo do eixo X. */
  name: string;
  amount: number;
}

export interface IPriceTrend {
  productName: string;
  /** Preços em ordem cronológica — o último é o preço atual. */
  prices: number[];
}

/** Tudo o que a tela mostra para um período selecionado. */
export interface IPeriodStatistics {
  spendSeries: ISpendPoint[];
  /** Total gasto no período imediatamente anterior, base da variação. */
  previousTotalAmount: number;
  priceTrend: IPriceTrend;
}
