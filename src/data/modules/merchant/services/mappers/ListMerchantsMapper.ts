import { Money } from '@shared/utils/money';
import type { IMerchant } from '../../types/Merchant';
import type {
  IListMerchantsResponse,
  IMerchantResponse
} from '../../types/MerchantTypes';

function toDomainMerchant(merchant: IMerchantResponse): IMerchant {
  return {
    id: merchant.id,
    name: merchant.name,
    category: merchant.category,
    cnpj: merchant.cnpj,
    purchasesCount: merchant.purchaseCount,
    totalSpent: Money.fromCents(merchant.totalSpentCents),
    lastPurchaseAt: merchant.lastPurchaseAt
  };
}

function toDomain(response: IListMerchantsResponse): IMerchant[] {
  return response.map(toDomainMerchant);
}

export const ListMerchantsMapper = {
  toDomain
};
