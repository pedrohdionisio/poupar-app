import { COLORS } from '@shared/constants/colors';
import { ActivityIndicator, View } from 'react-native';

export function ReceiptsLoading() {
  return (
    <View className='flex-1 items-center justify-center'>
      <ActivityIndicator size='large' color={COLORS.brand.main} />
    </View>
  );
}
