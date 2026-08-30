import { useAuth } from '@data/contexts/AuthProvider';
import { AppText } from '@presentation/components/AppText/AppText';
import { GreenFullLogo } from '@shared/assets/svgs/GreenFullLogo';
import { View } from 'react-native';

export function ReceiptsHeader() {
  const { user } = useAuth();

  return (
    <View className='gap-1 px-5 pt-8 pb-6'>
      <AppText variant='title' size='xl' color='strong' numberOfLines={1}>
        Olá, {user?.name}
      </AppText>

      <View className='flex-row items-center gap-2'>
        <AppText size='sm' color='muted'>
          seja bem-vindo ao
        </AppText>

        <GreenFullLogo height={20} />
      </View>
    </View>
  );
}
