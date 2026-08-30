import type { MerchantCategoryType } from '../types/MerchantTypes';

const MERCHANT_CATEGORY_LABELS: Record<MerchantCategoryType, string> = {
  SUPERMARKET: 'Supermercado',
  OTHER: 'Outros'
};

/** Fonte única da ordem em que as categorias aparecem no seletor. */
export const MERCHANT_CATEGORY_OPTIONS: {
  value: MerchantCategoryType;
  label: string;
}[] = [
  { value: 'SUPERMARKET', label: MERCHANT_CATEGORY_LABELS.SUPERMARKET },
  { value: 'OTHER', label: MERCHANT_CATEGORY_LABELS.OTHER }
];

export function getMerchantCategoryLabel(category: MerchantCategoryType): string {
  return MERCHANT_CATEGORY_LABELS[category];
}
