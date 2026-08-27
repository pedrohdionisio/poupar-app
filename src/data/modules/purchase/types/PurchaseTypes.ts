export type PurchaseSourceType = 'OCR' | 'MANUAL';

export type MerchantCategoryType = 'SUPERMARKET' | 'OTHER';

export interface IListPurchasesParams {
  limit?: number;
}

export interface IPurchaseResponse {
  id: string;
  accountId: string;
  purchasedAt: string;
  createdAt: string;
  updatedAt: string;
  merchantCnpj: string;
  merchantName: string;
  category: MerchantCategoryType;
  totalCents: number;
  discountCents: number;
  itemCount: number;
  accessKey: string | null;
  source: PurchaseSourceType;
}

export type IListPurchasesResponse = IPurchaseResponse[];
