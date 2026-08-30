export type TPeriodId = '7d' | '15d' | '30d' | '3m' | '6m' | '1a';

export type GranularityType = 'day' | 'month';

export type LabelKindType = 'weekday' | 'dayOfMonth' | 'month';

export interface IPeriodConfig {
  /**
   * Quantas fatias o gráfico tem. A janela é derivada daqui, não o contrário:
   * é isso que garante que nenhuma fatia comece antes do início do período.
   */
  bucketCount: number;
  granularity: GranularityType;
  labelKind: LabelKindType;
  /** Rotula um ponto a cada N, para o eixo X não embolar. */
  labelEvery: number;
}

export interface IPeriodOption {
  id: TPeriodId;
  /** Texto da pill (`7 dias`). */
  label: string;
}

/** Intervalo em ISO, pronto para virar query da API. */
export interface IDateRange {
  from: string;
  to: string;
}

export interface ISpendPoint {
  /** Rótulo curto do ponto no eixo X (`ago.`, `07`, `seg`). */
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
  name: string;
  amount: number;
}

export interface IPriceTrend {
  productName: string;
  /** Preços em ordem cronológica — o último é o preço atual. */
  prices: number[];
}
