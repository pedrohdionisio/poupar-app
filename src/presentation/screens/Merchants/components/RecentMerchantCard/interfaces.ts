import type { IMerchant } from '../../interfaces';

export interface IRecentMerchantCardProps {
  merchant: IMerchant;
  onPress: (merchant: IMerchant) => void;
}
