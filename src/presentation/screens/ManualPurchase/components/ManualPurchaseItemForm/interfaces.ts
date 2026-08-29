import type { ImportPurchaseFormType } from '@data/modules/purchase/useCases/importPurchase/schemas/importPurchaseSchema';
import type { Control } from 'react-hook-form';

export interface IManualPurchaseItemFormProps {
  index: number;
  control: Control<ImportPurchaseFormType>;
  /** O último item não pode sair: a API exige pelo menos um. */
  canRemove: boolean;
  onRemovePress: (index: number) => void;
}
