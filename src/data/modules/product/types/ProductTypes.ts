export type ProductUnitType = 'UN' | 'KG' | 'L';

export interface IAccountProductResponse {
  accountId: string;
  productKey: string;
  name: string;
  normalizedName: string;
  gtin: string | null;
  unit: ProductUnitType;
  lastUnitPriceCents: number;
  previousUnitPriceCents: number | null;
  minPriceCents: number;
  maxPriceCents: number;
  lastPurchaseAt: string;
  lastMerchantCnpj: string;
  purchaseCount: number;
  createdAt: string;
  updatedAt: string;
}

export type IListAccountProductsResponse = IAccountProductResponse[];

export interface IListPricePointsParams {
  productKey: string;
}

export interface IPricePointResponse {
  accountId: string;
  productKey: string;
  purchaseId: string;
  purchasedAt: string;
  merchantCnpj: string;
  unitPriceCents: number;
  quantityMilli: number;
  unit: ProductUnitType;
}

export type IListPricePointsResponse = IPricePointResponse[];
