import { PurchaseQueryKeys } from '@data/modules/purchase/keys/PurchaseKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MerchantMutationKeys, MerchantQueryKeys } from '../../keys/MerchantKeys';
import { MerchantService } from '../../services/MerchantService';
import type { IUpdateMerchantPayload } from '../../types/Merchant';

export function useUpdateMerchant() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MerchantMutationKeys.UPDATE_MERCHANT],
    mutationFn: async (payload: IUpdateMerchantPayload) =>
      await MerchantService.updateMerchant(payload),
    /**
     * A compra guarda `merchantName` e `category` copiados do estabelecimento
     * no momento da importação: renomear invalida também a lista de compras,
     * senão o nome antigo continua na tela até o cache expirar.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MerchantQueryKeys.LIST_MERCHANTS] });
      queryClient.invalidateQueries({ queryKey: [PurchaseQueryKeys.LIST_PURCHASES] });
    }
  });

  return {
    updateMerchant: mutateAsync,
    isUpdatingMerchant: isPending
  };
}
