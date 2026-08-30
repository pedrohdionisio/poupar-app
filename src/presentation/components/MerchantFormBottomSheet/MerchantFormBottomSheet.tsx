import { MERCHANT_CATEGORY_OPTIONS } from '@data/modules/merchant/constants/merchantCategories';
import {
  CNPJ_MASK_LENGTH,
  MERCHANT_NAME_MAX_LENGTH,
  type MerchantFormType
} from '@data/modules/merchant/useCases/createMerchant/schemas/merchantSchema';
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { Input } from '@presentation/components/Input/Input';
import { cn } from '@shared/utils/cn';
import { Cnpj } from '@shared/utils/cnpj';
import { type Control, useController } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import type { IMerchantFormBottomSheetProps } from './interfaces';
import { useMerchantFormBottomSheetController } from './useMerchantFormBottomSheetController';

const CONTENT_BOTTOM_SPACING = 24;

const CONTENT_HORIZONTAL_PADDING = 24;

interface ICategorySelectorProps {
  control: Control<MerchantFormType>;
}

/** Ligado ao form como o `Input`: a categoria é campo, não estado à parte. */
function CategorySelector({ control }: ICategorySelectorProps) {
  const { field } = useController({ name: 'category', control });

  return (
    <View className='gap-1'>
      <AppText size='sm'>Categoria</AppText>

      <View className='flex-row gap-2'>
        {MERCHANT_CATEGORY_OPTIONS.map((option) => {
          const isSelected = field.value === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => field.onChange(option.value)}
              accessibilityRole='button'
              accessibilityLabel={option.label}
              accessibilityState={{ selected: isSelected }}
              className={cn(
                'flex-1 items-center justify-center rounded-[10px] border py-3 active:opacity-60',
                isSelected
                  ? 'border-brand-main bg-brand-main'
                  : 'border-grays-400 bg-white'
              )}
            >
              <AppText size='sm' weight='medium' color={isSelected ? 'inverse' : 'muted'}>
                {option.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function MerchantFormBottomSheet({ ref, onSaved }: IMerchantFormBottomSheetProps) {
  const { bottomSheetModalRef, bottom, form, isEditing, isSaving, handleSubmit } =
    useMerchantFormBottomSheetController({ ref, onSaved });

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      keyboardBehavior='interactive'
      keyboardBlurBehavior='restore'
      android_keyboardInputMode='adjustResize'
    >
      <BottomSheetView
        style={{
          paddingBottom: bottom + CONTENT_BOTTOM_SPACING,
          paddingHorizontal: CONTENT_HORIZONTAL_PADDING
        }}
      >
        <View className='gap-1 pb-6'>
          <AppText variant='title' size='lg' color='strong'>
            {isEditing ? 'Editar estabelecimento' : 'Novo estabelecimento'}
          </AppText>

          <AppText size='sm' color='muted'>
            O nome é o que aparece nas suas compras. O CNPJ é opcional.
          </AppText>
        </View>

        <View className='gap-4'>
          <Input
            name='name'
            control={form.control}
            label='Nome'
            placeholder='Ex.: Mercado da esquina'
            InputComponent={BottomSheetTextInput}
            autoCapitalize='sentences'
            maxLength={MERCHANT_NAME_MAX_LENGTH}
          />

          <CategorySelector control={form.control} />

          <Input
            name='cnpj'
            control={form.control}
            label='CNPJ (opcional)'
            placeholder='00.000.000/0000-00'
            InputComponent={BottomSheetTextInput}
            keyboardType='number-pad'
            returnKeyType='done'
            onSubmitEditing={handleSubmit}
            maxLength={CNPJ_MASK_LENGTH}
            format={Cnpj.mask}
          />

          <Button onPress={handleSubmit} isLoading={isSaving} disabled={isSaving}>
            Salvar
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
