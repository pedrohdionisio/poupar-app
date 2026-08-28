import type {
  MerchantCategoryType,
  PurchaseSourceType
} from '@data/modules/purchase/types/PurchaseTypes';

const CATEGORY_LABELS: Record<MerchantCategoryType, string> = {
  SUPERMARKET: 'Supermercado',
  OTHER: 'Outros'
};

const SOURCE_LABELS: Record<PurchaseSourceType, string> = {
  OCR: 'Nota escaneada',
  MANUAL: 'Lançamento manual'
};

export function getCategoryLabel(category: MerchantCategoryType): string {
  return CATEGORY_LABELS[category];
}

export function getSourceLabel(source: PurchaseSourceType): string {
  return SOURCE_LABELS[source];
}
