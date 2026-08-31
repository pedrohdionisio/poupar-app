import type { IAccountProduct } from '@data/modules/product/types/Product';
import { useListAccountProducts } from '@data/modules/product/useCases/listAccountProducts/useListAccountProducts';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { TextMatch } from '@shared/utils/text';
import { useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IUseProductPickerBottomSheetController } from './interfaces';

/** Referência estável para a lista não trocar de identidade a cada render. */
const EMPTY_PRODUCTS: IAccountProduct[] = [];

export function useProductPickerBottomSheetController({
  ref,
  onSelect
}: IUseProductPickerBottomSheetController) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { bottom } = useSafeAreaInsets();

  const { products, isLoadingProducts } = useListAccountProducts();

  const [searchTerm, setSearchTerm] = useState('');

  const allProducts = products ?? EMPTY_PRODUCTS;

  /**
   * Mais comprados primeiro: é o produto do dia a dia que o usuário quer
   * acompanhar, e ele estaria no fim de uma ordem alfabética.
   */
  const filteredProducts = useMemo(
    () =>
      allProducts
        .filter(
          (product) => !searchTerm.trim() || TextMatch.includes(product.name, searchTerm)
        )
        .sort((a, b) => b.purchasesCount - a.purchasesCount),
    [allProducts, searchTerm]
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  function handleClearSearch() {
    setSearchTerm('');
  }

  /** Escolher já fecha: o sheet existe só para essa decisão. */
  function handleSelect(product: IAccountProduct) {
    onSelect(product);
    bottomSheetModalRef.current?.dismiss();
  }

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present()
  }));

  return {
    bottomSheetModalRef,
    bottom,
    searchTerm,
    filteredProducts,
    isLoadingProducts,
    /** A busca sem resultado precisa de um texto diferente de "não há nada". */
    isSearching: !!searchTerm.trim(),
    handleSearchChange,
    handleClearSearch,
    handleSelect
  };
}
