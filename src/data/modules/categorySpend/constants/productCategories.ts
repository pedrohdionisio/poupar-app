import type { ProductCategoryType } from '../types/CategorySpendTypes';

const PRODUCT_CATEGORY_LABELS: Record<ProductCategoryType, string> = {
  PRODUCE: 'Hortifrúti',
  MEAT: 'Carnes',
  SEAFOOD: 'Peixes e frutos do mar',
  DELI: 'Frios e embutidos',
  DAIRY: 'Laticínios',
  BAKERY: 'Padaria',
  GRAINS: 'Grãos e massas',
  CANNED: 'Enlatados',
  CONDIMENTS: 'Temperos e molhos',
  BREAKFAST: 'Café da manhã',
  SNACKS: 'Snacks',
  FROZEN: 'Congelados',
  PREPARED_FOODS: 'Pratos prontos',
  BEVERAGES: 'Bebidas',
  ALCOHOL: 'Bebidas alcoólicas',
  CLEANING: 'Limpeza',
  DISPOSABLES: 'Descartáveis',
  PERSONAL_CARE: 'Higiene e beleza',
  PHARMACY: 'Farmácia',
  BABY: 'Bebê',
  PET: 'Pet',
  HOUSEHOLD: 'Utilidades domésticas',
  TOBACCO: 'Tabacaria',
  OTHER: 'Outros'
};

export function getProductCategoryLabel(category: ProductCategoryType): string {
  return PRODUCT_CATEGORY_LABELS[category];
}
