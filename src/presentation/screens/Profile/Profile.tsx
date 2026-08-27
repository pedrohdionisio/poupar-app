import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { View } from 'react-native';
import { useProfileController } from './useProfileController';

export function Profile() {
  const { user, handleSignOut } = useProfileController();

  return (
    <View className='flex-1 justify-between bg-white px-5 py-6'>
      <View className='gap-1'>
        <AppText variant='title' size='xl' color='strong'>
          {user?.name ?? 'Perfil'}
        </AppText>

        <AppText size='sm' color='muted'>
          {user?.email}
        </AppText>
      </View>

      <Button variant='ghost' onPress={handleSignOut}>
        Sair da conta
      </Button>
    </View>
  );
}
