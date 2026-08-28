import { AppText } from '@presentation/components/AppText/AppText';
import { ErrorState } from '@presentation/components/ErrorState/ErrorState';
import { ReceiptsList } from '../ReceiptsList/ReceiptsList';
import { ReceiptsSkeleton } from '../ReceiptsSkeleton/ReceiptsSkeleton';
import { ReceiptsSummaryCard } from '../ReceiptsSummaryCard/ReceiptsSummaryCard';
import type { IReceiptsContentProps } from './interfaces';

/** Isola os três estados da tela para o JSX da screen ficar sem ternário aninhado. */
export function ReceiptsContent({
  receipts,
  averageAmount,
  isLoading,
  isRetrying,
  hasError,
  errorMessage,
  bottomPadding,
  onReceiptPress,
  onRetry
}: IReceiptsContentProps) {
  if (isLoading) {
    return <ReceiptsSkeleton />;
  }

  if (hasError) {
    return (
      <ErrorState
        title='Não conseguimos carregar suas compras'
        message={errorMessage}
        isRetrying={isRetrying}
        onRetry={onRetry}
      />
    );
  }

  const hasReceipts = receipts.length > 0;

  return (
    <ReceiptsList
      receipts={receipts}
      bottomPadding={bottomPadding}
      onReceiptPress={onReceiptPress}
      ListHeaderComponent={
        /** Sem compra não há média: o card afirmaria "R$ 0,00" sobre nada. */
        hasReceipts ? (
          <>
            <ReceiptsSummaryCard averageAmount={averageAmount} />

            <AppText variant='title' size='lg' color='strong' className='mt-8 mb-1'>
              Suas últimas compras
            </AppText>
          </>
        ) : undefined
      }
    />
  );
}
