import type { IMerchant } from '@data/modules/merchant/types/Merchant';

export interface IRecentMerchantCardProps {
  merchant: IMerchant;
  onPress: (merchant: IMerchant) => void;
}
