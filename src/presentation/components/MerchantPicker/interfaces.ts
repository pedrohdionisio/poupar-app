import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import type { ComponentType } from 'react';
import type { FlatListProps, TextInputProps } from 'react-native';

export interface IMerchantPickerProps {
  /** `null` enquanto nada foi escolhido. */
  selectedMerchantId: string | null;
  onSelect: (merchant: IMerchant) => void;
  onCreatePress: () => void;
  /**
   * Pontos de troca para as versões do `@gorhom/bottom-sheet`: dentro de um
   * sheet, o `FlatList` e o `TextInput` nativos brigam com o gesto de arrastar.
   */
  InputComponent?: ComponentType<TextInputProps>;
  ListComponent?: ComponentType<FlatListProps<IMerchant>>;
  className?: string;
}
