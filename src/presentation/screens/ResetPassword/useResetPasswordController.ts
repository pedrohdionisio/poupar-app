import { getAuthErrorMessage } from '@data/modules/auth/constants/authErrorMessages';
import {
  type ResetPasswordFormType,
  resetPasswordSchema
} from '@data/modules/auth/useCases/resetPassword/schemas/resetPasswordSchema';
import { useResetPassword } from '@data/modules/auth/useCases/resetPassword/useResetPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, type TextInput } from 'react-native';
import type {
  AuthStackNavigationProps,
  AuthStackRouteProps
} from '@/shared/navigation/AuthStack';

export function useResetPasswordController() {
  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: '',
      password: ''
    }
  });

  const { resetPassword } = useResetPassword();
  const navigation = useNavigation<AuthStackNavigationProps>();
  const route = useRoute<AuthStackRouteProps<'ResetPassword'>>();

  const passwordInputRef = useRef<TextInput>(null);

  async function onSubmit(data: ResetPasswordFormType) {
    try {
      await resetPassword({
        email: route.params.email,
        code: data.code,
        password: data.password
      });

      Alert.alert('Sucesso!', 'Sua senha foi redefinida com sucesso');

      navigation.navigate('Login');
    } catch (error) {
      Alert.alert(
        'Oops!',
        getAuthErrorMessage(error, 'Não foi possível redefinir a senha')
      );
    }
  }

  return {
    form,
    passwordInputRef,
    handleSubmit: form.handleSubmit(onSubmit)
  };
}
