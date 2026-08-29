import { ITEM_DESCRIPTION_MAX_LENGTH } from '@data/modules/purchase/useCases/importPurchase/schemas/importPurchaseSchema';
import { AppText } from '@presentation/components/AppText/AppText';
import { Input } from '@presentation/components/Input/Input';
import { COLORS } from '@shared/constants/colors';
import { Trash2 } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { UnitSelector } from '../UnitSelector/UnitSelector';
import type { IManualPurchaseItemFormProps } from './interfaces';

const REMOVE_HIT_SLOP = 8;

export function ManualPurchaseItemForm({
  index,
  control,
  canRemove,
  onRemovePress
}: IManualPurchaseItemFormProps) {
  return (
    <View className='gap-4 rounded-2xl border border-grays-200 p-4'>
      <View className='flex-row items-center justify-between gap-3'>
        <AppText size='sm' weight='semibold' color='strong'>
          Item {index + 1}
        </AppText>

        {canRemove && (
          <Pressable
            onPress={() => onRemovePress(index)}
            hitSlop={REMOVE_HIT_SLOP}
            accessibilityRole='button'
            accessibilityLabel={`Remover item ${index + 1}`}
            className='h-9 w-9 items-center justify-center rounded-lg bg-grays-100 active:opacity-60'
          >
            <Trash2 size={16} color={COLORS.danger} strokeWidth={2} />
          </Pressable>
        )}
      </View>

      <Input
        name={`items.${index}.description`}
        control={control}
        label='Descrição'
        placeholder='Ex.: Arroz 5kg'
        autoCapitalize='sentences'
        maxLength={ITEM_DESCRIPTION_MAX_LENGTH}
      />

      <UnitSelector name={`items.${index}.unit`} control={control} label='Unidade' />

      <View className='flex-row gap-3'>
        <View className='flex-1'>
          <Input
            name={`items.${index}.quantity`}
            control={control}
            label='Quantidade'
            placeholder='1'
            keyboardType='decimal-pad'
          />
        </View>

        <View className='flex-1'>
          <Input
            name={`items.${index}.unitPrice`}
            control={control}
            label='Preço unitário'
            placeholder='0,00'
            keyboardType='decimal-pad'
          />
        </View>
      </View>
    </View>
  );
}
