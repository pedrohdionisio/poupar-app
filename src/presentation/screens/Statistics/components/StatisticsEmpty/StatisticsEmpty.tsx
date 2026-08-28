import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { ChartNoAxesCombined } from 'lucide-react-native';
import { View } from 'react-native';
import type { IStatisticsEmptyProps } from './interfaces';

export function StatisticsEmpty({ periodCaption }: IStatisticsEmptyProps) {
  return (
    <View className='items-center gap-3 py-12'>
      <View className='h-14 w-14 items-center justify-center rounded-2xl bg-grays-100'>
        <ChartNoAxesCombined size={26} color={COLORS.grays[400]} strokeWidth={1.8} />
      </View>

      <View className='gap-1'>
        <AppText size='md' weight='semibold' color='strong' align='center'>
          Nada para mostrar ainda
        </AppText>

        <AppText size='sm' color='muted' align='center'>
          Você não registrou compras nos {periodCaption}. Escaneie uma nota ou escolha um
          período maior.
        </AppText>
      </View>
    </View>
  );
}
