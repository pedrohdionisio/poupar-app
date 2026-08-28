import { Skeleton } from '@presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';

const PLACEHOLDER_ROWS = [0, 1, 2, 3, 4, 5];

/** Espelha o `PurchaseItemRow`: descrição, quantidade × preço, e o total à direita. */
function PurchaseItemRowSkeleton() {
  return (
    <View className='flex-row items-start justify-between gap-3 py-4'>
      <View className='flex-1 gap-2'>
        <Skeleton className='h-4 w-3/4' rounded='sm' />

        <Skeleton className='h-3 w-2/5' rounded='sm' />
      </View>

      <Skeleton className='h-4 w-16' rounded='sm' />
    </View>
  );
}

export function PurchaseItemsSkeleton() {
  return (
    <View
      accessible
      accessibilityRole='progressbar'
      accessibilityLabel='Carregando itens'
    >
      {PLACEHOLDER_ROWS.map((row, index) => (
        <View key={row}>
          {index > 0 && <View className='h-px bg-grays-200' />}

          <PurchaseItemRowSkeleton />
        </View>
      ))}
    </View>
  );
}
