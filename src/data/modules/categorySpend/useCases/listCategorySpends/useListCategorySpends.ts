import { useQuery } from '@tanstack/react-query';
import { CategorySpendQueryKeys } from '../../keys/CategorySpendKeys';
import { CategorySpendService } from '../../services/CategorySpendService';
import type { IUseListCategorySpendsOptions } from './interfaces';

export function useListCategorySpends(params: IUseListCategorySpendsOptions) {
  const { data, refetch, isLoading, isFetching, isError } = useQuery({
    queryKey: [CategorySpendQueryKeys.LIST_CATEGORY_SPENDS, params],
    queryFn: async () => await CategorySpendService.listCategorySpends(params)
  });

  return {
    categorySpends: data,
    loadCategorySpends: refetch,
    isLoadingCategorySpends: isLoading,
    isRefetchingCategorySpends: isFetching,
    hasCategorySpendsError: isError
  };
}
