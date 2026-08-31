import { AppText } from '@presentation/components/AppText/AppText';
import { CHART_AXIS_LABEL_STYLE, CHART_LINE } from '@shared/constants/chart';
import { COLORS } from '@shared/constants/colors';
import { Currency } from '@shared/utils/currency';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { ChartCard } from '../ChartCard/ChartCard';
import type { IPriceTrendCardProps } from './interfaces';

const CHART_HEIGHT = 90;
const INITIAL_SPACING = 4;
/** Espaço à direita para o ponto final não ser cortado pela borda do gráfico. */
const END_SPACING = 10;
/**
 * A faixa de preço costuma ser estreita (R$ 15 a R$ 19). Sem recortar a escala
 * em volta dela, a linha ficaria praticamente reta.
 */
const RANGE_PADDING_RATIO = 0.4;

/** Uma compra só não é comparação: não há de onde traçar a linha. */
const MIN_POINTS = 2;

export function PriceTrendCard({
  priceTrend,
  caption,
  chartWidth,
  onProductPress
}: IPriceTrendCardProps) {
  const { productName, points } = priceTrend;

  if (points.length < MIN_POINTS) {
    return (
      <ChartCard
        title={productName}
        caption={caption}
        onTitlePress={onProductPress}
        titleAccessibilityLabel={`Trocar o produto, hoje ${productName}`}
      >
        <AppText size='sm' color='muted'>
          {points.length === 0
            ? `Você não comprou este item nos ${caption}.`
            : `Você comprou este item uma vez nos ${caption} — não há com o que comparar o preço.`}{' '}
          Escolha outro produto no título ou amplie o período.
        </AppText>
      </ChartCard>
    );
  }

  const prices = points.map(({ price }) => price);

  const firstPrice = prices.at(0) ?? 0;
  const currentPrice = prices.at(-1) ?? 0;
  const hasDropped = currentPrice < firstPrice;

  const lineColor = hasDropped ? COLORS.brand.dark : COLORS.grays[700];

  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const padding = (maxPrice - minPrice || maxPrice) * RANGE_PADDING_RATIO;

  const data = points.map(({ label, price }, index) => ({
    value: price,
    label,
    hideDataPoint: index !== points.length - 1,
    dataPointColor: lineColor,
    dataPointRadius: CHART_LINE.dotRadius
  }));

  const spacing =
    (chartWidth - INITIAL_SPACING - END_SPACING) / Math.max(points.length - 1, 1);

  return (
    <ChartCard
      title={productName}
      caption={caption}
      onTitlePress={onProductPress}
      titleAccessibilityLabel={`Trocar o produto, hoje ${productName}`}
    >
      <LineChart
        data={data}
        width={chartWidth}
        height={CHART_HEIGHT}
        yAxisOffset={minPrice - padding}
        maxValue={maxPrice + padding}
        spacing={spacing}
        initialSpacing={INITIAL_SPACING}
        endSpacing={END_SPACING}
        thickness={CHART_LINE.thickness}
        color={lineColor}
        hideRules
        hideYAxisText
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={CHART_AXIS_LABEL_STYLE}
        disableScroll
        adjustToWidth
      />

      <View className='flex-row items-end justify-between gap-3'>
        <AppText size='sm' color='subtle' decoration='line-through'>
          {Currency.format(firstPrice)}
        </AppText>

        <AppText
          variant='title'
          size='xl'
          weight='bold'
          color={hasDropped ? 'brand' : 'strong'}
        >
          {Currency.format(currentPrice)}
        </AppText>
      </View>
    </ChartCard>
  );
}
