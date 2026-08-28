import { Skeleton } from '@presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';

const PLACEHOLDER_CARDS = [0, 1, 2];

/** Espelha o `ChartCard`: título, legenda e a área do gráfico. */
function ChartCardSkeleton() {
  return (
    <View className='gap-5 rounded-2xl border border-grays-200 p-5'>
      <View className='flex-row items-center justify-between gap-3'>
        <Skeleton className='h-5 w-40' rounded='sm' />

        <Skeleton className='h-3 w-24' rounded='sm' />
      </View>

      <Skeleton className='h-32 w-full' rounded='lg' />
    </View>
  );
}

export function StatisticsSkeleton() {
  return (
    <View
      accessible
      accessibilityRole='progressbar'
      accessibilityLabel='Carregando suas estatísticas'
      className='gap-4'
    >
      {PLACEHOLDER_CARDS.map((card) => (
        <ChartCardSkeleton key={card} />
      ))}
    </View>
  );
}
