import { Money } from '@shared/utils/money';
import { Quantity } from '@shared/utils/quantity';
import type { IPurchaseReceipt, IPurchaseReceiptItem } from '../../types/Purchase';
import type {
  IGetPurchaseReceiptResponse,
  IReceiptItemResponse
} from '../../types/PurchaseTypes';

function toDomainItem(item: IReceiptItemResponse): IPurchaseReceiptItem {
  return {
    seq: item.seq,
    description: item.description,
    quantity: Quantity.fromMilli(item.quantityMilli),
    unit: item.unit,
    unitPrice: Money.fromCents(item.unitPriceCents),
    totalAmount: Money.fromCents(item.totalCents),
    discountAmount: Money.fromCents(item.discountCents)
  };
}

function toDomain(response: IGetPurchaseReceiptResponse): IPurchaseReceipt {
  return {
    purchaseId: response.purchaseId,
    items: response.items.map(toDomainItem)
  };
}

export const GetPurchaseReceiptMapper = {
  toDomain
};
