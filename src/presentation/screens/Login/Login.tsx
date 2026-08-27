import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import greetingsBg from '@shared/assets/greetings-bg/image.jpg';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GreenFullLogo } from '@/shared/assets/svgs/GreenFullLogo';
import { SignInBottomSheet } from './components/SignInBottomSheet/SignInBottomSheet';
import { SignUpBottomSheet } from './components/SignUpBottomSheet/SignUpBottomSheet';
import { useLoginController } from './useLoginController';

export function Login() {
  const {
    signInBottomSheetRef,
    signUpBottomSheetRef,
    handleOpenSignIn,
    handleOpenSignUp,
    handleGoToForgotPassword
  } = useLoginController();

  return (
    <>
      <ImageBackground source={greetingsBg} resizeMode='cover' className='flex-1'>
        <SafeAreaView className='flex-1 items-center justify-between py-4'>
          <GreenFullLogo />

          <View className='w-full items-center'>
            <AppText
              variant='title'
              color='inverse'
              size='3xl'
              align='center'
              className='max-w-[311px] tracking-[-0.32px]'
            >
              Compras do dia a dia mais baratas
            </AppText>

            <View className='mt-6 w-full p-5'>
              <Button onPress={handleOpenSignIn}>Acessar minha conta</Button>

              <View className='mt-4'>
                <View className='flex-row justify-center gap-0.5 pt-3.5'>
                  <AppText color='inverse'>Esqueceu a senha?</AppText>

                  <TouchableOpacity onPress={handleGoToForgotPassword}>
                    <AppText color='brandLight'>Recupere aqui</AppText>
                  </TouchableOpacity>
                </View>

                <View className='flex-row justify-center gap-0.5 pt-3.5'>
                  <AppText color='inverse'>Ainda não tem acesso?</AppText>

                  <TouchableOpacity onPress={handleOpenSignUp}>
                    <AppText color='brandLight'>Crie sua conta</AppText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <SignInBottomSheet ref={signInBottomSheetRef} />
      <SignUpBottomSheet ref={signUpBottomSheetRef} />
    </>
  );
}
