import { AppText } from '@presentation/components/AppText/AppText';
import { CHART_AXIS_LABEL_STYLE, CHART_LINE } from '@shared/constants/chart';
import { COLORS } from '@shared/constants/colors';
import { Currency } from '@shared/utils/currency';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { ChartCard } from '../ChartCard/ChartCard';
import { TrendBadge } from '../TrendBadge/TrendBadge';
import type { ISpendTrendCardProps } from './interfaces';

const CHART_HEIGHT = 130;
const EDGE_SPACING = 4;
/** Folga acima do maior ponto para o traço não encostar no topo da área. */
const TOP_HEADROOM = 1.15;

export function SpendTrendCard({
  spendSeries,
  totalAmount,
  change,
  caption,
  chartWidth
}: ISpendTrendCardProps) {
  const data = spendSeries.map(({ label, amount }) => ({
    value: amount,
    label
  }));

  const maxAmount = Math.max(...spendSeries.map(({ amount }) => amount));

  const spacing = (chartWidth - EDGE_SPACING * 2) / Math.max(data.length - 1, 1);

  return (
    <ChartCard title='Evolução do gasto' caption={caption}>
      <View className='flex-row items-center gap-3'>
        <AppText variant='title' size='2xl' weight='bold' color='strong'>
          {Currency.format(totalAmount)}
        </AppText>

        {change !== null && <TrendBadge change={change} />}
      </View>

      <LineChart
        data={data}
        width={chartWidth}
        height={CHART_HEIGHT}
        maxValue={maxAmount * TOP_HEADROOM}
        spacing={spacing}
        initialSpacing={EDGE_SPACING}
        endSpacing={EDGE_SPACING}
        areaChart
        curved
        curvature={0.2}
        thickness={CHART_LINE.thickness}
        color={COLORS.brand.main}
        startFillColor={COLORS.brand.light}
        endFillColor={COLORS.white}
        startOpacity={0.28}
        endOpacity={0}
        hideDataPoints
        hideRules
        hideYAxisText
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={CHART_AXIS_LABEL_STYLE}
        disableScroll
        adjustToWidth
      />
    </ChartCard>
  );
}
