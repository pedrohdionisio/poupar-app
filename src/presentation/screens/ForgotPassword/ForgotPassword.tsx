import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { Input } from '@presentation/components/Input/Input';
import { COLORS } from '@shared/constants/colors';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { GreenFullLogo } from '@/shared/assets/svgs/GreenFullLogo';
import { useForgotPasswordController } from './useForgotPasswordController';

const BACK_HIT_SLOP = 12;

export function ForgotPassword() {
  const { form, handleSubmit, handleBackPress } = useForgotPasswordController();

  const { isSubmitting } = form.formState;

  return (
    <View className='flex-1 bg-white'>
      <View className='px-5 pt-2'>
        <Pressable
          onPress={handleBackPress}
          hitSlop={BACK_HIT_SLOP}
          accessibilityRole='button'
          accessibilityLabel='Voltar para o login'
          className='h-9 w-9 items-center justify-center rounded-lg bg-grays-100 active:opacity-60'
        >
          <ChevronLeft size={20} color={COLORS.grays[700]} strokeWidth={2} />
        </Pressable>
      </View>

      <View className='flex-1 items-center justify-center gap-6 px-5'>
        <GreenFullLogo height={40} />

        <AppText size='md'>Informe seu e-mail para a recuperação da senha</AppText>

        <View className='w-full gap-4'>
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
