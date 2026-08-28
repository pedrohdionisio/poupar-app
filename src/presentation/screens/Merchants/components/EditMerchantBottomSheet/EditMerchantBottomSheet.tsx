import { ALIAS_MAX_LENGTH } from '@data/modules/merchant/useCases/updateAccountMerchantAlias/schemas/editMerchantSchema';
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { Input } from '@presentation/components/Input/Input';
import { View } from 'react-native';
import type { IEditMerchantBottomSheetProps } from './interfaces';

import { useEditMerchantBottomSheetController } from './useEditMerchantBottomSheetController';

export function EditMerchantBottomSheet({ ref }: IEditMerchantBottomSheetProps) {
  const {
    bottomSheetModalRef,
    bottom,
    merchant,
    form,
    isUpdatingAlias,
    canClearAlias,
    handleSubmit,
    handleClearAlias
  } = useEditMerchantBottomSheetController({ ref });

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      keyboardBehavior='interactive'
      android_keyboardInputMode='adjustResize'
    >
      <BottomSheetView style={{ paddingBottom: bottom + 24, paddingHorizontal: 24 }}>
        <View className='gap-1 pb-6'>
          <AppText variant='title' size='lg' color='strong'>
            Editar estabelecimento
          </AppText>

          <AppText size='sm' color='muted'>
            Na nota ele aparece como {merchant?.name}
          </AppText>
        </View>

        <View className='gap-4'>
          <Input
            name='alias'
            control={form.control}
            label='Nome do estabelecimento'
            placeholder='Ex.: Mercado da esquina'
            InputComponent={BottomSheetTextInput}
            autoCapitalize='sentences'
            returnKeyType='done'
            onSubmitEditing={handleSubmit}
            maxLength={ALIAS_MAX_LENGTH}
          />

          <Button
            onPress={handleSubmit}
            isLoading={isUpdatingAlias}
            disabled={isUpdatingAlias}
          >
            Salvar
          </Button>

          {canClearAlias && (
            <Button variant='ghost' onPress={handleClearAlias} disabled={isUpdatingAlias}>
              Usar o nome original
            </Button>
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
