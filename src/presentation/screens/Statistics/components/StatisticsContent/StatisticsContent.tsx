import { ErrorState } from '@presentation/components/ErrorState/ErrorState';
import { View } from 'react-native';
import { CategorySplitCard } from '../CategorySplitCard/CategorySplitCard';
import { MerchantSpendCard } from '../MerchantSpendCard/MerchantSpendCard';
import { PriceTrendCard } from '../PriceTrendCard/PriceTrendCard';
import { SpendTrendCard } from '../SpendTrendCard/SpendTrendCard';
import { StatisticsEmpty } from '../StatisticsEmpty/StatisticsEmpty';
import { StatisticsSkeleton } from '../StatisticsSkeleton/StatisticsSkeleton';
import type { IStatisticsContentProps } from './interfaces';

/** O histórico de preço é vitalício, não recortado pelo filtro de período. */
const PRICE_TREND_CAPTION = 'histórico';

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
  onRetry
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

      {/* Menos de dois pontos de preço não formam linha. */}
      {priceTrend && (
        <PriceTrendCard
          priceTrend={priceTrend}
          caption={PRICE_TREND_CAPTION}
          chartWidth={chartWidth}
        />
      )}
    </View>
  );
}
