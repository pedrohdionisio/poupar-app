import type { IAccountProduct } from '@data/modules/product/types/Product';
import type { Ref } from 'react';

export interface IProductPickerBottomSheet {
  open: () => void;
}

export interface IProductPickerBottomSheetProps {
  ref: Ref<IProductPickerBottomSheet>;
  /** `null` enquanto o card ainda está no produto escolhido por padrão. */
  selectedProductKey: string | null;
  onSelect: (product: IAccountProduct) => void;
}

export interface IUseProductPickerBottomSheetController {
  ref: Ref<IProductPickerBottomSheet>;
  onSelect: (product: IAccountProduct) => void;
}
