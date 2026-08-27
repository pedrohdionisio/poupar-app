import { useQuery } from '@tanstack/react-query';
import { PurchaseQueryKeys } from '../../keys/PurchaseKeys';
import { PurchaseService } from '../../services/PurchaseService';
import type { IPurchase } from '../../types/Purchase';
import type {
  IListPurchasesResponse,
  IPurchaseResponse
} from '../../types/PurchaseTypes';
import type { IUseListPurchasesOptions } from './interfaces';

const CENTS_IN_ONE_REAL = 100;

/**
 * A API trabalha em centavos e chama o campo de `itemCount`. A tradução mora
 * aqui para que nenhum componente precise conhecer o formato da API.
 */
function toPurchase(purchase: IPurchaseResponse): IPurchase {
  return {
    id: purchase.id,
    merchantName: purchase.merchantName,
    purchasedAt: purchase.purchasedAt,
    itemsCount: purchase.itemCount,
    totalAmount: purchase.totalCents / CENTS_IN_ONE_REAL
  };
}

/**
 * Declarado fora do hook porque o React Query só reaproveita o resultado do
 * `select` quando a função mantém a mesma referência entre renders.
 */
function selectPurchases(purchases: IListPurchasesResponse): IPurchase[] {
  return purchases.map(toPurchase);
}

export function useListPurchases(params: IUseListPurchasesOptions = {}) {
  const { data, refetch, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [PurchaseQueryKeys.LIST_PURCHASES, params],
    queryFn: async () => await PurchaseService.listPurchases(params),
    select: selectPurchases
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
