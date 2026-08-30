import { Cnpj } from '@shared/utils/cnpj';
import type { ICreateMerchantPayload } from '../../types/Merchant';
import type { ISaveMerchantBody } from '../../types/MerchantTypes';

/**
 * O CNPJ é opcional desde que o estabelecimento virou da conta: o formulário
 * trabalha com máscara e com string vazia, mas a API só aceita 14 dígitos ou
 * `null` — string vazia derruba a requisição inteira na validação.
 */
function toPersistence(payload: ICreateMerchantPayload): ISaveMerchantBody {
  const digits = Cnpj.unformat(payload.cnpj);

  return {
    name: payload.name.trim(),
    category: payload.category,
    cnpj: digits || null
  };
}

export const SaveMerchantMapper = {
  toPersistence
};
