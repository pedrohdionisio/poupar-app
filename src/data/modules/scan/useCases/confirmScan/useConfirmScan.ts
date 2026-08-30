import { MerchantQueryKeys } from '@data/modules/merchant/keys/MerchantKeys';
import { ProductQueryKeys } from '@data/modules/product/keys/ProductKeys';
import { PurchaseQueryKeys } from '@data/modules/purchase/keys/PurchaseKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ScanMutationKeys } from '../../keys/ScanKeys';
import { ScanService } from '../../services/ScanService';
import type { IConfirmScanPayload } from '../../types/Scan';

export function useConfirmScan() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [ScanMutationKeys.CONFIRM_SCAN],
    mutationFn: async (payload: IConfirmScanPayload) =>
      await ScanService.confirmScan(payload),
    /**
     * Confirmar um scan importa uma compra: invalida exatamente o mesmo que a
     * importação manual — lista de compras, agregados por estabelecimento e
     * catálogo de produtos com seus preços.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PurchaseQueryKeys.LIST_PURCHASES] });
      queryClient.invalidateQueries({
        queryKey: [MerchantQueryKeys.LIST_ACCOUNT_MERCHANTS]
      });
      queryClient.invalidateQueries({
        queryKey: [ProductQueryKeys.LIST_ACCOUNT_PRODUCTS]
      });
      queryClient.invalidateQueries({ queryKey: [ProductQueryKeys.LIST_PRICE_POINTS] });
    }
  });

  return {
    confirmScan: mutateAsync,
    isConfirmingScan: isPending
  };
}
