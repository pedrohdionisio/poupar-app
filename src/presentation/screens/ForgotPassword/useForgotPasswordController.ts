import { getAuthErrorMessage } from '@data/modules/auth/constants/authErrorMessages';
import {
  type ForgotPasswordFormType,
  forgotPasswordSchema
} from '@data/modules/auth/useCases/forgotPassword/schemas/forgotPasswordSchema';
import { useForgotPassword } from '@data/modules/auth/useCases/forgotPassword/useForgotPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import type { AuthStackNavigationProps } from '@/shared/navigation/AuthStack';

export function useForgotPasswordController() {
  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const { forgotPassword } = useForgotPassword();
  const navigation = useNavigation<AuthStackNavigationProps>();

  async function onSubmit(data: ForgotPasswordFormType) {
    try {
      await forgotPassword(data);

      /** O reset exige o e-mail junto do código, então ele viaja por param. */
      navigation.navigate('ResetPassword', { email: data.email });
    } catch (error) {
      Alert.alert(
        'Oops!',
        getAuthErrorMessage(error, 'Não foi possível enviar o e-mail de recuperação')
      );
    }
  }

  function handleBackPress() {
    navigation.goBack();
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    handleBackPress
  };
}
