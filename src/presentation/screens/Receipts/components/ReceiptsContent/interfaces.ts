import type { IPurchase } from '@data/modules/purchase/types/Purchase';

export interface IReceiptsContentProps {
  receipts: IPurchase[];
  averageAmount: number;
  isLoading: boolean;
  isRetrying: boolean;
  hasError: boolean;
  errorMessage: string;
  bottomPadding: number;
  onReceiptPress: (receipt: IPurchase) => void;
  onRetry: () => void;
}
