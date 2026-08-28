import { useQuery } from '@tanstack/react-query';
import { MerchantQueryKeys } from '../../keys/MerchantKeys';
import { MerchantService } from '../../services/MerchantService';

export function useListAccountMerchants() {
  const { data, refetch, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [MerchantQueryKeys.LIST_ACCOUNT_MERCHANTS],
    queryFn: MerchantService.listAccountMerchants
  });

  return {
    merchants: data,
    loadMerchants: refetch,
    isLoadingMerchants: isLoading,
    isRefetchingMerchants: isFetching,
    hasMerchantsError: isError,
    merchantsError: error
  };
}
