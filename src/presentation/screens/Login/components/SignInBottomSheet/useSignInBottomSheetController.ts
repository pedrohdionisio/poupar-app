import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useImperativeHandle, useRef } from 'react';
import type { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { AuthStackNavigationProps } from '@/shared/navigation/AuthStack';
import type { IUseSignInBottomSheetController } from './interfaces';

export function useSignInBottomSheetController({ ref }: IUseSignInBottomSheetController) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<AuthStackNavigationProps>();

  const { bottom } = useSafeAreaInsets();

  function handleSubmit() {
    navigation.navigate('Home');
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
