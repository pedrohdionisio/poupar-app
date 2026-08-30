import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import type { Ref } from 'react';

export interface IMerchantPickerBottomSheet {
  open: () => void;
  close: () => void;
}

export interface IMerchantPickerBottomSheetProps {
  ref: Ref<IMerchantPickerBottomSheet>;
  /** `null` enquanto nada foi escolhido. */
  selectedMerchantId: string | null;
  onSelect: (merchant: IMerchant) => void;
  onCreatePress: () => void;
}

export interface IUseMerchantPickerBottomSheetController {
  ref: Ref<IMerchantPickerBottomSheet>;
}
