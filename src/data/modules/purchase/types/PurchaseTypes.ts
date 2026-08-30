export type { MerchantCategoryType } from '@data/modules/merchant/types/MerchantTypes';

import type { MerchantCategoryType } from '@data/modules/merchant/types/MerchantTypes';

export type PurchaseSourceType = 'OCR' | 'MANUAL';

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
  merchantId: string;
  /** Cópia do nome e da categoria no instante da importação, não um join. */
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
  /** Texto cru da nota. */
  description: string;
  /** Nome já resolvido pela API — cai na `description` quando não há melhor. */
  displayName: string;
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

export interface IImportPurchaseItemBody {
  seq: number;
  description: string;
  quantityMilli: number;
  unit: ReceiptUnitType;
  unitPriceCents: number;
  totalCents: number;
}

export interface IImportPurchaseBody {
  source: PurchaseSourceType;
  purchasedAt: string;
  /** O estabelecimento é escolhido antes: a API não cria mais um pela nota. */
  merchantId: string;
  totalCents: number;
  items: IImportPurchaseItemBody[];
}
