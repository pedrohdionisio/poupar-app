import { MerchantQueryKeys } from '@data/modules/merchant/keys/MerchantKeys';
import { ProductQueryKeys } from '@data/modules/product/keys/ProductKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PurchaseMutationKeys, PurchaseQueryKeys } from '../../keys/PurchaseKeys';
import { PurchaseService } from '../../services/PurchaseService';
import type { IImportPurchasePayload } from '../../types/Purchase';

export function useImportPurchase() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [PurchaseMutationKeys.IMPORT_PURCHASE],
    mutationFn: async (payload: IImportPurchasePayload) =>
      await PurchaseService.importPurchase(payload),
    /**
     * Uma compra nova mexe em tudo que é derivado dela: a lista de compras, os
     * agregados por estabelecimento e o catálogo de produtos com seus preços.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PurchaseQueryKeys.LIST_PURCHASES] });
      queryClient.invalidateQueries({
        queryKey: [MerchantQueryKeys.LIST_MERCHANTS]
      });
      queryClient.invalidateQueries({
        queryKey: [ProductQueryKeys.LIST_ACCOUNT_PRODUCTS]
      });
      queryClient.invalidateQueries({
        queryKey: [ProductQueryKeys.LIST_PRICE_POINTS]
      });
    }
  });

  return {
    importPurchase: mutateAsync,
    isImportingPurchase: isPending
  };
}
