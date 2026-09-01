import { ScrollView, View } from 'react-native';
import { PeriodFilter } from './components/PeriodFilter/PeriodFilter';
import { ProductPickerBottomSheet } from './components/ProductPickerBottomSheet/ProductPickerBottomSheet';
import { StatisticsContent } from './components/StatisticsContent/StatisticsContent';
import { StatisticsHeader } from './components/StatisticsHeader/StatisticsHeader';
import { useStatisticsController } from './useStatisticsController';

export function Statistics() {
  const {
    productPickerRef,
    selectedProductKey,
    periodOptions,
    selectedPeriodId,
    periodCaption,
    spendSeries,
    categorySlices,
    categoryTotalAmount,
    categoryCaption,
    hasCategoryError,
    isRetryingCategory,
    merchantSpends,
    priceTrend,
    totalAmount,
    totalChange,
    isLoadingStatistics,
    isRetrying,
    hasStatisticsError,
    hasStatistics,
    errorMessage,
    chartWidth,
    contentBottomPadding,
    handlePeriodChange,
    handleProductPress,
    handleProductSelect,
    handleRetry
  } = useStatisticsController();

  return (
    <View className='flex-1'>
      <ScrollView
        className='px-5'
        /** `flexGrow` dá altura ao conteúdo: sem ele o `flex-1` do estado de
         * erro não estica e a mensagem fica colada no cabeçalho. */
        contentContainerStyle={{ flexGrow: 1, paddingBottom: contentBottomPadding }}
        showsVerticalScrollIndicator={false}
      >
        <PeriodFilter
          options={periodOptions}
          selectedId={selectedPeriodId}
          onSelect={handlePeriodChange}
        />

        <StatisticsHeader periodCaption={periodCaption} />

        <StatisticsContent
          spendSeries={spendSeries}
          categorySlices={categorySlices}
          categoryTotalAmount={categoryTotalAmount}
          categoryCaption={categoryCaption}
          hasCategoryError={hasCategoryError}
          isRetryingCategory={isRetryingCategory}
          merchantSpends={merchantSpends}
          priceTrend={priceTrend}
          totalAmount={totalAmount}
          totalChange={totalChange}
          periodCaption={periodCaption}
          chartWidth={chartWidth}
          isLoading={isLoadingStatistics}
          isRetrying={isRetrying}
          hasError={hasStatisticsError}
          hasStatistics={hasStatistics}
          errorMessage={errorMessage}
          onRetry={handleRetry}
          onProductPress={handleProductPress}
        />
      </ScrollView>

      <ProductPickerBottomSheet
        ref={productPickerRef}
        selectedProductKey={selectedProductKey}
        onSelect={handleProductSelect}
      />
    </View>
  );
}
