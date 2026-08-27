import { api } from '@data/config/api';
import type {
  IListPurchasesParams,
  IListPurchasesResponse
} from '../types/PurchaseTypes';

async function listPurchases(
  params: IListPurchasesParams
): Promise<IListPurchasesResponse> {
  const { data } = await api.get<IListPurchasesResponse>('/purchases', { params });

  return data;
}

export const PurchaseService = { listPurchases };
