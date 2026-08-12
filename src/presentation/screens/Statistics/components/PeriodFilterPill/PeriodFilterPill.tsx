import { AppText } from '@presentation/components/AppText/AppText';
import { cn } from '@shared/utils/cn';
import { Pressable } from 'react-native';
import type { IPeriodFilterPillProps } from './interfaces';

export function PeriodFilterPill({ label, isSelected, onPress }: IPeriodFilterPillProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole='button'
      accessibilityState={{ selected: isSelected }}
      className={cn(
        'rounded-full border px-4 py-2 active:opacity-60',
        isSelected ? 'border-brand-main bg-brand-main' : 'border-grays-200 bg-white'
      )}
    >
      <AppText size='sm' weight='medium' color={isSelected ? 'inverse' : 'muted'}>
        {label}
      </AppText>
    </Pressable>
  );
}
