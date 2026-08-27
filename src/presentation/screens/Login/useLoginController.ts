import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import type { AuthStackNavigationProps } from '@/shared/navigation/AuthStack';
import type { ISignInBottomSheet } from './components/SignInBottomSheet/interfaces';
import type { ISignUpBottomSheet } from './components/SignUpBottomSheet/interfaces';

export function useLoginController() {
  const signInBottomSheetRef = useRef<ISignInBottomSheet>(null);
  const signUpBottomSheetRef = useRef<ISignUpBottomSheet>(null);

  const navigation = useNavigation<AuthStackNavigationProps>();

  function handleOpenSignIn() {
    signInBottomSheetRef.current?.open();
  }

  function handleOpenSignUp() {
    signUpBottomSheetRef.current?.open();
  }

  function handleGoToForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  return {
    signInBottomSheetRef,
    signUpBottomSheetRef,
    handleOpenSignIn,
    handleOpenSignUp,
    handleGoToForgotPassword
  };
}
