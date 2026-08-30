import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { AppText } from '@/presentation/components/AppText/AppText';
import { Button } from '@/presentation/components/Button/Button';
import { Input } from '@/presentation/components/Input/Input';
import type { ISignInBottomSheetProps } from './interfaces';
import { useSignInBottomSheetController } from './useSignInBottomSheetController';

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
  const { bottomSheetModalRef, bottom, passwordInputRef, form, handleSubmit } =
    useSignInBottomSheetController({
      ref
    });

  const { isSubmitting } = form.formState;

  return (
    <BottomSheetModal ref={bottomSheetModalRef} keyboardBlurBehavior='restore'>
      <BottomSheetView style={{ paddingBottom: bottom, paddingHorizontal: 24 }}>
        <AppText size='2xl' className='mb-2'>
          Informe seus dados
        </AppText>

        <View className='gap-8'>
          <Input
            name='email'
            control={form.control}
            placeholder='Digite seu e-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            autoComplete='email'
            autoCorrect={false}
            InputComponent={BottomSheetTextInput}
            returnKeyType='next'
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            label='E-mail'
          />

          <Input
            name='password'
            control={form.control}
            placeholder='Digite sua senha'
            autoCapitalize='none'
            autoComplete='current-password'
            InputComponent={BottomSheetTextInput}
            autoCorrect={false}
            secureTextEntry
            ref={passwordInputRef}
            returnKeyType='send'
            onSubmitEditing={handleSubmit}
            label='Senha'
          />

          <Button onPress={handleSubmit} disabled={isSubmitting} isLoading={isSubmitting}>
            Entrar
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
