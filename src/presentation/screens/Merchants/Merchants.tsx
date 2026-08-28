import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import { EditMerchantBottomSheet } from './components/EditMerchantBottomSheet/EditMerchantBottomSheet';
import { MerchantsContent } from './components/MerchantsContent/MerchantsContent';
import { MerchantsHeader } from './components/MerchantsHeader/MerchantsHeader';
import { MerchantsSearchInput } from './components/MerchantsSearchInput/MerchantsSearchInput';
import { useMerchantsController } from './useMerchantsController';

export function Merchants() {
  const {
    editBottomSheetRef,
    searchTerm,
    recentMerchants,
    filteredMerchants,
    hasRecentMerchants,
    hasMerchants,
    isLoadingMerchants,
    isRefetchingMerchants,
    hasMerchantsError,
    errorMessage,
    listBottomPadding,
    handleSearchChange,
    handleClearSearch,
    handleEditPress,
    handleRetry
  } = useMerchantsController();

  return (
    <ScreenLayout edges={['top']}>
      <MerchantsHeader />

      <MerchantsSearchInput
        value={searchTerm}
        onChangeText={handleSearchChange}
        onClear={handleClearSearch}
      />

      <MerchantsContent
        recentMerchants={recentMerchants}
        filteredMerchants={filteredMerchants}
        searchTerm={searchTerm}
        hasRecentMerchants={hasRecentMerchants}
        hasMerchants={hasMerchants}
        isLoading={isLoadingMerchants}
        isRetrying={isRefetchingMerchants}
        hasError={hasMerchantsError}
        errorMessage={errorMessage}
        bottomPadding={listBottomPadding}
        onEditPress={handleEditPress}
        onRetry={handleRetry}
      />

      <EditMerchantBottomSheet ref={editBottomSheetRef} />
    </ScreenLayout>
  );
}
