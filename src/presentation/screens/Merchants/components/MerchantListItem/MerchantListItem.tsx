import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { DateFormat } from '@shared/utils/date';
import { Pencil, Store } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { getMerchantDisplayName } from '../../utils';
import type { IMerchantListItemProps } from './interfaces';

const EDIT_HIT_SLOP = 8;

export function MerchantListItem({ merchant, onEditPress }: IMerchantListItemProps) {
  const { name, lastPurchaseAt, purchasesCount } = merchant;

  const displayName = getMerchantDisplayName(merchant);
  const hasAlias = displayName !== name;

  const purchasesLabel = `${purchasesCount} ${purchasesCount === 1 ? 'compra' : 'compras'}`;

  return (
    <View className='flex-row items-center gap-3 py-4'>
      <View className='h-11 w-11 items-center justify-center rounded-xl bg-grays-100'>
        <Store size={20} color={COLORS.grays[700]} strokeWidth={1.8} />
      </View>

      <View className='flex-1 gap-1'>
        <AppText size='sm' weight='semibold' color='strong' numberOfLines={1}>
          {displayName}
        </AppText>

        {hasAlias && (
          <AppText size='xs' color='subtle' numberOfLines={1}>
            {name}
          </AppText>
        )}

        <AppText size='xs' color='muted' numberOfLines={1}>
          {purchasesLabel} · última em {DateFormat.toDayMonth(lastPurchaseAt)}
        </AppText>
      </View>

      <Pressable
        onPress={() => onEditPress(merchant)}
        hitSlop={EDIT_HIT_SLOP}
        accessibilityRole='button'
        accessibilityLabel={`Editar nome de ${displayName}`}
        className='h-9 w-9 items-center justify-center rounded-lg bg-grays-100 active:opacity-60'
      >
        <Pencil size={16} color={COLORS.grays[600]} strokeWidth={2} />
      </Pressable>
    </View>
  );
}
