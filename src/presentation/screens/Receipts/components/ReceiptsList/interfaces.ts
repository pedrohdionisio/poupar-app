import type { ReactElement } from 'react';
import type { IReceipt } from '../../interfaces';

export interface IReceiptsListProps {
  receipts: IReceipt[];
  /** Espaço extra no fim da lista, já que a tab bar flutua sobre o conteúdo. */
  bottomPadding: number;
  onReceiptPress: (receipt: IReceipt) => void;
  ListHeaderComponent?: ReactElement;
}
