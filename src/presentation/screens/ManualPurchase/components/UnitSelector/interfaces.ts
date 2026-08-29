import type { ImportPurchaseFormType } from '@data/modules/purchase/useCases/importPurchase/schemas/importPurchaseSchema';
import type { Control } from 'react-hook-form';

export interface IUnitSelectorProps {
  /** Só o campo de unidade: qualquer outro nunca casaria com as opções. */
  name: `items.${number}.unit`;
  control: Control<ImportPurchaseFormType>;
  label: string;
}
