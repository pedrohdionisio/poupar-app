import { AppText } from '@presentation/components/AppText/AppText';
import { View } from 'react-native';
import { PurchaseDetailHeader } from './components/PurchaseDetailHeader/PurchaseDetailHeader';
import { PurchaseItemsList } from './components/PurchaseItemsList/PurchaseItemsList';
import { PurchaseSummary } from './components/PurchaseSummary/PurchaseSummary';
import { usePurchaseDetailController } from './usePurchaseDetailController';

export function PurchaseDetail() {
  const {
    purchase,
    items,
    itemsTitle,
    isLoadingReceipt,
    isRefetchingReceipt,
    hasReceiptError,
    isReceiptNotFound,
    errorMessage,
    handleBackPress,
    handleRetry
  } = usePurchaseDetailController();

  return (
    <View className='flex-1'>
      <PurchaseDetailHeader onBackPress={handleBackPress} />

      <PurchaseItemsList
        items={items}
        isLoading={isLoadingReceipt}
        isRetrying={isRefetchingReceipt}
        hasError={hasReceiptError}
        isReceiptNotFound={isReceiptNotFound}
        errorMessage={errorMessage}
        onRetry={handleRetry}
        ListHeaderComponent={
          <>
            <PurchaseSummary purchase={purchase} />

            <AppText variant='title' size='lg' color='strong' className='mt-8 mb-1'>
              {itemsTitle}
            </AppText>
          </>
        }
      />
    </View>
  );
}
