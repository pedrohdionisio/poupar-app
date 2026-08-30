import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { Currency } from '@shared/utils/currency';
import { DateFormat } from '@shared/utils/date';
import { Store } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import type { IRecentMerchantCardProps } from './interfaces';

export function RecentMerchantCard({ merchant, onPress }: IRecentMerchantCardProps) {
  const { name, totalSpent, lastPurchaseAt } = merchant;

  return (
    <Pressable
      onPress={() => onPress(merchant)}
      accessibilityRole='button'
      accessibilityLabel={`Editar ${name}`}
      className='w-40 gap-3 rounded-2xl bg-grays-100 p-4 active:opacity-60'
    >
      <View className='h-9 w-9 items-center justify-center rounded-lg bg-white'>
        <Store size={18} color={COLORS.grays[700]} strokeWidth={1.8} />
      </View>

      <View className='gap-0.5'>
        <AppText size='sm' weight='semibold' color='strong' numberOfLines={2}>
          {name}
        </AppText>

        <AppText size='xs' color='muted' numberOfLines={1}>
          {Currency.format(totalSpent)}
          {lastPurchaseAt && ` · ${DateFormat.toDayMonth(lastPurchaseAt)}`}
        </AppText>
      </View>
    </Pressable>
  );
}
