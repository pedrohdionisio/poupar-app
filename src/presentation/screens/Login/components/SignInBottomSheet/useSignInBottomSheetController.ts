import { useAuth } from '@data/contexts/AuthProvider';
import { getAuthErrorMessage } from '@data/modules/auth/constants/authErrorMessages';
import {
  type SignInFormType,
  signInSchema
} from '@data/modules/auth/useCases/signIn/schemas/signInSchema';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import type { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IUseSignInBottomSheetController } from './interfaces';

export function useSignInBottomSheetController({ ref }: IUseSignInBottomSheetController) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { bottom } = useSafeAreaInsets();

  const { signIn } = useAuth();

  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(data: SignInFormType) {
    try {
      await signIn(data);

      bottomSheetModalRef.current?.dismiss();
    } catch (error) {
      Alert.alert('Oops!', getAuthErrorMessage(error, 'Não foi possível entrar'));
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present()
    }),
    []
  );

  return {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    form,
    handleSubmit: form.handleSubmit(onSubmit)
  };
}
