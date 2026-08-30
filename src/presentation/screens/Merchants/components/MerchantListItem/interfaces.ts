import type { IMerchant } from '@data/modules/merchant/types/Merchant';

export interface IMerchantListItemProps {
  merchant: IMerchant;
  onEditPress: (merchant: IMerchant) => void;
  onDeletePress: (merchant: IMerchant) => void;
}
