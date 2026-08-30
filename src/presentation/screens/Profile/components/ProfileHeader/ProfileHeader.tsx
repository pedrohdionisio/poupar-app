import { AppText } from '@presentation/components/AppText/AppText';
import { View } from 'react-native';

export function ProfileHeader() {
  return (
    <View className='gap-1 px-5 pt-8 pb-5'>
      <AppText variant='title' size='xl' color='strong'>
        Perfil
      </AppText>

      <AppText size='sm' color='muted'>
        Seus dados de conta e o acesso ao app.
      </AppText>
    </View>
  );
}
