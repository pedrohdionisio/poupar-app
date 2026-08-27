import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IMerchant } from '../../interfaces';
import type { IUseEditMerchantBottomSheetController } from './interfaces';
import { type EditMerchantFormType, editMerchantSchema } from './schema';

export function useEditMerchantBottomSheetController({
  ref,
  onSave
}: IUseEditMerchantBottomSheetController) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const [merchant, setMerchant] = useState<IMerchant | null>(null);

  const form = useForm<EditMerchantFormType>({
    resolver: zodResolver(editMerchantSchema),
    defaultValues: {
      nickname: ''
    }
  });

  const nickname = form.watch('nickname');

  useImperativeHandle(
    ref,
    () => ({
      open: (nextMerchant: IMerchant) => {
        setMerchant(nextMerchant);
        form.reset({ nickname: nextMerchant.nickname ?? '' });
        bottomSheetModalRef.current?.present();
      }
    }),
    [form]
  );

  function onSubmit(data: EditMerchantFormType) {
    if (!merchant) {
      return;
    }

    onSave(merchant.id, data.nickname.trim());
    bottomSheetModalRef.current?.dismiss();
  }

  /** Só limpa o campo: o nome original volta a valer quando o usuário salva. */
  function handleClearNickname() {
    form.setValue('nickname', '');
  }

  return {
    bottomSheetModalRef,
    bottom,
    merchant,
    form,
    canClearNickname: !!nickname.trim(),
    handleSubmit: form.handleSubmit(onSubmit),
    handleClearNickname
  };
}
