import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import { AppText } from '@presentation/components/AppText/AppText';
import { FlatList, View } from 'react-native';
import { RecentMerchantCard } from '../RecentMerchantCard/RecentMerchantCard';
import type { IRecentMerchantsProps } from './interfaces';

/** Mesmo padding horizontal da tela, reposto após o `-mx-5`. */
const HORIZONTAL_PADDING = 20;

function RecentMerchantsSeparator() {
  return <View className='w-3' />;
}

export function RecentMerchants({ merchants, onMerchantPress }: IRecentMerchantsProps) {
  return (
    <View className='gap-3'>
      <AppText variant='title' size='lg' color='strong'>
        Últimos estabelecimentos
      </AppText>

      {/* O `-mx-5` anula o padding da lista de fora para o carrossel correr de borda a borda. */}
      <FlatList
        className='-mx-5'
        data={merchants}
        keyExtractor={(merchant: IMerchant) => merchant.cnpj}
        renderItem={({ item }) => (
          <RecentMerchantCard merchant={item} onPress={onMerchantPress} />
        )}
        ItemSeparatorComponent={RecentMerchantsSeparator}
        contentContainerStyle={{ paddingHorizontal: HORIZONTAL_PADDING }}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
}
