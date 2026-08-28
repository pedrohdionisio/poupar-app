import { Money } from '@shared/utils/money';
import type { IPurchase } from '../../types/Purchase';
import type {
  IListPurchasesResponse,
  IPurchaseResponse
} from '../../types/PurchaseTypes';

function toDomainPurchase(purchase: IPurchaseResponse): IPurchase {
  return {
    id: purchase.id,
    merchantName: purchase.merchantName,
    merchantCnpj: purchase.merchantCnpj,
    purchasedAt: purchase.purchasedAt,
    category: purchase.category,
    source: purchase.source,
    itemsCount: purchase.itemCount,
    totalAmount: Money.fromCents(purchase.totalCents),
    discountAmount: Money.fromCents(purchase.discountCents)
  };
}

function toDomain(response: IListPurchasesResponse): IPurchase[] {
  return response.map(toDomainPurchase);
}

export const ListPurchasesMapper = {
  toDomain
};
