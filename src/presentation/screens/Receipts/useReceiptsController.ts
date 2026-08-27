import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import type { IReceipt } from './interfaces';
import { MOCK_AVERAGE_AMOUNT, MOCK_RECEIPTS } from './mocks';

/** Respiro entre o último item da lista e a tab bar flutuante. */
const LIST_BOTTOM_SPACING = 24;

export function useReceiptsController() {
  const tabBarHeight = useBottomTabBarHeight();

  // TODO: trocar os mocks pelos dados reais (sessão + módulo de dados de notas).
  const averageAmount = MOCK_AVERAGE_AMOUNT;
  const receipts = MOCK_RECEIPTS;

  function handleSearchPress() {
    // TODO: abrir a busca de notas.
  }

  function handleMenuPress() {
    // TODO: abrir o menu.
  }

  function handleReceiptPress(_receipt: IReceipt) {
    // TODO: navegar para o detalhe da nota.
  }

  return {
    averageAmount,
    receipts,
    listBottomPadding: tabBarHeight + LIST_BOTTOM_SPACING,
    handleSearchPress,
    handleMenuPress,
    handleReceiptPress
  };
}
