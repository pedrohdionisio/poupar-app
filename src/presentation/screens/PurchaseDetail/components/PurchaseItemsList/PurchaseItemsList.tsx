import type { IPurchaseReceiptItem } from '@data/modules/purchase/types/Purchase';
import { FlatList, View } from 'react-native';
import { PurchaseItemRow } from '../PurchaseItemRow/PurchaseItemRow';
import { PurchaseItemsPlaceholder } from '../PurchaseItemsPlaceholder/PurchaseItemsPlaceholder';
import type { IPurchaseItemsListProps } from './interfaces';

const HORIZONTAL_PADDING = 20;

const BOTTOM_PADDING = 32;

function PurchaseItemsListSeparator() {
  return <View className='h-px bg-grays-200' />;
}

export function PurchaseItemsList({
  items,
  isLoading,
  isRetrying,
  hasError,
  isReceiptNotFound,
  errorMessage,
  onRetry,
  ListHeaderComponent
}: IPurchaseItemsListProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item: IPurchaseReceiptItem) => String(item.seq)}
      renderItem={({ item }) => <PurchaseItemRow item={item} />}
      ItemSeparatorComponent={PurchaseItemsListSeparator}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <PurchaseItemsPlaceholder
          isLoading={isLoading}
          isRetrying={isRetrying}
          hasError={hasError}
          isReceiptNotFound={isReceiptNotFound}
          errorMessage={errorMessage}
          onRetry={onRetry}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingBottom: BOTTOM_PADDING
      }}
    />
  );
}
