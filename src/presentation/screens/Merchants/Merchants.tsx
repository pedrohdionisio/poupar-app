import { AppText } from '@presentation/components/AppText/AppText';
import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import { cn } from '@shared/utils/cn';
import { EditMerchantBottomSheet } from './components/EditMerchantBottomSheet/EditMerchantBottomSheet';
import { MerchantsHeader } from './components/MerchantsHeader/MerchantsHeader';
import { MerchantsList } from './components/MerchantsList/MerchantsList';
import { MerchantsSearchInput } from './components/MerchantsSearchInput/MerchantsSearchInput';
import { RecentMerchants } from './components/RecentMerchants/RecentMerchants';
import { useMerchantsController } from './useMerchantsController';

export function Merchants() {
  const {
    editBottomSheetRef,
    searchTerm,
    recentMerchants,
    filteredMerchants,
    isSearching,
    listBottomPadding,
    handleSearchChange,
    handleClearSearch,
    handleEditPress,
    handleSaveNickname
  } = useMerchantsController();

  return (
    <ScreenLayout edges={['top']}>
      <MerchantsHeader />

      <MerchantsSearchInput
        value={searchTerm}
        onChangeText={handleSearchChange}
        onClear={handleClearSearch}
      />

      <MerchantsList
        merchants={filteredMerchants}
        searchTerm={searchTerm}
        bottomPadding={listBottomPadding}
        onEditPress={handleEditPress}
        ListHeaderComponent={
          <>
            {!isSearching && (
              <RecentMerchants
                merchants={recentMerchants}
                onMerchantPress={handleEditPress}
              />
            )}

            <AppText
              variant='title'
              size='lg'
              color='strong'
              className={cn('mb-1', !isSearching && 'mt-8')}
            >
              Todos os estabelecimentos
            </AppText>
          </>
        }
      />

      <EditMerchantBottomSheet ref={editBottomSheetRef} onSave={handleSaveNickname} />
    </ScreenLayout>
  );
}
