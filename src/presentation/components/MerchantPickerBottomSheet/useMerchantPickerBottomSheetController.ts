import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useImperativeHandle, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IUseMerchantPickerBottomSheetController } from './interfaces';

export function useMerchantPickerBottomSheetController({
  ref
}: IUseMerchantPickerBottomSheetController) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { bottom } = useSafeAreaInsets();

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present(),
    close: () => bottomSheetModalRef.current?.dismiss()
  }));

  return { bottomSheetModalRef, bottom };
}
