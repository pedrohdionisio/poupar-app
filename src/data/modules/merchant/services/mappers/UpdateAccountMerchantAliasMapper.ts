import type {
  IUpdateAccountMerchantAliasBody,
  IUpdateAccountMerchantAliasPayload
} from '../../types/MerchantTypes';

/**
 * O `cnpj` fica de fora do body: é param de path. E o apelido vazio vira `null`
 * — a API recusa string vazia, e `null` é o que limpa o apelido de verdade.
 */
function toPersistence(
  payload: IUpdateAccountMerchantAliasPayload
): IUpdateAccountMerchantAliasBody {
  return {
    alias: payload.alias?.trim() ? payload.alias.trim() : null
  };
}

export const UpdateAccountMerchantAliasMapper = {
  toPersistence
};
