import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import type { ReactElement } from 'react';

export interface IMerchantsListProps {
  merchants: IMerchant[];
  /** Texto buscado, usado só pelo estado vazio. */
  searchTerm: string;
  /** Espaço extra no fim da lista, já que a tab bar flutua sobre o conteúdo. */
  bottomPadding: number;
  onEditPress: (merchant: IMerchant) => void;
  ListHeaderComponent?: ReactElement;
}
