import { AppText } from '@presentation/components/AppText/AppText';
import { View } from 'react-native';

export function Statistics() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <AppText variant='title' size='xl'>
        Estatísticas
      </AppText>
    </View>
  );
}
