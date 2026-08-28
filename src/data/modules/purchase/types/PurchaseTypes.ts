export type PurchaseSourceType = 'OCR' | 'MANUAL';

export type MerchantCategoryType = 'SUPERMARKET' | 'OTHER';

/**
 * União em vez de campos opcionais soltos porque a API recusa `from` sem `to`, e
 * porque `limit` junto de um período cortaria o resultado em silêncio e
 * falsearia qualquer soma. O tipo torna as duas combinações inválidas
 * inexprimíveis.
 */
export type ListPurchasesParamsType =
  | { from?: never; to?: never; limit?: number }
  | { from: string; to: string; limit?: never };

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

export type ReceiptUnitType = 'UN' | 'KG' | 'L';

export interface IReceiptItemResponse {
  seq: number;
  productKey: string;
  description: string;
  normalizedName: string;
  gtin: string | null;
  merchantCode: string | null;
  /** Quantidade em milésimos: `2500` é 2,5. */
  quantityMilli: number;
  unit: ReceiptUnitType;
  unitPriceCents: number;
  totalCents: number;
  discountCents: number;
}

export interface IGetPurchaseReceiptResponse {
  purchaseId: string;
  accountId: string;
  accessKey: string | null;
  photoS3Key: string | null;
  ocrS3Key: string | null;
  items: IReceiptItemResponse[];
  createdAt: string;
}
