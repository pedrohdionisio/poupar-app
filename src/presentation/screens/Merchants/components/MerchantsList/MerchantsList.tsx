import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import { FlatList, View } from 'react-native';
import { MerchantListItem } from '../MerchantListItem/MerchantListItem';
import { MerchantsListEmpty } from '../MerchantsListEmpty/MerchantsListEmpty';
import type { IMerchantsListProps } from './interfaces';

const HORIZONTAL_PADDING = 20;

function MerchantsListSeparator() {
  return <View className='h-px bg-grays-200' />;
}

export function MerchantsList({
  merchants,
  searchTerm,
  bottomPadding,
  onCreatePress,
  onEditPress,
  onDeletePress,
  ListHeaderComponent
}: IMerchantsListProps) {
  return (
    <FlatList
      data={merchants}
      keyExtractor={(merchant: IMerchant) => merchant.id}
      renderItem={({ item }) => (
        <MerchantListItem
          merchant={item}
          onEditPress={onEditPress}
          onDeletePress={onDeletePress}
        />
      )}
      ItemSeparatorComponent={MerchantsListSeparator}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <MerchantsListEmpty searchTerm={searchTerm} onCreatePress={onCreatePress} />
      }
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='on-drag'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingBottom: bottomPadding
      }}
    />
  );
}
