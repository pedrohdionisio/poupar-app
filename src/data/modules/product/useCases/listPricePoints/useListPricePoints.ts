import { useQuery } from '@tanstack/react-query';
import { ProductQueryKeys } from '../../keys/ProductKeys';
import { ProductService } from '../../services/ProductService';
import type { IUseListPricePointsOptions } from './interfaces';

export function useListPricePoints({ productKey }: IUseListPricePointsOptions) {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: [ProductQueryKeys.LIST_PRICE_POINTS, { productKey }],
    queryFn: async () =>
      await ProductService.listPricePoints({ productKey: productKey ?? '' }),
    /** A rota exige `productKey`: sem ele a chamada só voltaria VALIDATION. */
    enabled: !!productKey
  });

  return {
    pricePoints: data,
    loadPricePoints: refetch,
    isLoadingPricePoints: isLoading,
    hasPricePointsError: isError
  };
}
