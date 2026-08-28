import { useQuery } from '@tanstack/react-query';
import { ProductQueryKeys } from '../../keys/ProductKeys';
import { ProductService } from '../../services/ProductService';

export function useListAccountProducts() {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: [ProductQueryKeys.LIST_ACCOUNT_PRODUCTS],
    queryFn: ProductService.listAccountProducts
  });

  return {
    products: data,
    loadProducts: refetch,
    isLoadingProducts: isLoading,
    hasProductsError: isError
  };
}
