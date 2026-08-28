export type MerchantCategoryType = 'SUPERMARKET' | 'OTHER';

export interface IAccountMerchantResponse {
  accountId: string;
  merchantCnpj: string;
  alias: string | null;
  name: string;
  category: MerchantCategoryType;
  purchaseCount: number;
  totalSpentCents: number;
  firstPurchaseAt: string;
  lastPurchaseAt: string;
  createdAt: string;
  updatedAt: string;
}

export type IListAccountMerchantsResponse = IAccountMerchantResponse[];

export interface IUpdateAccountMerchantAliasPayload {
  cnpj: string;
  /** `null` limpa o apelido: a API recusa string vazia (`z.string().min(1)`). */
  alias: string | null;
}

export interface IUpdateAccountMerchantAliasBody {
  alias: string | null;
}
