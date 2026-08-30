import type { ReceiptUnitType } from '@data/modules/purchase/types/PurchaseTypes';
import type {
  ICreateScanResponse,
  IUploadSignatureResponse,
  ScanContentType,
  ScanErrorCodeType,
  ScanStatusType
} from './ScanTypes';

/**
 * Separado de `ScanTypes.ts` de propósito: lá vive o espelho da API, em
 * centavos e milésimos; aqui vive o que a UI consome, já traduzido.
 */
export interface IScanDraftMerchant {
  /** Só dígitos, como a API devolve. */
  cnpj: string;
  name: string;
  fantasyName: string | null;
  address: string;
}

export interface IScanDraftItem {
  /** `seq` é único dentro do draft — serve de chave de lista. */
  seq: number;
  description: string;
  merchantCode: string | null;
  gtin: string | null;
  /** Quantidade já convertida de milésimos: `2500` vira `2.5`. */
  quantity: number;
  unit: ReceiptUnitType;
  /** Preço unitário em reais. */
  unitPrice: number;
  /** Valor total do item em reais. */
  totalAmount: number;
  /** Desconto do item em reais. */
  discountAmount: number;
}

export interface IScanDraft {
  /** Instante UTC da compra, como a API devolveu. */
  purchasedAt: string;
  accessKey: string | null;
  merchant: IScanDraftMerchant;
  /** Valor total em reais. */
  totalAmount: number;
  /** Desconto em reais. */
  discountAmount: number;
  items: IScanDraftItem[];
}

export interface IScan {
  id: string;
  status: ScanStatusType;
  /** Preenchido só em `AWAITING_REVIEW`. */
  draft: IScanDraft | null;
  /** Preenchido em `DONE` e em `FAILED` por nota duplicada. */
  purchaseId: string | null;
  /** Preenchido só em `FAILED`. */
  errorCode: ScanErrorCodeType | null;
}

/** O endpoint não transforma nada: o domínio é o próprio espelho da resposta. */
export type ICreatedScan = ICreateScanResponse;

export interface IUploadScanPhotoPayload {
  uploadSignature: IUploadSignatureResponse;
  /** `file://` local devolvido pela câmera. */
  photoUri: string;
  contentType: ScanContentType;
}

export interface IConfirmScanPayload {
  scanId: string;
  draft: IScanDraft;
}

export interface IConfirmedScan {
  purchaseId: string;
  purchasedAt: string;
  itemsCount: number;
  /** Valor total em reais. */
  totalAmount: number;
}
