import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { Input } from '@presentation/components/Input/Input';
import { View } from 'react-native';
import type { IEditNameBottomSheetProps } from './interfaces';
import { useEditNameBottomSheetController } from './useEditNameBottomSheetController';

const NAME_MAX_LENGTH = 60;

export function EditNameBottomSheet({ ref }: IEditNameBottomSheetProps) {
  const { bottomSheetModalRef, bottom, form, isUpdatingAccount, handleSubmit } =
    useEditNameBottomSheetController({ ref });

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      keyboardBehavior='interactive'
      android_keyboardInputMode='adjustResize'
    >
      <BottomSheetView style={{ paddingBottom: bottom + 24, paddingHorizontal: 24 }}>
        <View className='gap-1 pb-6'>
          <AppText variant='title' size='lg' color='strong'>
            Editar nome
          </AppText>

          <AppText size='sm' color='muted'>
            É assim que você aparece no poupar.
          </AppText>
        </View>

        <View className='gap-4'>
          <Input
            name='name'
            control={form.control}
            label='Seu nome'
            placeholder='Ex.: Maria Silva'
            InputComponent={BottomSheetTextInput}
            autoCapitalize='words'
            returnKeyType='done'
            onSubmitEditing={handleSubmit}
            maxLength={NAME_MAX_LENGTH}
          />

          <Button
            onPress={handleSubmit}
            isLoading={isUpdatingAccount}
            disabled={isUpdatingAccount}
          >
            Salvar
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
