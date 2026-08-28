import { Skeleton } from '@presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';

const RECENT_CARDS = [0, 1, 2];

const PLACEHOLDER_ROWS = [0, 1, 2, 3, 4];

/** Espelha o `RecentMerchantCard`: card de 160px com ícone e duas linhas. */
function RecentMerchantCardSkeleton() {
  return (
    <View className='w-40 gap-3 rounded-2xl bg-grays-100 p-4'>
      <Skeleton className='h-9 w-9' rounded='lg' />

      <View className='gap-1.5'>
        <Skeleton className='h-4 w-4/5' rounded='sm' />

        <Skeleton className='h-3 w-1/2' rounded='sm' />
      </View>
    </View>
  );
}

/** Espelha o `MerchantListItem`: ícone 44px, nome e a linha de meta dados. */
function MerchantListItemSkeleton() {
  return (
    <View className='flex-row items-center gap-3 py-4'>
      <Skeleton className='h-11 w-11' rounded='xl' />

      <View className='flex-1 gap-2'>
        <Skeleton className='h-4 w-3/5' rounded='sm' />

        <Skeleton className='h-3 w-4/5' rounded='sm' />
      </View>

      <Skeleton className='h-9 w-9' rounded='lg' />
    </View>
  );
}

export function MerchantsSkeleton() {
  return (
    <View
      accessible
      accessibilityRole='progressbar'
      accessibilityLabel='Carregando seus estabelecimentos'
      className='px-5'
    >
      <Skeleton className='mb-3 h-6 w-56' rounded='sm' />

      <View className='flex-row gap-3'>
        {RECENT_CARDS.map((card) => (
          <RecentMerchantCardSkeleton key={card} />
        ))}
      </View>

      <Skeleton className='mt-8 mb-1 h-6 w-64' rounded='sm' />

      {PLACEHOLDER_ROWS.map((row, index) => (
        <View key={row}>
          {index > 0 && <View className='h-px bg-grays-200' />}

          <MerchantListItemSkeleton />
        </View>
      ))}
    </View>
  );
}
