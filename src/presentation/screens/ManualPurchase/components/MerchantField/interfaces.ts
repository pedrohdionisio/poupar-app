import type { ImportPurchaseFormType } from '@data/modules/purchase/useCases/importPurchase/schemas/importPurchaseSchema';
import type { Control } from 'react-hook-form';

export interface IMerchantFieldProps {
  control: Control<ImportPurchaseFormType>;
  /** `null` enquanto nada foi escolhido — o campo mostra o placeholder. */
  merchantName: string | null;
  onPress: () => void;
}
