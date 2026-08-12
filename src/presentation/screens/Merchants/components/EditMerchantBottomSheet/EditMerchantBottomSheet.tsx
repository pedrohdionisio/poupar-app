import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { Input } from '@presentation/components/Input/Input';
import { View } from 'react-native';
import type { IEditMerchantBottomSheetProps } from './interfaces';
import { useEditMerchantBottomSheetController } from './useEditMerchantBottomSheetController';

export function EditMerchantBottomSheet({ ref, onSave }: IEditMerchantBottomSheetProps) {
  const {
    bottomSheetModalRef,
    bottom,
    merchant,
    nickname,
    canClearNickname,
    setNickname,
    handleSubmit,
    handleClearNickname
  } = useEditMerchantBottomSheetController({ ref, onSave });

  return (
    <BottomSheetModalProvider>
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
              Na nota ele aparece como {merchant?.legalName}
            </AppText>
          </View>

          <View className='gap-4'>
            <Input
              name='nickname'
              label='Nome do estabelecimento'
              placeholder='Ex.: Mercado da esquina'
              value={nickname}
              onChangeText={setNickname}
              InputComponent={BottomSheetTextInput}
              autoCapitalize='sentences'
              returnKeyType='done'
              onSubmitEditing={handleSubmit}
              maxLength={40}
            />

            <Button onPress={handleSubmit}>Salvar</Button>

            {canClearNickname && (
              <Button variant='ghost' onPress={handleClearNickname}>
                Usar o nome original
              </Button>
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
