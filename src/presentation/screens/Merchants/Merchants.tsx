import { MerchantFormBottomSheet } from '@presentation/components/MerchantFormBottomSheet/MerchantFormBottomSheet';
import { SearchInput } from '@presentation/components/SearchInput/SearchInput';
import { View } from 'react-native';
import { MerchantsContent } from './components/MerchantsContent/MerchantsContent';
import { MerchantsHeader } from './components/MerchantsHeader/MerchantsHeader';
import { useMerchantsController } from './useMerchantsController';

export function Merchants() {
  const {
    merchantFormRef,
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
    handleCreatePress,
    handleEditPress,
    handleDeletePress,
    handleRetry
  } = useMerchantsController();

  return (
    <View className='flex-1'>
      <MerchantsHeader onCreatePress={handleCreatePress} />

      <SearchInput
        className='mx-5 mb-6'
        value={searchTerm}
        placeholder='Buscar estabelecimento'
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
        onCreatePress={handleCreatePress}
        onEditPress={handleEditPress}
        onDeletePress={handleDeletePress}
        onRetry={handleRetry}
      />

      <MerchantFormBottomSheet ref={merchantFormRef} />
    </View>
  );
}
