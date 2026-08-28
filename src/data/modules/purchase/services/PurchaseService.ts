import { api } from '@data/config/api';
import type { IPurchase, IPurchaseReceipt } from '../types/Purchase';
import type {
  IGetPurchaseReceiptResponse,
  IListPurchasesParams,
  IListPurchasesResponse
} from '../types/PurchaseTypes';
import { GetPurchaseReceiptMapper } from './mappers/GetPurchaseReceiptMapper';
import { ListPurchasesMapper } from './mappers/ListPurchasesMapper';

async function listPurchases(params: IListPurchasesParams): Promise<IPurchase[]> {
  const { data } = await api.get<IListPurchasesResponse>('/purchases', { params });

  return ListPurchasesMapper.toDomain(data);
}

async function getPurchaseReceipt(purchaseId: string): Promise<IPurchaseReceipt> {
  const { data } = await api.get<IGetPurchaseReceiptResponse>(
    `/purchases/${purchaseId}/receipt`
  );

  return GetPurchaseReceiptMapper.toDomain(data);
}

export const PurchaseService = { listPurchases, getPurchaseReceipt };
