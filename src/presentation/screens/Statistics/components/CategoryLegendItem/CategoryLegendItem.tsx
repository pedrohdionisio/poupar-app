import { AppText } from '@presentation/components/AppText/AppText';
import { Percent } from '@shared/utils/percent';
import { View } from 'react-native';
import type { ICategoryLegendItemProps } from './interfaces';

export function CategoryLegendItem({ name, color, share }: ICategoryLegendItemProps) {
  return (
    <View className='flex-row items-center gap-2'>
      <View className='h-2 w-2 rounded-full' style={{ backgroundColor: color }} />

      <AppText size='xs' className='flex-1' numberOfLines={1}>
        {name}
      </AppText>

      <AppText size='xs' weight='semibold' color='strong'>
        {Percent.format(share)}
      </AppText>
    </View>
  );
}
