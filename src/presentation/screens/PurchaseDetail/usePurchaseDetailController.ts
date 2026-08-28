import { getPurchaseErrorMessage } from '@data/modules/purchase/constants/purchaseErrorMessages';
import type { IPurchaseReceiptItem } from '@data/modules/purchase/types/Purchase';
import { useGetPurchaseReceipt } from '@data/modules/purchase/useCases/getPurchaseReceipt/useGetPurchaseReceipt';
import { useNavigation, useRoute } from '@react-navigation/native';
import type {
  AppStackNavigationProps,
  AppStackRouteProps
} from '@shared/navigation/AppStack';

const ERROR_FALLBACK = 'Não conseguimos carregar os itens desta compra.';

/** Referência estável para a lista não trocar de identidade a cada render. */
const EMPTY_ITEMS: IPurchaseReceiptItem[] = [];

export function usePurchaseDetailController() {
  const navigation = useNavigation<AppStackNavigationProps>();
  const { params } = useRoute<AppStackRouteProps<'PurchaseDetail'>>();

  const { purchase } = params;

  const {
    receipt,
    loadReceipt,
    isLoadingReceipt,
    isRefetchingReceipt,
    hasReceiptError,
    isReceiptNotFound,
    receiptError
  } = useGetPurchaseReceipt({ purchaseId: purchase.id });

  const items = receipt?.items ?? EMPTY_ITEMS;

  /**
   * A contagem só aparece com os itens em mãos: `purchase.itemsCount` vem do
   * param e afirmaria "12 itens" sobre um spinner ou sobre a mensagem de erro.
   */
  const itemsTitle =
    items.length > 0
      ? `${items.length} ${items.length === 1 ? 'item' : 'itens'}`
      : 'Itens';

  function handleBackPress() {
    navigation.goBack();
  }

  function handleRetry() {
    loadReceipt();
  }

  return {
    purchase,
    items,
    itemsTitle,
    isLoadingReceipt,
    isRefetchingReceipt,
    hasReceiptError,
    isReceiptNotFound,
    errorMessage: getPurchaseErrorMessage(receiptError, ERROR_FALLBACK),
    handleBackPress,
    handleRetry
  };
}
