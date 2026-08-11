import { AppText } from '@presentation/components/AppText/AppText';
import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import { ReceiptsHeader } from './components/ReceiptsHeader/ReceiptsHeader';
import { ReceiptsList } from './components/ReceiptsList/ReceiptsList';
import { ReceiptsSummaryCard } from './components/ReceiptsSummaryCard/ReceiptsSummaryCard';
import { useReceiptsController } from './useReceiptsController';

export function Receipts() {
  const {
    userName,
    averageAmount,
    receipts,
    listBottomPadding,
    handleSearchPress,
    handleMenuPress,
    handleReceiptPress
  } = useReceiptsController();

  return (
    <ScreenLayout edges={['top']}>
      <ReceiptsHeader
        userName={userName}
        onSearchPress={handleSearchPress}
        onMenuPress={handleMenuPress}
      />

      <ReceiptsList
        receipts={receipts}
        bottomPadding={listBottomPadding}
        onReceiptPress={handleReceiptPress}
        ListHeaderComponent={
          <>
            <ReceiptsSummaryCard averageAmount={averageAmount} />

            <AppText variant='title' size='lg' color='strong' className='mt-8 mb-1'>
              Suas últimas compras
            </AppText>
          </>
        }
      />
    </ScreenLayout>
  );
}
