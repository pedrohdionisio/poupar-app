import { Skeleton } from '@presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';

const PLACEHOLDER_ROWS = [0, 1, 2, 3, 4];

/** Espelha o `ReceiptListItem`: ícone quadrado, nome e a linha de meta dados. */
function ReceiptListItemSkeleton() {
  return (
    <View className='flex-row items-center gap-3 py-4'>
      <Skeleton className='h-11 w-11' rounded='lg' />

      <View className='flex-1 gap-2'>
        <Skeleton className='h-4 w-3/5' rounded='sm' />

        <Skeleton className='h-3 w-4/5' rounded='sm' />
      </View>
    </View>
  );
}

export function ReceiptsSkeleton() {
  return (
    <View
      accessible
      accessibilityRole='progressbar'
      accessibilityLabel='Carregando suas compras'
      className='px-5'
    >
      <Skeleton className='h-28 w-full' rounded='xl' />

      <Skeleton className='mt-8 mb-1 h-6 w-48' rounded='sm' />

      {PLACEHOLDER_ROWS.map((row, index) => (
        <View key={row}>
          {index > 0 && <View className='h-px bg-grays-200' />}

          <ReceiptListItemSkeleton />
        </View>
      ))}
    </View>
  );
}
