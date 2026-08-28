import { AppText } from '@presentation/components/AppText/AppText';
import { Currency } from '@shared/utils/currency';
import { Quantity } from '@shared/utils/quantity';
import { View } from 'react-native';
import type { IPurchaseItemRowProps } from './interfaces';

export function PurchaseItemRow({ item }: IPurchaseItemRowProps) {
  const { description, quantity, unit, unitPrice, totalAmount, discountAmount } = item;

  const quantityLabel = `${Quantity.formatWithUnit(quantity, unit)} × ${Currency.format(unitPrice)}`;

  const hasDiscount = discountAmount > 0;

  return (
    <View className='flex-row items-start justify-between gap-3 py-4'>
      <View className='flex-1 gap-1'>
        <AppText size='sm' weight='medium' color='strong'>
          {description}
        </AppText>

        <AppText size='xs' color='muted'>
          {quantityLabel}
        </AppText>

        {hasDiscount && (
          <AppText size='xs' color='brand'>
            desconto de {Currency.format(discountAmount)}
          </AppText>
        )}
      </View>

      <AppText size='sm' weight='semibold' color='strong'>
        {Currency.format(totalAmount)}
      </AppText>
    </View>
  );
}
