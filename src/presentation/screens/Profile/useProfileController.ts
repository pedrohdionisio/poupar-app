import { useAuth } from '@data/contexts/AuthProvider';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRef } from 'react';
import { Alert } from 'react-native';
import type { IEditNameBottomSheet } from './components/EditNameBottomSheet/interfaces';

const CONTENT_BOTTOM_SPACING = 24;

export function useProfileController() {
  const editNameBottomSheetRef = useRef<IEditNameBottomSheet>(null);

  const tabBarHeight = useBottomTabBarHeight();

  const { user, signOut } = useAuth();

  function handleEditNamePress() {
    editNameBottomSheetRef.current?.open();
  }

  function handleSignOut() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => signOut() }
    ]);
  }

  return {
    editNameBottomSheetRef,
    user,
    contentBottomPadding: tabBarHeight + CONTENT_BOTTOM_SPACING,
    handleEditNamePress,
    handleSignOut
  };
}
