import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { DEFAULT_PERIOD_ID, PERIOD_CAPTIONS, PERIOD_OPTIONS } from './constants';
import type { TPeriodId } from './interfaces';
import {
  buildMockCategorySpends,
  buildMockMerchantSpends,
  MOCK_STATISTICS_BY_PERIOD
} from './mocks';

/** Padding horizontal da tela (`px-5`) + do card (`p-5`), dos dois lados. */
const CHART_HORIZONTAL_INSET = 80;

/** Respiro entre o último card e a tab bar flutuante. */
const CONTENT_BOTTOM_SPACING = 24;

export function useStatisticsController() {
  const { width } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();

  const [selectedPeriodId, setSelectedPeriodId] = useState<TPeriodId>(DEFAULT_PERIOD_ID);

  // TODO: trocar os mocks pelos dados reais, consultados por período.
  const { spendSeries, previousTotalAmount, priceTrend } =
    MOCK_STATISTICS_BY_PERIOD[selectedPeriodId];

  const totalAmount = spendSeries.reduce((total, { amount }) => total + amount, 0);

  const categorySpends = buildMockCategorySpends(totalAmount);
  const merchantSpends = buildMockMerchantSpends(totalAmount);

  const totalChange =
    previousTotalAmount > 0
      ? (totalAmount - previousTotalAmount) / previousTotalAmount
      : 0;

  function handlePeriodChange(periodId: TPeriodId) {
    setSelectedPeriodId(periodId);
  }

  return {
    periodOptions: PERIOD_OPTIONS,
    selectedPeriodId,
    periodCaption: PERIOD_CAPTIONS[selectedPeriodId],
    spendSeries,
    categorySpends,
    merchantSpends,
    priceTrend,
    totalAmount,
    totalChange,
    chartWidth: width - CHART_HORIZONTAL_INSET,
    contentBottomPadding: tabBarHeight + CONTENT_BOTTOM_SPACING,
    handlePeriodChange
  };
}
