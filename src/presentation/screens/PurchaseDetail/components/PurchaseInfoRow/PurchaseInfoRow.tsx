import { AppText } from '@presentation/components/AppText/AppText';
import { View } from 'react-native';
import type { IPurchaseInfoRowProps } from './interfaces';

export function PurchaseInfoRow({ label, value }: IPurchaseInfoRowProps) {
  return (
    <View className='flex-row items-center justify-between gap-4 py-2'>
      <AppText size='sm' color='muted'>
        {label}
      </AppText>

      <AppText size='sm' weight='medium' color='strong' className='flex-1' align='right'>
        {value}
      </AppText>
    </View>
  );
}
