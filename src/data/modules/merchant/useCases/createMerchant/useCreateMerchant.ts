import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MerchantMutationKeys, MerchantQueryKeys } from '../../keys/MerchantKeys';
import { MerchantService } from '../../services/MerchantService';
import type { ICreateMerchantPayload } from '../../types/Merchant';

export function useCreateMerchant() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MerchantMutationKeys.CREATE_MERCHANT],
    mutationFn: async (payload: ICreateMerchantPayload) =>
      await MerchantService.createMerchant(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MerchantQueryKeys.LIST_MERCHANTS] });
    }
  });

  return {
    createMerchant: mutateAsync,
    isCreatingMerchant: isPending
  };
}
