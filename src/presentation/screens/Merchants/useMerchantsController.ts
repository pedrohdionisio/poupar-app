import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { TextMatch } from '@shared/utils/text';
import { useMemo, useRef, useState } from 'react';
import type { IEditMerchantBottomSheet } from './components/EditMerchantBottomSheet/interfaces';
import type { IMerchant } from './interfaces';
import { MOCK_MERCHANTS } from './mocks';
import { getMerchantDisplayName } from './utils';

/** Respiro entre o último item da lista e a tab bar flutuante. */
const LIST_BOTTOM_SPACING = 24;

/** Quantos estabelecimentos recentes cabem no carrossel do topo. */
const RECENT_MERCHANTS_LIMIT = 5;

export function useMerchantsController() {
  const tabBarHeight = useBottomTabBarHeight();

  const editBottomSheetRef = useRef<IEditMerchantBottomSheet>(null);

  const [searchTerm, setSearchTerm] = useState('');
  /** Apelidos editados nesta sessão, sobrepostos aos dados originais. */
  const [nicknames, setNicknames] = useState<Record<string, string>>({});

  // TODO: trocar os mocks pelos dados reais (módulo de dados de estabelecimentos).
  const merchants = useMemo(
    () =>
      MOCK_MERCHANTS.map((merchant) => ({
        ...merchant,
        nickname: nicknames[merchant.id] ?? merchant.nickname
      })),
    [nicknames]
  );

  const recentMerchants = useMemo(
    () =>
      [...merchants]
        .sort((a, b) => b.lastPurchaseAt.localeCompare(a.lastPurchaseAt))
        .slice(0, RECENT_MERCHANTS_LIMIT),
    [merchants]
  );

  const filteredMerchants = useMemo(
    () =>
      merchants
        .filter(
          (merchant) =>
            !searchTerm.trim() ||
            TextMatch.includes(getMerchantDisplayName(merchant), searchTerm) ||
            TextMatch.includes(merchant.legalName, searchTerm)
        )
        .sort((a, b) =>
          getMerchantDisplayName(a).localeCompare(getMerchantDisplayName(b), 'pt-BR')
        ),
    [merchants, searchTerm]
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  function handleClearSearch() {
    setSearchTerm('');
  }

  function handleEditPress(merchant: IMerchant) {
    editBottomSheetRef.current?.open(merchant);
  }

  function handleSaveNickname(merchantId: string, nickname: string) {
    // TODO: persistir o apelido no módulo de dados.
    setNicknames((current) => ({ ...current, [merchantId]: nickname }));
  }

  return {
    editBottomSheetRef,
    searchTerm,
    merchantsCount: merchants.length,
    recentMerchants,
    filteredMerchants,
    /** O carrossel de recentes some enquanto a busca está ativa. */
    isSearching: !!searchTerm.trim(),
    listBottomPadding: tabBarHeight + LIST_BOTTOM_SPACING,
    handleSearchChange,
    handleClearSearch,
    handleEditPress,
    handleSaveNickname
  };
}
