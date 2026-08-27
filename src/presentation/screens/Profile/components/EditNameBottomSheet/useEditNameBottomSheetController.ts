import { useAuth } from '@data/contexts/AuthProvider';
import { getAuthErrorMessage } from '@data/modules/auth/constants/authErrorMessages';
import {
  type UpdateNameFormType,
  updateNameSchema
} from '@data/modules/auth/schemas/updateNameSchema';
import { useUpdateAccount } from '@data/modules/auth/useCases/updateAccount/useUpdateAccount';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IUseEditNameBottomSheetController } from './interfaces';

export function useEditNameBottomSheetController({
  ref
}: IUseEditNameBottomSheetController) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { bottom } = useSafeAreaInsets();

  const { user } = useAuth();
  const { updateAccount, isUpdatingAccount } = useUpdateAccount();

  const form = useForm<UpdateNameFormType>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: ''
    }
  });

  async function onSubmit({ name }: UpdateNameFormType) {
    if (!user) {
      return;
    }

    try {
      /** O `role` vai inalterado: a rota exige o campo, mas o app não o edita. */
      await updateAccount({ accountId: user.id, name, role: user.role });

      bottomSheetModalRef.current?.dismiss();
    } catch (error) {
      Alert.alert(
        'Oops!',
        getAuthErrorMessage(error, 'Não foi possível salvar seu nome')
      );
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        form.reset({ name: user?.name ?? '' });
        bottomSheetModalRef.current?.present();
      }
    }),
    [form, user]
  );

  return {
    bottomSheetModalRef,
    bottom,
    form,
    isUpdatingAccount,
    handleSubmit: form.handleSubmit(onSubmit)
  };
}
