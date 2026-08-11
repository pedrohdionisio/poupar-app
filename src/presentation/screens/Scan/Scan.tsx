import { AppText } from '@presentation/components/AppText/AppText';
import { View } from 'react-native';

export function Scan() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <AppText variant='title' size='xl'>
        Escanear nota
      </AppText>
    </View>
  );
}
