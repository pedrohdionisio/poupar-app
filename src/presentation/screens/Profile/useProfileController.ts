import { useAuth } from '@data/contexts/AuthProvider';
import { Alert } from 'react-native';

export function useProfileController() {
  const { user, signOut } = useAuth();

  function handleSignOut() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => signOut() }
    ]);
  }

  return {
    user,
    handleSignOut
  };
}
