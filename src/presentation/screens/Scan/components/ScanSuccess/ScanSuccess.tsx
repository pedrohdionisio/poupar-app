import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { Currency } from '@shared/utils/currency';
import { Check } from 'lucide-react-native';
import { View } from 'react-native';
import type { IScanSuccessProps } from './interfaces';

export function ScanSuccess({ confirmedScan }: IScanSuccessProps) {
  const itemsLabel = confirmedScan.itemsCount === 1 ? 'item' : 'itens';

  return (
    <View className='items-center gap-6'>
      <View className='h-16 w-16 items-center justify-center rounded-full bg-brand-main'>
        <Check size={32} color={COLORS.white} strokeWidth={3} />
      </View>

      <View className='gap-2'>
        <AppText variant='title' size='lg' color='strong' align='center'>
          Nota importada
        </AppText>

        <AppText size='sm' color='muted' align='center'>
          {`${confirmedScan.itemsCount} ${itemsLabel} · ${Currency.format(confirmedScan.totalAmount)}`}
        </AppText>
      </View>
    </View>
  );
}
