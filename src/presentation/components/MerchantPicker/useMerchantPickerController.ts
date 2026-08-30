import { getMerchantErrorMessage } from '@data/modules/merchant/constants/merchantErrorMessages';
import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import { useListMerchants } from '@data/modules/merchant/useCases/listMerchants/useListMerchants';
import { TextMatch } from '@shared/utils/text';
import { useMemo, useState } from 'react';

const ERROR_FALLBACK = 'Verifique sua conexão e tente de novo.';

/** Referência estável para a lista não trocar de identidade a cada render. */
const EMPTY_MERCHANTS: IMerchant[] = [];

export function useMerchantPickerController() {
  const {
    merchants,
    loadMerchants,
    isLoadingMerchants,
    isRefetchingMerchants,
    hasMerchantsError,
    merchantsError
  } = useListMerchants();

  const [searchTerm, setSearchTerm] = useState('');

  const allMerchants = merchants ?? EMPTY_MERCHANTS;

  const filteredMerchants = useMemo(
    () =>
      allMerchants
        .filter(
          (merchant) =>
            !searchTerm.trim() || TextMatch.includes(merchant.name, searchTerm)
        )
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [allMerchants, searchTerm]
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  function handleClearSearch() {
    setSearchTerm('');
  }

  function handleRetry() {
    loadMerchants();
  }

  return {
    searchTerm,
    filteredMerchants,
    isLoadingMerchants,
    isRetrying: isRefetchingMerchants,
    /**
     * Um refetch que falha não pode apagar da tela a lista que ainda está em
     * cache e continua servindo para escolher.
     */
    hasMerchantsError: hasMerchantsError && allMerchants.length === 0,
    errorMessage: getMerchantErrorMessage(merchantsError, ERROR_FALLBACK),
    /** A busca sem resultado precisa de um texto diferente de "não há nada". */
    isSearching: !!searchTerm.trim(),
    handleSearchChange,
    handleClearSearch,
    handleRetry
  };
}
