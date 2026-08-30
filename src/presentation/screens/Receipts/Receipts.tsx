import { View } from 'react-native';
import { ReceiptsContent } from './components/ReceiptsContent/ReceiptsContent';
import { ReceiptsHeader } from './components/ReceiptsHeader/ReceiptsHeader';
import { useReceiptsController } from './useReceiptsController';

export function Receipts() {
  const {
    averageAmount,
    receipts,
    isLoadingPurchases,
    isRefetchingPurchases,
    hasPurchasesError,
    errorMessage,
    listBottomPadding,
    handleReceiptPress,
    handleRetry
  } = useReceiptsController();

  return (
    <View className='flex-1'>
      <ReceiptsHeader />

      <ReceiptsContent
        receipts={receipts}
        averageAmount={averageAmount}
        isLoading={isLoadingPurchases}
        isRetrying={isRefetchingPurchases}
        hasError={hasPurchasesError}
        errorMessage={errorMessage}
        bottomPadding={listBottomPadding}
        onReceiptPress={handleReceiptPress}
        onRetry={handleRetry}
      />
    </View>
  );
}
