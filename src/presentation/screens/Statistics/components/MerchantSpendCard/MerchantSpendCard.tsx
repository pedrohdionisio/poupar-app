import { AppText } from '@presentation/components/AppText/AppText';
import { CHART_AXIS_LABEL_STYLE } from '@shared/constants/chart';
import { COLORS } from '@shared/constants/colors';
import { Currency } from '@shared/utils/currency';
import { BarChart } from 'react-native-gifted-charts';
import { ChartCard } from '../ChartCard/ChartCard';
import type { IMerchantSpendCardProps } from './interfaces';

const CHART_HEIGHT = 140;
const BAR_WIDTH = 26;
const BAR_RADIUS = 8;
const INITIAL_SPACING = 6;
/** Folga acima da maior barra para caber o rótulo de valor. */
const TOP_HEADROOM = 1.25;

export function MerchantSpendCard({
  merchantSpends,
  caption,
  chartWidth
}: IMerchantSpendCardProps) {
  const maxAmount = Math.max(...merchantSpends.map(({ amount }) => amount));

  const data = merchantSpends.map(({ id, name, amount }) => {
    const isHighest = amount === maxAmount;

    return {
      key: id,
      value: amount,
      label: name,
      frontColor: isHighest ? COLORS.brand.dark : COLORS.brand.light,
      /** Só a maior barra ganha rótulo — as outras se leem por comparação. */
      topLabelComponent: isHighest
        ? () => (
            <AppText size='xs' weight='semibold' color='strong'>
              {Currency.formatCompact(amount)}
            </AppText>
          )
        : undefined
    };
  });

  const spacing =
    (chartWidth - INITIAL_SPACING - data.length * BAR_WIDTH) / Math.max(data.length, 1);

  return (
    <ChartCard title='Onde você mais gasta' caption={caption}>
      <BarChart
        data={data}
        width={chartWidth}
        height={CHART_HEIGHT}
        maxValue={maxAmount * TOP_HEADROOM}
        barWidth={BAR_WIDTH}
        spacing={spacing}
        initialSpacing={INITIAL_SPACING}
        barBorderTopLeftRadius={BAR_RADIUS}
        barBorderTopRightRadius={BAR_RADIUS}
        hideRules
        hideYAxisText
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={CHART_AXIS_LABEL_STYLE}
        disableScroll
      />
    </ChartCard>
  );
}
