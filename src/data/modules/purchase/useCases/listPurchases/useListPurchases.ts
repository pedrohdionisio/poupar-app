import { useQuery } from '@tanstack/react-query';
import { PurchaseQueryKeys } from '../../keys/PurchaseKeys';
import { PurchaseService } from '../../services/PurchaseService';
import type { IUseListPurchasesOptions } from './interfaces';

export function useListPurchases(params: IUseListPurchasesOptions = {}) {
  const { data, refetch, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [PurchaseQueryKeys.LIST_PURCHASES, params],
    queryFn: async () => await PurchaseService.listPurchases(params)
  });

  return {
    purchases: data,
    loadPurchases: refetch,
    isLoadingPurchases: isLoading,
    isRefetchingPurchases: isFetching,
    hasPurchasesError: isError,
    purchasesError: error
  };
}
