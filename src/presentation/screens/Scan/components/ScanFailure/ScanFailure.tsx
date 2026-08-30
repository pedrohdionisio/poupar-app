import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { TriangleAlert } from 'lucide-react-native';
import { View } from 'react-native';
import type { IScanFailureProps } from './interfaces';

export function ScanFailure({ title, description }: IScanFailureProps) {
  return (
    <View className='items-center gap-6'>
      <View className='h-16 w-16 items-center justify-center rounded-2xl bg-grays-100'>
        <TriangleAlert size={28} color={COLORS.danger} strokeWidth={1.8} />
      </View>

      <View className='gap-2'>
        <AppText variant='title' size='lg' color='strong' align='center'>
          {title}
        </AppText>

        <AppText size='sm' color='muted' align='center'>
          {description}
        </AppText>
      </View>
    </View>
  );
}
