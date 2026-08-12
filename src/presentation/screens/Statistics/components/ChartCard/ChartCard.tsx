import { AppText } from '@presentation/components/AppText/AppText';
import { View } from 'react-native';
import type { IChartCardProps } from './interfaces';

export function ChartCard({ title, caption, children }: IChartCardProps) {
  return (
    <View className='gap-5 rounded-2xl border border-grays-200 bg-white p-5'>
      <View className='flex-row items-center justify-between gap-3'>
        <AppText
          variant='title'
          size='md'
          weight='semibold'
          color='strong'
          className='flex-1'
          numberOfLines={1}
        >
          {title}
        </AppText>

        {caption ? (
          <AppText size='xs' color='subtle'>
            {caption}
          </AppText>
        ) : null}
      </View>

      {children}
    </View>
  );
}
