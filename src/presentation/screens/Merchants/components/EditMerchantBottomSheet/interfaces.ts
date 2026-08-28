import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import type { Ref } from 'react';

export interface IEditMerchantBottomSheet {
  open: (merchant: IMerchant) => void;
}

export interface IEditMerchantBottomSheetProps {
  ref: Ref<IEditMerchantBottomSheet>;
}

export interface IUseEditMerchantBottomSheetController {
  ref: Ref<IEditMerchantBottomSheet>;
}
