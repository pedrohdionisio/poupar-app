import type { IPurchase } from '@data/modules/purchase/types/Purchase';
import { FlatList, View } from 'react-native';
import { ReceiptListItem } from '../ReceiptListItem/ReceiptListItem';
import { ReceiptsListEmpty } from '../ReceiptsListEmpty/ReceiptsListEmpty';
import type { IReceiptsListProps } from './interfaces';

const HORIZONTAL_PADDING = 20;

function ReceiptsListSeparator() {
  return <View className='h-px bg-grays-200' />;
}

export function ReceiptsList({
  receipts,
  bottomPadding,
  onReceiptPress,
  ListHeaderComponent
}: IReceiptsListProps) {
  return (
    <FlatList
      data={receipts}
      keyExtractor={(receipt: IPurchase) => receipt.id}
      renderItem={({ item }) => (
        <ReceiptListItem receipt={item} onPress={onReceiptPress} />
      )}
      ItemSeparatorComponent={ReceiptsListSeparator}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ReceiptsListEmpty}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingBottom: bottomPadding
      }}
    />
  );
}
