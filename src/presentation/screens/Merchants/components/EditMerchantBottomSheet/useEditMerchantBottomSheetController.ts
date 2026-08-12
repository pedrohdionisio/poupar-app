import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useImperativeHandle, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IMerchant } from '../../interfaces';
import type { IUseEditMerchantBottomSheetController } from './interfaces';

export function useEditMerchantBottomSheetController({
  ref,
  onSave
}: IUseEditMerchantBottomSheetController) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { bottom } = useSafeAreaInsets();

  const [merchant, setMerchant] = useState<IMerchant | null>(null);
  const [nickname, setNickname] = useState('');

  useImperativeHandle(
    ref,
    () => ({
      open: (nextMerchant: IMerchant) => {
        setMerchant(nextMerchant);
        setNickname(nextMerchant.nickname ?? '');
        bottomSheetModalRef.current?.present();
      }
    }),
    []
  );

  function handleSubmit() {
    if (!merchant) return;

    onSave(merchant.id, nickname.trim());
    bottomSheetModalRef.current?.dismiss();
  }

  /** Só limpa o campo: o nome original volta a valer quando o usuário salva. */
  function handleClearNickname() {
    setNickname('');
  }

  return {
    bottomSheetModalRef,
    bottom,
    merchant,
    nickname,
    canClearNickname: !!nickname.trim(),
    setNickname,
    handleSubmit,
    handleClearNickname
  };
}
