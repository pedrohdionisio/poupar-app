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
  onCreatePress: () => void;
  onEditPress: (merchant: IMerchant) => void;
  onDeletePress: (merchant: IMerchant) => void;
  onRetry: () => void;
}
