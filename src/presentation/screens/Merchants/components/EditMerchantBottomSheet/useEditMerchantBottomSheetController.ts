import { getMerchantErrorMessage } from '@data/modules/merchant/constants/merchantErrorMessages';
import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import {
  type EditMerchantFormType,
  editMerchantSchema
} from '@data/modules/merchant/useCases/updateAccountMerchantAlias/schemas/editMerchantSchema';
import { useUpdateAccountMerchantAlias } from '@data/modules/merchant/useCases/updateAccountMerchantAlias/useUpdateAccountMerchantAlias';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IUseEditMerchantBottomSheetController } from './interfaces';

export function useEditMerchantBottomSheetController({
  ref
}: IUseEditMerchantBottomSheetController) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { bottom } = useSafeAreaInsets();

  const { updateAlias, isUpdatingAlias } = useUpdateAccountMerchantAlias();

  const [merchant, setMerchant] = useState<IMerchant | null>(null);

  const form = useForm<EditMerchantFormType>({
    resolver: zodResolver(editMerchantSchema),
    defaultValues: {
      alias: ''
    }
  });

  const alias = form.watch('alias');

  /** Lido no render de propósito: é o que assina o `isDirty` no proxy do form. */
  const { isDirty } = form.formState;

  async function onSubmit(data: EditMerchantFormType) {
    if (!merchant) {
      return;
    }

    /** Sem alteração não há o que salvar: o PUT invalidaria a lista à toa. */
    if (!isDirty) {
      bottomSheetModalRef.current?.dismiss();
      return;
    }

    try {
      await updateAlias({ cnpj: merchant.cnpj, alias: data.alias });

      bottomSheetModalRef.current?.dismiss();
    } catch (error) {
      Alert.alert(
        'Oops!',
        getMerchantErrorMessage(error, 'Não foi possível salvar o nome')
      );
    }
  }

  /**
   * Só limpa o campo: o nome original volta a valer quando o usuário salva. O
   * `shouldDirty` é obrigatório — sem ele o `setValue` não marca o form como
   * alterado e o Salvar seguinte seria descartado pela guarda acima.
   */
  function handleClearAlias() {
    form.setValue('alias', '', { shouldDirty: true });
  }

  useImperativeHandle(
    ref,
    () => ({
      open: (nextMerchant: IMerchant) => {
        setMerchant(nextMerchant);
        form.reset({ alias: nextMerchant.alias ?? '' });
        bottomSheetModalRef.current?.present();
      }
    }),
    [form]
  );

  return {
    bottomSheetModalRef,
    bottom,
    merchant,
    form,
    isUpdatingAlias,
    canClearAlias: !!alias.trim(),
    handleSubmit: form.handleSubmit(onSubmit),
    handleClearAlias
  };
}
