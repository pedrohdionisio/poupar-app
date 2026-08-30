import type { ICreateMerchantResponse, MerchantCategoryType } from './MerchantTypes';

/**
 * Separado de `MerchantTypes.ts` de propósito: lá vive o espelho da API, em
 * centavos; aqui vive o que a UI consome, já traduzido pelo mapper.
 */
export interface IMerchant {
  /** O ULID é a identidade desde que o estabelecimento passou a ser da conta. */
  id: string;
  name: string;
  category: MerchantCategoryType;
  /** Só dígitos, como a API devolve; `null` quando não informado. */
  cnpj: string | null;
  purchasesCount: number;
  /** Total gasto em reais. */
  totalSpent: number;
  /** `null` enquanto não houver nenhuma compra. */
  lastPurchaseAt: string | null;
}

export interface ICreateMerchantPayload {
  name: string;
  category: MerchantCategoryType;
  /** Com ou sem máscara, e vazio quando não informado: o mapper resolve. */
  cnpj: string;
}

export interface IUpdateMerchantPayload extends ICreateMerchantPayload {
  merchantId: string;
}

/** O endpoint só devolve o id gerado: o domínio é o próprio espelho. */
export type ICreatedMerchant = ICreateMerchantResponse;
