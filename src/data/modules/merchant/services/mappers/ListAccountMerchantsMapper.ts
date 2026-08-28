import type { IMerchant } from '../../types/Merchant';
import type {
  IAccountMerchantResponse,
  IListAccountMerchantsResponse
} from '../../types/MerchantTypes';

function toDomainMerchant(merchant: IAccountMerchantResponse): IMerchant {
  return {
    cnpj: merchant.merchantCnpj,
    name: merchant.name,
    alias: merchant.alias,
    purchasesCount: merchant.purchaseCount,
    lastPurchaseAt: merchant.lastPurchaseAt
  };
}

function toDomain(response: IListAccountMerchantsResponse): IMerchant[] {
  return response.map(toDomainMerchant);
}

export const ListAccountMerchantsMapper = {
  toDomain
};
