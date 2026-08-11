import type { IReceipt } from '../../interfaces';

export interface IReceiptListItemProps {
  receipt: IReceipt;
  onPress: (receipt: IReceipt) => void;
}
