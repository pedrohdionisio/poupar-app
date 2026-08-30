import type {
  MerchantCategoryType,
  PurchaseSourceType,
  ReceiptUnitType
} from './PurchaseTypes';

/**
 * Separado de `PurchaseTypes.ts` de propósito: lá vive o espelho da API, em
 * centavos; aqui vive o que a UI consome, já traduzido pelo useCase.
 */
export interface IPurchase {
  id: string;
  merchantId: string;
  merchantName: string;
  purchasedAt: string;
  category: MerchantCategoryType;
  source: PurchaseSourceType;
  itemsCount: number;
  /** Valor total em reais. */
  totalAmount: number;
  /** Desconto em reais. */
  discountAmount: number;
}

export interface IPurchaseReceiptItem {
  /** `seq` é único dentro do recibo — serve de chave de lista. */
  seq: number;
  description: string;
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

export interface IPurchaseReceipt {
  purchaseId: string;
  items: IPurchaseReceiptItem[];
}

export interface IImportPurchaseItem {
  description: string;
  /** Quantidade em unidades — o mapper converte para milésimos. */
  quantity: number;
  unit: ReceiptUnitType;
  /** Preço unitário em reais — o mapper converte para centavos. */
  unitPrice: number;
}

export interface IImportPurchasePayload {
  /** Data da compra em ISO UTC: a API recusa data sem hora e offset local. */
  purchasedAt: string;
  merchantId: string;
  items: IImportPurchaseItem[];
}
