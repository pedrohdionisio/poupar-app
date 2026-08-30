import { api } from '@data/config/api';
import type {
  ICreatedMerchant,
  ICreateMerchantPayload,
  IMerchant,
  IUpdateMerchantPayload
} from '../types/Merchant';
import type {
  ICreateMerchantResponse,
  IListMerchantsResponse
} from '../types/MerchantTypes';
import { ListMerchantsMapper } from './mappers/ListMerchantsMapper';
import { SaveMerchantMapper } from './mappers/SaveMerchantMapper';

async function listMerchants(): Promise<IMerchant[]> {
  const { data } = await api.get<IListMerchantsResponse>('/merchants');

  return ListMerchantsMapper.toDomain(data);
}

async function createMerchant(
  payload: ICreateMerchantPayload
): Promise<ICreatedMerchant> {
  const { data } = await api.post<ICreateMerchantResponse>(
    '/merchants',
    SaveMerchantMapper.toPersistence(payload)
  );

  return data;
}

async function updateMerchant({
  merchantId,
  ...payload
}: IUpdateMerchantPayload): Promise<void> {
  await api.put(`/merchants/${merchantId}`, SaveMerchantMapper.toPersistence(payload));
}

async function deleteMerchant(merchantId: string): Promise<void> {
  await api.delete(`/merchants/${merchantId}`);
}

export const MerchantService = {
  listMerchants,
  createMerchant,
  updateMerchant,
  deleteMerchant
};
