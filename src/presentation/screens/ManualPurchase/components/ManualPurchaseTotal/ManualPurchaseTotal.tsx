import { AppText } from '@presentation/components/AppText/AppText';
import { Currency } from '@shared/utils/currency';
import { View } from 'react-native';
import type { IManualPurchaseTotalProps } from './interfaces';

/** O total não é digitado: sai da soma dos itens, para não divergir da nota. */
export function ManualPurchaseTotal({
  totalAmount,
  itemsCount
}: IManualPurchaseTotalProps) {
  const itemsLabel = `${itemsCount} ${itemsCount === 1 ? 'item' : 'itens'}`;

  return (
    <View className='flex-row items-center justify-between rounded-2xl bg-grays-100 p-5'>
      <View className='gap-1'>
        <AppText size='sm' color='muted'>
          Total da nota
        </AppText>

        <AppText size='xs' color='subtle'>
          {itemsLabel}
        </AppText>
      </View>

      <AppText variant='title' size='xl' weight='bold' color='strong'>
        {Currency.format(totalAmount)}
      </AppText>
    </View>
  );
}
