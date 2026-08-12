import type { IMerchant } from '../../interfaces';

export interface IMerchantListItemProps {
  merchant: IMerchant;
  onEditPress: (merchant: IMerchant) => void;
}
