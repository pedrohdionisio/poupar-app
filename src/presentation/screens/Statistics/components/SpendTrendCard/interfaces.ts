import type { ISpendPoint } from '../../interfaces';

export interface ISpendTrendCardProps {
  spendSeries: ISpendPoint[];
  /** Total gasto no período, em destaque no topo do card. */
  totalAmount: number;
  /** Variação sobre o período anterior, em fração. `null` = sem base de comparação. */
  change: number | null;
  caption: string;
  chartWidth: number;
}
