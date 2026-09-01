/** Espelho de `Receipt.ProductCategory` da poupar-api. */
export type ProductCategoryType =
  | 'PRODUCE'
  | 'MEAT'
  | 'SEAFOOD'
  | 'DELI'
  | 'DAIRY'
  | 'BAKERY'
  | 'GRAINS'
  | 'CANNED'
  | 'CONDIMENTS'
  | 'BREAKFAST'
  | 'SNACKS'
  | 'FROZEN'
  | 'PREPARED_FOODS'
  | 'BEVERAGES'
  | 'ALCOHOL'
  | 'CLEANING'
  | 'DISPOSABLES'
  | 'PERSONAL_CARE'
  | 'PHARMACY'
  | 'BABY'
  | 'PET'
  | 'HOUSEHOLD'
  | 'TOBACCO'
  | 'OTHER';

/**
 * A rota agrega por mês, não por dia: as duas pontas são `YYYY-MM` e o
 * intervalo é inclusivo. `from` depois de `to` volta VALIDATION.
 */
export interface IListCategorySpendsParams {
  from: string;
  to: string;
}

export interface ICategorySpendResponse {
  month: string;
  category: ProductCategoryType;
  totalCents: number;
  itemCount: number;
}

export type IListCategorySpendsResponse = ICategorySpendResponse[];
