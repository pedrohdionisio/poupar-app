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
    /**
     * O `displayName` é o nome que a API também grava no catálogo de produtos.
     * Mostrar a `description` crua faria o mesmo item aparecer com dois nomes
     * diferentes entre a nota e a lista de produtos.
     */
    description: item.displayName,
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
