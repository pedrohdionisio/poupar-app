import type {
  ICategorySlice,
  IMerchantSpend,
  IPriceTrend,
  ISpendPoint
} from '../../interfaces';

export interface IStatisticsContentProps {
  spendSeries: ISpendPoint[];
  categorySlices: ICategorySlice[];
  categoryTotalAmount: number;
  categoryCaption: string;
  hasCategoryError: boolean;
  isRetryingCategory: boolean;
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
