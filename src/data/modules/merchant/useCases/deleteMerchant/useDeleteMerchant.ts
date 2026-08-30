import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MerchantMutationKeys, MerchantQueryKeys } from '../../keys/MerchantKeys';
import { MerchantService } from '../../services/MerchantService';

export function useDeleteMerchant() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MerchantMutationKeys.DELETE_MERCHANT],
    mutationFn: async (merchantId: string) =>
      await MerchantService.deleteMerchant(merchantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MerchantQueryKeys.LIST_MERCHANTS] });
    }
  });

  return {
    deleteMerchant: mutateAsync,
    isDeletingMerchant: isPending
  };
}
