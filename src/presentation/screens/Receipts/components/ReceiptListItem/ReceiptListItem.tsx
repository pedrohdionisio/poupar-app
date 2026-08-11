import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { Currency } from '@shared/utils/currency';
import { DateFormat } from '@shared/utils/date';
import { CalendarDays, Package, ShoppingBasket, Tag } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { ReceiptMetaItem } from '../ReceiptMetaItem/ReceiptMetaItem';
import type { IReceiptListItemProps } from './interfaces';

export function ReceiptListItem({ receipt, onPress }: IReceiptListItemProps) {
  const { merchantName, purchasedAt, itemsCount, totalAmount } = receipt;

  const itemsLabel = `${itemsCount} ${itemsCount === 1 ? 'item' : 'itens'}`;

  return (
    <Pressable
      onPress={() => onPress(receipt)}
      accessibilityRole='button'
      accessibilityLabel={`Nota de ${merchantName}`}
      className='flex-row items-center gap-3 py-4 active:opacity-60'
    >
      <View className='h-11 w-11 items-center justify-center rounded-xl bg-grays-100'>
        <ShoppingBasket size={20} color={COLORS.grays[700]} strokeWidth={1.8} />
      </View>

      <View className='flex-1 gap-1.5'>
        <AppText size='sm' weight='semibold' color='strong' numberOfLines={1}>
          {merchantName}
        </AppText>

        <View className='flex-row items-center gap-1.5'>
          <ReceiptMetaItem
            icon={CalendarDays}
            label={DateFormat.toDayMonth(purchasedAt)}
          />

          <AppText size='xs' color='subtle'>
            ·
          </AppText>

          <ReceiptMetaItem icon={Package} label={itemsLabel} />

          <AppText size='xs' color='subtle'>
            ·
          </AppText>

          <ReceiptMetaItem icon={Tag} label={Currency.format(totalAmount)} />
        </View>
      </View>
    </Pressable>
  );
}
