import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { Input } from '@presentation/components/Input/Input';
import { View } from 'react-native';
import { GreenFullLogo } from '@/shared/assets/svgs/GreenFullLogo';
import { useResetPasswordController } from './useResetPasswordController';

export function ResetPassword() {
  const { form, passwordInputRef, handleSubmit } = useResetPasswordController();

  const { isSubmitting } = form.formState;

  return (
    <View className='flex h-screen w-screen flex-1 justify-center bg-white'>
      <View className='flex-1 items-center justify-center gap-6 bg-white px-5'>
        <GreenFullLogo height={40} />

        <AppText size='md'>Informe a nova senha e o código de recuperação</AppText>

        <View className='flex w-full gap-4'>
          <Input
            placeholder='Digite o código do seu e-mail'
            name='code'
            control={form.control}
            keyboardType='numeric'
            returnKeyType='next'
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            label='Código de recuperação'
          />

          <Input
            placeholder='Digite uma nova senha'
            name='password'
            control={form.control}
            secureTextEntry
            ref={passwordInputRef}
            returnKeyType='send'
            onSubmitEditing={handleSubmit}
            label='Nova senha'
          />

          <Button onPress={handleSubmit} disabled={isSubmitting} isLoading={isSubmitting}>
            Recuperar senha
          </Button>
        </View>
      </View>
    </View>
  );
}
