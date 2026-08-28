import type { IMerchant } from '@data/modules/merchant/types/Merchant';

export interface IMerchantsContentProps {
  recentMerchants: IMerchant[];
  filteredMerchants: IMerchant[];
  searchTerm: string;
  hasRecentMerchants: boolean;
  hasMerchants: boolean;
  isLoading: boolean;
  isRetrying: boolean;
  hasError: boolean;
  errorMessage: string;
  bottomPadding: number;
  onEditPress: (merchant: IMerchant) => void;
  onRetry: () => void;
}
