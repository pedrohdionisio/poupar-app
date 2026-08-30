import type { IMerchant } from '@data/modules/merchant/types/Merchant';

export interface IScanMerchantStepProps {
  /** `null` enquanto nada foi escolhido. */
  selectedMerchantId: string | null;
  onSelect: (merchant: IMerchant) => void;
  onCreatePress: () => void;
}
