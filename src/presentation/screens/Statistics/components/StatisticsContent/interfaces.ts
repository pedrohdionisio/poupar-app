import type {
  ICategorySpend,
  IMerchantSpend,
  IPriceTrend,
  ISpendPoint
} from '../../interfaces';

export interface IStatisticsContentProps {
  spendSeries: ISpendPoint[];
  categorySpends: ICategorySpend[];
  merchantSpends: IMerchantSpend[];
  priceTrend: IPriceTrend | null;
  totalAmount: number;
  totalChange: number | null;
  periodCaption: string;
  chartWidth: number;
  isLoading: boolean;
  isRetrying: boolean;
  hasError: boolean;
  hasStatistics: boolean;
  errorMessage: string;
  onRetry: () => void;
  onProductPress: () => void;
}
