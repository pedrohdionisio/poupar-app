import { AppText } from '@presentation/components/AppText/AppText';
import { CHART_PALETTE } from '@shared/constants/chart';
import { COLORS } from '@shared/constants/colors';
import { Currency } from '@shared/utils/currency';
import { View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { CategoryLegendItem } from '../CategoryLegendItem/CategoryLegendItem';
import { ChartCard } from '../ChartCard/ChartCard';
import type { ICategorySplitCardProps } from './interfaces';

const RADIUS = 62;
const INNER_RADIUS = 44;

export function CategorySplitCard({
  categorySpends,
  totalAmount,
  caption
}: ICategorySplitCardProps) {
  const data = categorySpends.map(({ id, amount }, index) => ({
    key: id,
    value: amount,
    color: CHART_PALETTE[index % CHART_PALETTE.length]
  }));

  return (
    <ChartCard title='Gasto por categoria' caption={caption}>
      <View className='flex-row items-center gap-5'>
        <PieChart
          data={data}
          donut
          radius={RADIUS}
          innerRadius={INNER_RADIUS}
          innerCircleColor={COLORS.white}
          centerLabelComponent={() => (
            <View className='items-center'>
              <AppText size='xs' color='muted'>
                total
              </AppText>

              <AppText variant='title' size='sm' weight='bold' color='strong'>
                {Currency.formatCompact(totalAmount)}
              </AppText>
            </View>
          )}
        />

        <View className='flex-1 gap-2.5'>
          {categorySpends.map(({ id, name, amount }, index) => (
            <CategoryLegendItem
              key={id}
              name={name}
              color={CHART_PALETTE[index % CHART_PALETTE.length] ?? COLORS.grays[300]}
              share={totalAmount > 0 ? amount / totalAmount : 0}
            />
          ))}
        </View>
      </View>
    </ChartCard>
  );
}
