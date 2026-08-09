import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { Input } from '@presentation/components/Input/Input';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { GreenFullLogo } from '@/shared/assets/svgs/GreenFullLogo';
import type { AuthStackNavigationProps } from '@/shared/navigation/AuthStack';

export function ForgotPassword() {
  const navigation = useNavigation<AuthStackNavigationProps>();

  return (
    <View className='flex h-screen w-screen flex-1 justify-center bg-white'>
      <View className='flex-1 items-center justify-center gap-6 bg-support-white px-5'>
        <GreenFullLogo height={40} />

        <AppText size='md'>Informe seu e-mail para a recuperação da senha</AppText>

        <View className='flex w-full gap-4'>
          <Input
            placeholder='Digite o seu e-mail'
            name='email'
            keyboardType='email-address'
            returnKeyType='send'
            autoComplete='email'
            label='E-mail'
          />

          <Button onPress={() => navigation.navigate('ResetPassword', { email: '' })}>
            Enviar e-mail
          </Button>
        </View>
      </View>
    </View>
  );
}
