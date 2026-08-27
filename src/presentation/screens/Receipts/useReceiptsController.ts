import { getPurchaseErrorMessage } from '@data/modules/purchase/constants/purchaseErrorMessages';
import type { IPurchase } from '@data/modules/purchase/types/Purchase';
import { useListPurchases } from '@data/modules/purchase/useCases/listPurchases/useListPurchases';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useMemo } from 'react';
import { getAverageAmount } from './utils';

/** Respiro entre o último item da lista e a tab bar flutuante. */
const LIST_BOTTOM_SPACING = 24;

/**
 * A API não expõe agregado de gastos, então a média sai da própria lista. O
 * limite é o universo dela: a média é exatamente a das compras exibidas.
 */
const PURCHASES_LIMIT = 20;

const ERROR_FALLBACK = 'Verifique sua conexão e tente de novo.';

/** Referência estável para a lista não trocar de identidade a cada render. */
const EMPTY_PURCHASES: IPurchase[] = [];

export function useReceiptsController() {
  const tabBarHeight = useBottomTabBarHeight();

  const {
    purchases,
    loadPurchases,
    isLoadingPurchases,
    isRefetchingPurchases,
    hasPurchasesError,
    purchasesError
  } = useListPurchases({ limit: PURCHASES_LIMIT });

  const receipts = purchases ?? EMPTY_PURCHASES;

  const averageAmount = useMemo(() => getAverageAmount(receipts), [receipts]);

  function handleReceiptPress(_receipt: IPurchase) {
    // TODO: navegar para o detalhe da nota.
  }

  function handleRetry() {
    loadPurchases();
  }

  return {
    averageAmount,
    receipts,
    isLoadingPurchases,
    isRefetchingPurchases,
    hasPurchasesError,
    errorMessage: getPurchaseErrorMessage(purchasesError, ERROR_FALLBACK),
    listBottomPadding: tabBarHeight + LIST_BOTTOM_SPACING,
    handleReceiptPress,
    handleRetry
  };
}
