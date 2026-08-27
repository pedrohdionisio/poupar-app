import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { AppText } from '@/presentation/components/AppText/AppText';
import { Button } from '@/presentation/components/Button/Button';
import { Input } from '@/presentation/components/Input/Input';
import type { ISignUpBottomSheetProps } from './interfaces';
import { useSignUpBottomSheetController } from './useSignUpBottomSheetController';

export function SignUpBottomSheet({ ref }: ISignUpBottomSheetProps) {
  const {
    bottomSheetModalRef,
    bottom,
    emailInputRef,
    passwordInputRef,
    form,
    handleSubmit
  } = useSignUpBottomSheetController({ ref });

  const { isSubmitting } = form.formState;

  return (
    <BottomSheetModal ref={bottomSheetModalRef}>
      <BottomSheetView style={{ paddingBottom: bottom, paddingHorizontal: 24 }}>
        <AppText size='2xl' className='mb-2'>
          Crie sua conta
        </AppText>

        <View className='gap-8'>
          <Input
            name='name'
            control={form.control}
            placeholder='Digite seu nome'
            autoCapitalize='words'
            autoComplete='name'
            autoCorrect={false}
            InputComponent={BottomSheetTextInput}
            returnKeyType='next'
            onSubmitEditing={() => emailInputRef.current?.focus()}
            label='Nome'
          />

          <Input
            name='email'
            control={form.control}
            placeholder='Digite seu e-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            autoComplete='email'
            autoCorrect={false}
            InputComponent={BottomSheetTextInput}
            ref={emailInputRef}
            returnKeyType='next'
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            label='E-mail'
          />

          <Input
            name='password'
            control={form.control}
            placeholder='Crie uma senha'
            autoCapitalize='none'
            autoComplete='new-password'
            InputComponent={BottomSheetTextInput}
            autoCorrect={false}
            secureTextEntry
            ref={passwordInputRef}
            returnKeyType='send'
            onSubmitEditing={handleSubmit}
            label='Senha'
          />

          <Button onPress={handleSubmit} disabled={isSubmitting} isLoading={isSubmitting}>
            Criar conta
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
