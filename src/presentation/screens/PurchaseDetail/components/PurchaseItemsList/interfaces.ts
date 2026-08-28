import type { IPurchaseReceiptItem } from '@data/modules/purchase/types/Purchase';
import type { ReactElement } from 'react';

export interface IPurchaseItemsListProps {
  items: IPurchaseReceiptItem[];
  isLoading: boolean;
  isRetrying: boolean;
  hasError: boolean;
  isReceiptNotFound: boolean;
  errorMessage: string;
  onRetry: () => void;
  ListHeaderComponent?: ReactElement;
}
