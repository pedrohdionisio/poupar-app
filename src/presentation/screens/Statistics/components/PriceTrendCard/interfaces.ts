import type { IPriceTrend } from '../../interfaces';

export interface IPriceTrendCardProps {
  priceTrend: IPriceTrend;
  caption: string;
  chartWidth: number;
  onProductPress: () => void;
}
