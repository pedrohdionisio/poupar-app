import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { Percent } from '@shared/utils/percent';
import { TrendingDown, TrendingUp } from 'lucide-react-native';
import { View } from 'react-native';
import type { ITrendBadgeProps } from './interfaces';

const ICON_SIZE = 13;

export function TrendBadge({ change }: ITrendBadgeProps) {
  /** Gastar menos é o resultado bom, então a queda é que ganha a cor da marca. */
  const isPositive = change < 0;

  const Icon = isPositive ? TrendingDown : TrendingUp;

  return (
    <View
      className={`flex-row items-center gap-1 rounded-full px-2 py-1 ${
        isPositive ? 'bg-brand-light/15' : 'bg-grays-100'
      }`}
    >
      <Icon
        size={ICON_SIZE}
        strokeWidth={2.2}
        color={isPositive ? COLORS.brand.dark : COLORS.grays[500]}
      />

      <AppText size='xs' weight='semibold' color={isPositive ? 'brand' : 'muted'}>
        {Percent.formatChange(change)}
      </AppText>
    </View>
  );
}
