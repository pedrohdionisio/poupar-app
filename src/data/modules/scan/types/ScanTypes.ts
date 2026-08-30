import type { ReceiptUnitType } from '@data/modules/purchase/types/PurchaseTypes';

/** Espelha `Scan.Status` da poupar-api. */
export type ScanStatusType =
  | 'PENDING'
  | 'PROCESSING'
  | 'AWAITING_REVIEW'
  | 'DONE'
  | 'FAILED';

/**
 * Espelha `Scan.ErrorCode` da poupar-api. Não confundir com `ApiErrorCode`: este
 * chega dentro do corpo de um `200`, descrevendo por que a extração falhou.
 */
export type ScanErrorCodeType =
  | 'UNREADABLE_PHOTO'
  | 'PARSE_FAILED'
  | 'DUPLICATE_RECEIPT'
  | 'INTERNAL_ERROR';

export type ScanProviderType = 'GEMINI' | 'MANUAL';

/** Só o que o app envia; o S3 assina o resto. */
export type ScanContentType = 'image/jpeg' | 'image/png';

export interface ICreateScanPayload {
  /** O estabelecimento é escolhido antes da foto e fica preso ao scan. */
  merchantId: string;
  contentType: ScanContentType;
}

/** Presigned POST do S3: `fields` vai inteiro no `FormData`, antes do arquivo. */
export interface IUploadSignatureResponse {
  url: string;
  fields: Record<string, string>;
}

export interface ICreateScanResponse {
  scanId: string;
  uploadSignature: IUploadSignatureResponse;
}

export interface IScanDraftItemResponse {
  seq: number;
  /** Texto cru lido da nota. */
  description: string;
  /** Nome resolvido pela extração contra o catálogo de produtos da conta. */
  displayName: string;
  merchantCode: string | null;
  gtin: string | null;
  /** Quantidade em milésimos: `2500` é 2,5. */
  quantityMilli: number;
  unit: ReceiptUnitType;
  unitPriceCents: number;
  totalCents: number;
  discountCents: number;
}

export interface IScanDraftResponse {
  purchasedAt: string;
  accessKey: string | null;
  totalCents: number;
  discountCents: number;
  items: IScanDraftItemResponse[];
}

export interface IGetScanResponse {
  id: string;
  accountId: string;
  merchantId: string;
  status: ScanStatusType;
  provider: ScanProviderType;
  draft: IScanDraftResponse | null;
  purchaseId: string | null;
  errorCode: ScanErrorCodeType | null;
  attempts: number;
  createdAt: string;
  updatedAt: string;
}

/** O corpo do `confirm` é o próprio draft de volta. */
export type IConfirmScanBody = IScanDraftResponse;

export interface IConfirmScanResponse {
  purchaseId: string;
  purchasedAt: string;
  itemCount: number;
  totalCents: number;
}
