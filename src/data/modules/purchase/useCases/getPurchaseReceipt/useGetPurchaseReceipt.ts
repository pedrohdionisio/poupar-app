import { ApiErrorCode, getApiErrorCode } from '@data/config/apiError';
import { useQuery } from '@tanstack/react-query';
import { PurchaseQueryKeys } from '../../keys/PurchaseKeys';
import { PurchaseService } from '../../services/PurchaseService';
import type { IUseGetPurchaseReceiptOptions } from './interfaces';

export function useGetPurchaseReceipt({ purchaseId }: IUseGetPurchaseReceiptOptions) {
  const { data, refetch, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [PurchaseQueryKeys.GET_PURCHASE_RECEIPT, { purchaseId }],
    queryFn: async () => await PurchaseService.getPurchaseReceipt(purchaseId)
  });

  /**
   * `RESOURCE_NOT_FOUND` aqui significa compra sem recibo — é permanente, e
   * oferecer "tentar de novo" para ele só frustra. Sai separado do erro de rede.
   */
  const isReceiptNotFound = getApiErrorCode(error) === ApiErrorCode.RESOURCE_NOT_FOUND;

  return {
    receipt: data,
    loadReceipt: refetch,
    isLoadingReceipt: isLoading,
    isRefetchingReceipt: isFetching,
    hasReceiptError: isError && !isReceiptNotFound,
    isReceiptNotFound,
    receiptError: error
  };
}
