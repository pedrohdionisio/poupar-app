import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { Input } from '@presentation/components/Input/Input';
import { View } from 'react-native';
import { GreenFullLogo } from '@/shared/assets/svgs/GreenFullLogo';
import { useForgotPasswordController } from './useForgotPasswordController';

export function ForgotPassword() {
  const { form, handleSubmit } = useForgotPasswordController();

  const { isSubmitting } = form.formState;

  return (
    <View className='flex h-screen w-screen flex-1 justify-center bg-white'>
      <View className='flex-1 items-center justify-center gap-6 bg-white px-5'>
        <GreenFullLogo height={40} />

        <AppText size='md'>Informe seu e-mail para a recuperação da senha</AppText>

        <View className='flex w-full gap-4'>
          <Input
            placeholder='Digite o seu e-mail'
            name='email'
            control={form.control}
            keyboardType='email-address'
            returnKeyType='send'
            autoComplete='email'
            onSubmitEditing={handleSubmit}
            label='E-mail'
          />

          <Button onPress={handleSubmit} disabled={isSubmitting} isLoading={isSubmitting}>
            Enviar e-mail
          </Button>
        </View>
      </View>
    </View>
  );
}
