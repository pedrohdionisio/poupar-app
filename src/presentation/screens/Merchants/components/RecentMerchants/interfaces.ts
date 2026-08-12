import type { IMerchant } from '../../interfaces';

export interface IRecentMerchantsProps {
  merchants: IMerchant[];
  onMerchantPress: (merchant: IMerchant) => void;
}
