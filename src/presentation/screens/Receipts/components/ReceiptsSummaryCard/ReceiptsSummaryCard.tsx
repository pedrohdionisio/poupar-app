import { AppText } from '@presentation/components/AppText/AppText';
import { Currency } from '@shared/utils/currency';
import { View } from 'react-native';
import type { IReceiptsSummaryCardProps } from './interfaces';

export function ReceiptsSummaryCard({ averageAmount }: IReceiptsSummaryCardProps) {
  return (
    <View className='flex-row items-center justify-between rounded-2xl bg-grays-100 p-5'>
      <View className='flex-1 gap-1 pr-4'>
        <AppText size='sm' color='muted'>
          A média das suas compras é de
        </AppText>

        <AppText variant='title' size='2xl' weight='bold' color='strong'>
          {Currency.format(averageAmount)}
        </AppText>
      </View>
    </View>
  );
}
