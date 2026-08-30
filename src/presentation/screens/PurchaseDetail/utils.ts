import { getMerchantCategoryLabel } from '@data/modules/merchant/constants/merchantCategories';
import type { PurchaseSourceType } from '@data/modules/purchase/types/PurchaseTypes';

const SOURCE_LABELS: Record<PurchaseSourceType, string> = {
  OCR: 'Nota escaneada',
  MANUAL: 'Lançamento manual'
};

export { getMerchantCategoryLabel as getCategoryLabel };

export function getSourceLabel(source: PurchaseSourceType): string {
  return SOURCE_LABELS[source];
}
