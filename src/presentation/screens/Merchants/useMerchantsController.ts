import { getMerchantErrorMessage } from '@data/modules/merchant/constants/merchantErrorMessages';
import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import { useListAccountMerchants } from '@data/modules/merchant/useCases/listAccountMerchants/useListAccountMerchants';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { TextMatch } from '@shared/utils/text';
import { useMemo, useRef, useState } from 'react';
import type { IEditMerchantBottomSheet } from './components/EditMerchantBottomSheet/interfaces';
import { getMerchantDisplayName } from './utils';

/** Respiro entre o último item da lista e a tab bar flutuante. */
const LIST_BOTTOM_SPACING = 24;

/** Quantos estabelecimentos recentes cabem no carrossel do topo. */
const RECENT_MERCHANTS_LIMIT = 5;

const ERROR_FALLBACK = 'Verifique sua conexão e tente de novo.';

/** Referência estável para a lista não trocar de identidade a cada render. */
const EMPTY_MERCHANTS: IMerchant[] = [];

export function useMerchantsController() {
  const editBottomSheetRef = useRef<IEditMerchantBottomSheet>(null);

  const tabBarHeight = useBottomTabBarHeight();

  const {
    merchants,
    loadMerchants,
    isLoadingMerchants,
    isRefetchingMerchants,
    hasMerchantsError,
    merchantsError
  } = useListAccountMerchants();

  const [searchTerm, setSearchTerm] = useState('');

  const accountMerchants = merchants ?? EMPTY_MERCHANTS;

  const recentMerchants = useMemo(
    () =>
      [...accountMerchants]
        .sort((a, b) => b.lastPurchaseAt.localeCompare(a.lastPurchaseAt))
        .slice(0, RECENT_MERCHANTS_LIMIT),
    [accountMerchants]
  );

  const filteredMerchants = useMemo(
    () =>
      accountMerchants
        .filter(
          (merchant) =>
            !searchTerm.trim() ||
            TextMatch.includes(getMerchantDisplayName(merchant), searchTerm) ||
            TextMatch.includes(merchant.name, searchTerm)
        )
        .sort((a, b) =>
          getMerchantDisplayName(a).localeCompare(getMerchantDisplayName(b), 'pt-BR')
        ),
    [accountMerchants, searchTerm]
  );

  const isSearching = !!searchTerm.trim();

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  function handleClearSearch() {
    setSearchTerm('');
  }

  function handleEditPress(merchant: IMerchant) {
    editBottomSheetRef.current?.open(merchant);
  }

  function handleRetry() {
    loadMerchants();
  }

  return {
    editBottomSheetRef,
    searchTerm,
    recentMerchants,
    filteredMerchants,
    isLoadingMerchants,
    isRefetchingMerchants,
    /**
     * Um refetch que falha (o disparado pela mutation, por exemplo) não pode
     * apagar da tela a lista que ainda está em cache e continua válida.
     */
    hasMerchantsError: hasMerchantsError && accountMerchants.length === 0,
    errorMessage: getMerchantErrorMessage(merchantsError, ERROR_FALLBACK),
    /** O carrossel de recentes some enquanto a busca está ativa. */
    hasRecentMerchants: !isSearching && recentMerchants.length > 0,
    hasMerchants: filteredMerchants.length > 0,
    listBottomPadding: tabBarHeight + LIST_BOTTOM_SPACING,
    handleSearchChange,
    handleClearSearch,
    handleEditPress,
    handleRetry
  };
}
