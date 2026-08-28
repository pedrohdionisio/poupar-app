import { api } from '@data/config/api';
import type { IMerchant } from '../types/Merchant';
import type {
  IListAccountMerchantsResponse,
  IUpdateAccountMerchantAliasPayload
} from '../types/MerchantTypes';
import { ListAccountMerchantsMapper } from './mappers/ListAccountMerchantsMapper';
import { UpdateAccountMerchantAliasMapper } from './mappers/UpdateAccountMerchantAliasMapper';

async function listAccountMerchants(): Promise<IMerchant[]> {
  const { data } = await api.get<IListAccountMerchantsResponse>('/account-merchants');

  return ListAccountMerchantsMapper.toDomain(data);
}

async function updateAccountMerchantAlias(
  payload: IUpdateAccountMerchantAliasPayload
): Promise<void> {
  await api.put(
    `/account-merchants/${payload.cnpj}`,
    UpdateAccountMerchantAliasMapper.toPersistence(payload)
  );
}

export const MerchantService = { listAccountMerchants, updateAccountMerchantAlias };
