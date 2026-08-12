import { AppText } from '@presentation/components/AppText/AppText';
import { View } from 'react-native';
import type { IStatisticsHeaderProps } from './interfaces';

export function StatisticsHeader({ periodCaption }: IStatisticsHeaderProps) {
  return (
    <View className='gap-1 pt-5 pb-6'>
      <AppText variant='title' size='xl' color='strong'>
        Estatísticas
      </AppText>

      <AppText size='sm' color='muted'>
        O resumo das suas compras nos {periodCaption}
      </AppText>
    </View>
  );
}
