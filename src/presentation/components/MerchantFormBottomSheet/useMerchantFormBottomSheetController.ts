import { getMerchantErrorMessage } from '@data/modules/merchant/constants/merchantErrorMessages';
import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import {
  type MerchantFormType,
  merchantSchema
} from '@data/modules/merchant/useCases/createMerchant/schemas/merchantSchema';
import { useCreateMerchant } from '@data/modules/merchant/useCases/createMerchant/useCreateMerchant';
import { useUpdateMerchant } from '@data/modules/merchant/useCases/updateMerchant/useUpdateMerchant';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cnpj } from '@shared/utils/cnpj';
import { useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IUseMerchantFormBottomSheetController } from './interfaces';

const EMPTY_FORM: MerchantFormType = {
  name: '',
  category: 'SUPERMARKET',
  cnpj: ''
};

export function useMerchantFormBottomSheetController({
  ref,
  onSaved
}: IUseMerchantFormBottomSheetController) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { bottom } = useSafeAreaInsets();

  const { createMerchant, isCreatingMerchant } = useCreateMerchant();
  const { updateMerchant, isUpdatingMerchant } = useUpdateMerchant();

  /** `null` no modo cadastro; o estabelecimento em edição no modo edição. */
  const [merchant, setMerchant] = useState<IMerchant | null>(null);

  const form = useForm<MerchantFormType>({
    resolver: zodResolver(merchantSchema),
    defaultValues: EMPTY_FORM
  });

  async function onSubmit(data: MerchantFormType) {
    try {
      if (merchant) {
        await updateMerchant({ ...data, merchantId: merchant.id });

        bottomSheetModalRef.current?.dismiss();
        onSaved?.(merchant.id);

        return;
      }

      const { id } = await createMerchant(data);

      bottomSheetModalRef.current?.dismiss();
      onSaved?.(id);
    } catch (error) {
      Alert.alert(
        'Oops!',
        getMerchantErrorMessage(error, 'Não foi possível salvar o estabelecimento')
      );
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      open: (nextMerchant?: IMerchant) => {
        setMerchant(nextMerchant ?? null);

        form.reset(
          nextMerchant
            ? {
                name: nextMerchant.name,
                category: nextMerchant.category,
                /** O CNPJ chega só com dígitos; o campo trabalha mascarado. */
                cnpj: nextMerchant.cnpj ? Cnpj.mask(nextMerchant.cnpj) : ''
              }
            : EMPTY_FORM
        );

        bottomSheetModalRef.current?.present();
      }
    }),
    [form]
  );

  return {
    bottomSheetModalRef,
    bottom,
    form,
    isEditing: !!merchant,
    isSaving: isCreatingMerchant || isUpdatingMerchant,
    handleSubmit: form.handleSubmit(onSubmit)
  };
}
