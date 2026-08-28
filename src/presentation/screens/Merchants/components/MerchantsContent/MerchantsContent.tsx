import { AppText } from '@presentation/components/AppText/AppText';
import { ErrorState } from '@presentation/components/ErrorState/ErrorState';
import { cn } from '@shared/utils/cn';
import { MerchantsList } from '../MerchantsList/MerchantsList';
import { MerchantsSkeleton } from '../MerchantsSkeleton/MerchantsSkeleton';
import { RecentMerchants } from '../RecentMerchants/RecentMerchants';
import type { IMerchantsContentProps } from './interfaces';

/** Isola os três estados da tela para o JSX da screen ficar sem ternário aninhado. */
export function MerchantsContent({
  recentMerchants,
  filteredMerchants,
  searchTerm,
  hasRecentMerchants,
  hasMerchants,
  isLoading,
  isRetrying,
  hasError,
  errorMessage,
  bottomPadding,
  onEditPress,
  onRetry
}: IMerchantsContentProps) {
  if (isLoading) {
    return <MerchantsSkeleton />;
  }

  if (hasError) {
    return (
      <ErrorState
        title='Não conseguimos carregar seus estabelecimentos'
        message={errorMessage}
        isRetrying={isRetrying}
        onRetry={onRetry}
      />
    );
  }

  return (
    <MerchantsList
      merchants={filteredMerchants}
      searchTerm={searchTerm}
      bottomPadding={bottomPadding}
      onEditPress={onEditPress}
      ListHeaderComponent={
        /** Sem nada na lista, o cabeçalho anunciaria uma seção que não existe. */
        hasMerchants ? (
          <>
            {hasRecentMerchants && (
              <RecentMerchants
                merchants={recentMerchants}
                onMerchantPress={onEditPress}
              />
            )}

            <AppText
              variant='title'
              size='lg'
              color='strong'
              className={cn('mb-1', hasRecentMerchants && 'mt-8')}
            >
              Todos os estabelecimentos
            </AppText>
          </>
        ) : undefined
      }
    />
  );
}
