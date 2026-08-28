import type { IMerchant } from '@data/modules/merchant/types/Merchant';

export interface IRecentMerchantsProps {
  merchants: IMerchant[];
  onMerchantPress: (merchant: IMerchant) => void;
}
