export type MerchantCategoryType = 'SUPERMARKET' | 'OTHER';

export interface IMerchantResponse {
  id: string;
  accountId: string;
  name: string;
  category: MerchantCategoryType;
  /** Só dígitos; `null` quando o usuário não informou. */
  cnpj: string | null;
  purchaseCount: number;
  totalSpentCents: number;
  /** `null` enquanto o estabelecimento não tiver nenhuma compra. */
  firstPurchaseAt: string | null;
  lastPurchaseAt: string | null;
  lastAppliedPurchaseId: string | null;
  createdAt: string;
  updatedAt: string;
}

export type IListMerchantsResponse = IMerchantResponse[];

/** `POST` e `PUT` aceitam exatamente o mesmo corpo. */
export interface ISaveMerchantBody {
  name: string;
  category: MerchantCategoryType;
  /** `null` limpa o CNPJ: a API recusa string vazia (`regex` de 14 dígitos). */
  cnpj: string | null;
}

export interface ICreateMerchantResponse {
  id: string;
}
