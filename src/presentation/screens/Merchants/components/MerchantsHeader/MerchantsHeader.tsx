import { AppText } from '@presentation/components/AppText/AppText';
import { View } from 'react-native';

export function MerchantsHeader() {
  return (
    <View className='gap-1 px-5 pt-2 pb-5'>
      <AppText variant='title' size='xl' color='strong'>
        Estabelecimentos
      </AppText>

      <AppText size='sm' color='muted'>
        Lugares onde você já comprou. Renomeie para reconhecer de bate-pronto.
      </AppText>
    </View>
  );
}
