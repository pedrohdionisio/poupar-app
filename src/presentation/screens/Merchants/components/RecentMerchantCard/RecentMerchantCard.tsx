import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { DateFormat } from '@shared/utils/date';
import { Store } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { getMerchantDisplayName } from '../../utils';
import type { IRecentMerchantCardProps } from './interfaces';

export function RecentMerchantCard({ merchant, onPress }: IRecentMerchantCardProps) {
  const displayName = getMerchantDisplayName(merchant);

  return (
    <Pressable
      onPress={() => onPress(merchant)}
      accessibilityRole='button'
      accessibilityLabel={`Editar nome de ${displayName}`}
      className='w-40 gap-3 rounded-2xl bg-grays-100 p-4 active:opacity-60'
    >
      <View className='h-9 w-9 items-center justify-center rounded-lg bg-white'>
        <Store size={18} color={COLORS.grays[700]} strokeWidth={1.8} />
      </View>

      <View className='gap-0.5'>
        <AppText size='sm' weight='semibold' color='strong' numberOfLines={2}>
          {displayName}
        </AppText>

        <AppText size='xs' color='muted' numberOfLines={1}>
          {DateFormat.toDayMonth(merchant.lastPurchaseAt)}
        </AppText>
      </View>
    </Pressable>
  );
}
