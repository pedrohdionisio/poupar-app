import type { IPurchase } from '@data/modules/purchase/types/Purchase';
import type { ReactElement } from 'react';

export interface IReceiptsListProps {
  receipts: IPurchase[];
  /** Espaço extra no fim da lista, já que a tab bar flutua sobre o conteúdo. */
  bottomPadding: number;
  onReceiptPress: (receipt: IPurchase) => void;
  ListHeaderComponent?: ReactElement;
}
