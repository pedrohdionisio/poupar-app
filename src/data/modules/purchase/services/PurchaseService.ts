import { api } from '@data/config/api';
import type {
  IImportPurchasePayload,
  IPurchase,
  IPurchaseReceipt
} from '../types/Purchase';
import type {
  IGetPurchaseReceiptResponse,
  IListPurchasesResponse,
  ListPurchasesParamsType
} from '../types/PurchaseTypes';
import { GetPurchaseReceiptMapper } from './mappers/GetPurchaseReceiptMapper';
import { ImportPurchaseMapper } from './mappers/ImportPurchaseMapper';
import { ListPurchasesMapper } from './mappers/ListPurchasesMapper';

async function listPurchases(params: ListPurchasesParamsType): Promise<IPurchase[]> {
  const { data } = await api.get<IListPurchasesResponse>('/purchases', { params });

  return ListPurchasesMapper.toDomain(data);
}

async function getPurchaseReceipt(purchaseId: string): Promise<IPurchaseReceipt> {
  const { data } = await api.get<IGetPurchaseReceiptResponse>(
    `/purchases/${purchaseId}/receipt`
  );

  return GetPurchaseReceiptMapper.toDomain(data);
}

async function importPurchase(payload: IImportPurchasePayload): Promise<void> {
  await api.post('/purchases/import', ImportPurchaseMapper.toPersistence(payload));
}

export const PurchaseService = { listPurchases, getPurchaseReceipt, importPurchase };
