import type { IPurchase } from '@data/modules/purchase/types/Purchase';

export interface IReceiptListItemProps {
  receipt: IPurchase;
  onPress: (receipt: IPurchase) => void;
}
