import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import type { Ref } from 'react';

export interface IMerchantFormBottomSheet {
  /** Sem argumento abre em branco, para cadastrar; com um, abre para editar. */
  open: (merchant?: IMerchant) => void;
}

export interface IMerchantFormBottomSheetProps {
  ref: Ref<IMerchantFormBottomSheet>;
  /**
   * Recebe o id salvo — o do recém-criado ou o do editado — para quem abriu o
   * sheet já deixar o estabelecimento escolhido no fluxo em andamento.
   */
  onSaved?: (merchantId: string) => void;
}

export interface IUseMerchantFormBottomSheetController {
  ref: Ref<IMerchantFormBottomSheet>;
  onSaved?: (merchantId: string) => void;
}
