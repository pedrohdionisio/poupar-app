import type { Ref } from 'react';
import type { IMerchant } from '../../interfaces';

export interface IEditMerchantBottomSheet {
  open: (merchant: IMerchant) => void;
}

export interface IEditMerchantBottomSheetProps {
  ref: Ref<IEditMerchantBottomSheet>;
  /** Apelido vazio volta o estabelecimento para a razão social. */
  onSave: (merchantId: string, nickname: string) => void;
}

export interface IUseEditMerchantBottomSheetController {
  ref: Ref<IEditMerchantBottomSheet>;
  onSave: (merchantId: string, nickname: string) => void;
}
