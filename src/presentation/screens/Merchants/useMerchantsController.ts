import { getMerchantErrorMessage } from '@data/modules/merchant/constants/merchantErrorMessages';
import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import { useDeleteMerchant } from '@data/modules/merchant/useCases/deleteMerchant/useDeleteMerchant';
import { useListMerchants } from '@data/modules/merchant/useCases/listMerchants/useListMerchants';
import type { IMerchantFormBottomSheet } from '@presentation/components/MerchantFormBottomSheet/interfaces';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { TextMatch } from '@shared/utils/text';
import { useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';

/** Respiro entre o último item da lista e a tab bar flutuante. */
const LIST_BOTTOM_SPACING = 24;

/** Quantos estabelecimentos recentes cabem no carrossel do topo. */
const RECENT_MERCHANTS_LIMIT = 5;

const ERROR_FALLBACK = 'Verifique sua conexão e tente de novo.';

/** Referência estável para a lista não trocar de identidade a cada render. */
const EMPTY_MERCHANTS: IMerchant[] = [];

export function useMerchantsController() {
  const merchantFormRef = useRef<IMerchantFormBottomSheet>(null);

  const tabBarHeight = useBottomTabBarHeight();

  const {
    merchants,
    loadMerchants,
    isLoadingMerchants,
    isRefetchingMerchants,
    hasMerchantsError,
    merchantsError
  } = useListMerchants();

  const { deleteMerchant } = useDeleteMerchant();

  const [searchTerm, setSearchTerm] = useState('');

  const allMerchants = merchants ?? EMPTY_MERCHANTS;

  const recentMerchants = useMemo(
    () =>
      allMerchants
        /** Quem nunca teve compra não tem "última vez" para mostrar no card. */
        .filter((merchant) => !!merchant.lastPurchaseAt)
        .sort((a, b) => (b.lastPurchaseAt ?? '').localeCompare(a.lastPurchaseAt ?? ''))
        .slice(0, RECENT_MERCHANTS_LIMIT),
    [allMerchants]
  );

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

  const isSearching = !!searchTerm.trim();

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  function handleClearSearch() {
    setSearchTerm('');
  }

  function handleCreatePress() {
    merchantFormRef.current?.open();
  }

  function handleEditPress(merchant: IMerchant) {
    merchantFormRef.current?.open(merchant);
  }

  async function removeMerchant(merchant: IMerchant) {
    try {
      await deleteMerchant(merchant.id);
    } catch (error) {
      Alert.alert(
        'Oops!',
        getMerchantErrorMessage(error, 'Não foi possível excluir o estabelecimento')
      );
    }
  }

  /** Exclusão some da lista sem desfazer: vale confirmar antes de disparar. */
  function handleDeletePress(merchant: IMerchant) {
    Alert.alert(
      'Excluir estabelecimento',
      `"${merchant.name}" será removido da sua lista. Essa ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => removeMerchant(merchant)
        }
      ]
    );
  }

  function handleRetry() {
    loadMerchants();
  }

  return {
    merchantFormRef,
    searchTerm,
    recentMerchants,
    filteredMerchants,
    isLoadingMerchants,
    isRefetchingMerchants,
    /**
     * Um refetch que falha (o disparado pela mutation, por exemplo) não pode
     * apagar da tela a lista que ainda está em cache e continua válida.
     */
    hasMerchantsError: hasMerchantsError && allMerchants.length === 0,
    errorMessage: getMerchantErrorMessage(merchantsError, ERROR_FALLBACK),
    /** O carrossel de recentes some enquanto a busca está ativa. */
    hasRecentMerchants: !isSearching && recentMerchants.length > 0,
    hasMerchants: filteredMerchants.length > 0,
    listBottomPadding: tabBarHeight + LIST_BOTTOM_SPACING,
    handleSearchChange,
    handleClearSearch,
    handleCreatePress,
    handleEditPress,
    handleDeletePress,
    handleRetry
  };
}
