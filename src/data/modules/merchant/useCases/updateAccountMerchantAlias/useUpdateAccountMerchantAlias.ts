import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MerchantMutationKeys, MerchantQueryKeys } from '../../keys/MerchantKeys';
import { MerchantService } from '../../services/MerchantService';
import type { IUpdateAccountMerchantAliasPayload } from '../../types/MerchantTypes';

export function useUpdateAccountMerchantAlias() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MerchantMutationKeys.UPDATE_ACCOUNT_MERCHANT_ALIAS],
    mutationFn: async (payload: IUpdateAccountMerchantAliasPayload) =>
      await MerchantService.updateAccountMerchantAlias(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MerchantQueryKeys.LIST_ACCOUNT_MERCHANTS]
      });
    }
  });

  return {
    updateAlias: mutateAsync,
    isUpdatingAlias: isPending
  };
}
