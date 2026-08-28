import { useAuth } from '@data/contexts/AuthProvider';
import { getAuthErrorMessage } from '@data/modules/auth/constants/authErrorMessages';
import type { AccountRoleType } from '@data/modules/auth/types/AuthTypes';
import {
  type SignUpFormType,
  signUpSchema
} from '@data/modules/auth/useCases/signUp/schemas/signUpSchema';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import type { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IUseSignUpBottomSheetController } from './interfaces';

/** Cadastro pelo app sempre cria conta comum; ADMIN é provisionado fora dele. */
const SIGN_UP_ROLE: AccountRoleType = 'USER';

export function useSignUpBottomSheetController({ ref }: IUseSignUpBottomSheetController) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { bottom } = useSafeAreaInsets();

  const { signUp } = useAuth();

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  async function onSubmit(data: SignUpFormType) {
    try {
      await signUp({ ...data, role: SIGN_UP_ROLE });

      bottomSheetModalRef.current?.dismiss();
    } catch (error) {
      Alert.alert(
        'Oops!',
        getAuthErrorMessage(error, 'Não foi possível criar sua conta')
      );
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
    emailInputRef,
    passwordInputRef,
    form,
    handleSubmit: form.handleSubmit(onSubmit)
  };
}
