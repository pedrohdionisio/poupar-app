import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { ChevronDown } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import type { IChartCardProps } from './interfaces';

const TITLE_HIT_SLOP = 8;

export function ChartCard({
  title,
  caption,
  onTitlePress,
  titleAccessibilityLabel,
  children
}: IChartCardProps) {
  return (
    <View className='gap-5 rounded-2xl border border-grays-200 bg-white p-5'>
      <View className='flex-row items-center justify-between gap-3'>
        {/* O chevron é o que avisa que o título abre uma escolha: sem ele o
            texto pareceria só um rótulo, e ninguém tentaria tocá-lo. */}
        {onTitlePress ? (
          <Pressable
            onPress={onTitlePress}
            hitSlop={TITLE_HIT_SLOP}
            accessibilityRole='button'
            accessibilityLabel={titleAccessibilityLabel}
            className='flex-1 flex-row items-center gap-1 active:opacity-60'
          >
            <AppText
              variant='title'
              size='md'
              weight='semibold'
              color='strong'
              className='shrink'
              numberOfLines={1}
            >
              {title}
            </AppText>

            <ChevronDown size={18} color={COLORS.grays[600]} strokeWidth={2} />
          </Pressable>
        ) : (
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
        )}

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
