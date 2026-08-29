import { RECEIPT_UNITS } from '@data/modules/purchase/useCases/importPurchase/schemas/importPurchaseSchema';
import { AppText } from '@presentation/components/AppText/AppText';
import { cn } from '@shared/utils/cn';
import { useController } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import type { IUnitSelectorProps } from './interfaces';

const UNIT_LABELS = {
  UN: 'Unidade',
  KG: 'Quilo',
  L: 'Litro'
} as const;

/** Ligado ao form como o `Input`: a unidade é campo de formulário, não estado. */
export function UnitSelector({ name, control, label }: IUnitSelectorProps) {
  const { field } = useController({ name, control });

  return (
    <View className='gap-1'>
      <AppText size='sm'>{label}</AppText>

      <View className='flex-row gap-2'>
        {RECEIPT_UNITS.map((unit) => {
          const isSelected = field.value === unit;

          return (
            <Pressable
              key={unit}
              onPress={() => field.onChange(unit)}
              accessibilityRole='button'
              accessibilityLabel={UNIT_LABELS[unit]}
              accessibilityState={{ selected: isSelected }}
              className={cn(
                'flex-1 items-center justify-center rounded-[10px] border py-3 active:opacity-60',
                isSelected
                  ? 'border-brand-main bg-brand-main'
                  : 'border-grays-400 bg-white'
              )}
            >
              <AppText size='sm' weight='medium' color={isSelected ? 'inverse' : 'muted'}>
                {unit}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
