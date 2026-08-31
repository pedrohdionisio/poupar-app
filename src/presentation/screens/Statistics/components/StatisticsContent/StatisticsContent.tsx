import { ErrorState } from '@presentation/components/ErrorState/ErrorState';
import { View } from 'react-native';
import { CategorySplitCard } from '../CategorySplitCard/CategorySplitCard';
import { MerchantSpendCard } from '../MerchantSpendCard/MerchantSpendCard';
import { PriceTrendCard } from '../PriceTrendCard/PriceTrendCard';
import { SpendTrendCard } from '../SpendTrendCard/SpendTrendCard';
import { StatisticsEmpty } from '../StatisticsEmpty/StatisticsEmpty';
import { StatisticsSkeleton } from '../StatisticsSkeleton/StatisticsSkeleton';
import type { IStatisticsContentProps } from './interfaces';

/** Isola os três estados da tela para o JSX da screen ficar sem ternário aninhado. */
export function StatisticsContent({
  spendSeries,
  categorySpends,
  merchantSpends,
  priceTrend,
  totalAmount,
  totalChange,
  periodCaption,
  chartWidth,
  isLoading,
  isRetrying,
  hasError,
  hasStatistics,
  errorMessage,
  onRetry,
  onProductPress
}: IStatisticsContentProps) {
  if (isLoading) {
    return <StatisticsSkeleton />;
  }

  if (hasError) {
    return (
      <ErrorState
        title='Não conseguimos carregar suas estatísticas'
        message={errorMessage}
        isRetrying={isRetrying}
        onRetry={onRetry}
      />
    );
  }

  if (!hasStatistics) {
    return <StatisticsEmpty periodCaption={periodCaption} />;
  }

  return (
    <View className='gap-4'>
      <SpendTrendCard
        spendSeries={spendSeries}
        totalAmount={totalAmount}
        change={totalChange}
        caption={periodCaption}
        chartWidth={chartWidth}
      />

      <CategorySplitCard
        categorySpends={categorySpends}
        totalAmount={totalAmount}
        caption={periodCaption}
      />

      <MerchantSpendCard merchantSpends={merchantSpends} caption={periodCaption} />

      {/* `null` só quando a conta ainda não tem produto nenhum: aí não há o que
          selecionar, e o card não teria nem título. Poucas compras no período
          é caso do próprio card, que precisa manter o seletor à mão. */}
      {priceTrend && (
        <PriceTrendCard
          priceTrend={priceTrend}
          caption={periodCaption}
          chartWidth={chartWidth}
          onProductPress={onProductPress}
        />
      )}
    </View>
  );
}
