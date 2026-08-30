import { AppText } from '@presentation/components/AppText/AppText';
import { Currency } from '@shared/utils/currency';
import { DateFormat } from '@shared/utils/date';
import { View } from 'react-native';
import { getCategoryLabel, getSourceLabel } from '../../utils';
import { PurchaseInfoRow } from '../PurchaseInfoRow/PurchaseInfoRow';
import type { IPurchaseSummaryProps } from './interfaces';

export function PurchaseSummary({ purchase }: IPurchaseSummaryProps) {
  const { merchantName, purchasedAt, category, source, totalAmount, discountAmount } =
    purchase;

  const hasDiscount = discountAmount > 0;

  return (
    <View className='gap-5'>
      <View className='gap-1 rounded-2xl bg-grays-100 p-5'>
        <AppText size='sm' color='muted'>
          Você gastou
        </AppText>

        <AppText variant='title' size='2xl' weight='bold' color='strong'>
          {Currency.format(totalAmount)}
        </AppText>

        <AppText size='sm' color='muted' numberOfLines={2}>
          em {merchantName}
        </AppText>
      </View>

      <View className='rounded-2xl border border-grays-200 px-4 py-2'>
        <PurchaseInfoRow label='Data' value={DateFormat.toDayMonthYear(purchasedAt)} />

        <PurchaseInfoRow label='Categoria' value={getCategoryLabel(category)} />

        <PurchaseInfoRow label='Origem' value={getSourceLabel(source)} />

        {hasDiscount && (
          <PurchaseInfoRow label='Desconto' value={Currency.format(discountAmount)} />
        )}
      </View>
    </View>
  );
}
