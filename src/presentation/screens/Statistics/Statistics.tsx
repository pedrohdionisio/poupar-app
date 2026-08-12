import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import { ScrollView, View } from 'react-native';
import { CategorySplitCard } from './components/CategorySplitCard/CategorySplitCard';
import { MerchantSpendCard } from './components/MerchantSpendCard/MerchantSpendCard';
import { PeriodFilter } from './components/PeriodFilter/PeriodFilter';
import { PriceTrendCard } from './components/PriceTrendCard/PriceTrendCard';
import { SpendTrendCard } from './components/SpendTrendCard/SpendTrendCard';
import { StatisticsHeader } from './components/StatisticsHeader/StatisticsHeader';
import { useStatisticsController } from './useStatisticsController';

export function Statistics() {
  const {
    periodOptions,
    selectedPeriodId,
    periodCaption,
    spendSeries,
    categorySpends,
    merchantSpends,
    priceTrend,
    totalAmount,
    totalChange,
    chartWidth,
    contentBottomPadding,
    handlePeriodChange
  } = useStatisticsController();

  return (
    <ScreenLayout edges={['top']}>
      <ScrollView
        className='px-5'
        contentContainerStyle={{ paddingBottom: contentBottomPadding }}
        showsVerticalScrollIndicator={false}
      >
        <PeriodFilter
          options={periodOptions}
          selectedId={selectedPeriodId}
          onSelect={handlePeriodChange}
        />

        <StatisticsHeader periodCaption={periodCaption} />

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

          <MerchantSpendCard
            merchantSpends={merchantSpends}
            caption={periodCaption}
            chartWidth={chartWidth}
          />

          <PriceTrendCard
            priceTrend={priceTrend}
            caption={periodCaption}
            chartWidth={chartWidth}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
