import { COLORS } from '@shared/constants/colors';
import { ActivityIndicator, View } from 'react-native';

export function ScanLoading() {
  return (
    <View className='items-center'>
      <ActivityIndicator size='large' color={COLORS.brand.main} />
    </View>
  );
}
