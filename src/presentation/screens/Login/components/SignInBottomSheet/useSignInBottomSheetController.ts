import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useImperativeHandle, useRef } from 'react';
import type { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IUseSignInBottomSheetController } from './interfaces';

export function useSignInBottomSheetController({ ref }: IUseSignInBottomSheetController) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { bottom } = useSafeAreaInsets();

  function handleSubmit() {
    alert('Fez o submit');
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
    handleSubmit
  };
}
