import { useListCategorySpends } from '@data/modules/categorySpend/useCases/listCategorySpends/useListCategorySpends';
import { useListMerchants } from '@data/modules/merchant/useCases/listMerchants/useListMerchants';
import type { IAccountProduct } from '@data/modules/product/types/Product';
import { useListAccountProducts } from '@data/modules/product/useCases/listAccountProducts/useListAccountProducts';
import { useListPricePoints } from '@data/modules/product/useCases/listPricePoints/useListPricePoints';
import { getPurchaseErrorMessage } from '@data/modules/purchase/constants/purchaseErrorMessages';
import type { IPurchase } from '@data/modules/purchase/types/Purchase';
import { useListPurchases } from '@data/modules/purchase/useCases/listPurchases/useListPurchases';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import type { IProductPickerBottomSheet } from './components/ProductPickerBottomSheet/interfaces';
import { DEFAULT_PERIOD_ID, PERIOD_CAPTIONS, PERIOD_OPTIONS } from './constants';
import type { TPeriodId } from './interfaces';
import {
  buildCategorySlices,
  buildMerchantSpends,
  buildPriceTrend,
  buildSpendSeries,
  getCategoryCaption,
  getCategoryTotal,
  getMostPurchasedProduct,
  getPeriodMonthRange,
  getPeriodRange,
  getPreviousPeriodRange,
  getTotalAmount,
  getTotalChange
} from './utils';

/** Padding horizontal da tela (`px-5`) + do card (`p-5`), dos dois lados. */
const CHART_HORIZONTAL_INSET = 80;

/** Respiro entre o último card e a tab bar flutuante. */
const CONTENT_BOTTOM_SPACING = 24;

const ERROR_FALLBACK = 'Verifique sua conexão e tente de novo.';

/** Referência estável para as listas não trocarem de identidade a cada render. */
const EMPTY_PURCHASES: IPurchase[] = [];

export function useStatisticsController() {
  const productPickerRef = useRef<IProductPickerBottomSheet>(null);

  const { width } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();

  const [selectedPeriodId, setSelectedPeriodId] = useState<TPeriodId>(DEFAULT_PERIOD_ID);
  /** `null` até o usuário escolher: o padrão é derivado, não copiado no estado. */
  const [selectedProductKey, setSelectedProductKey] = useState<string | null>(null);

  /**
   * Sem memo de propósito: `getPeriodRange` trunca a janela em unidades
   * inteiras, então as strings saem idênticas entre renders do mesmo dia e o
   * React Query — que compara a key por valor — não refaz a busca. Memoizar por
   * período só congelaria a janela na virada da meia-noite.
   */
  const range = getPeriodRange(selectedPeriodId, new Date());
  const previousRange = getPreviousPeriodRange(selectedPeriodId, new Date());
  const monthRange = getPeriodMonthRange(selectedPeriodId, new Date());

  const {
    purchases,
    loadPurchases,
    isLoadingPurchases,
    isRefetchingPurchases,
    hasPurchasesError,
    purchasesError
  } = useListPurchases(range);

  const {
    purchases: previousPurchases,
    loadPurchases: loadPreviousPurchases,
    isLoadingPurchases: isLoadingPreviousPurchases,
    hasPurchasesError: hasPreviousPurchasesError
  } = useListPurchases(previousRange);

  const {
    categorySpends,
    loadCategorySpends,
    isRefetchingCategorySpends,
    hasCategorySpendsError
  } = useListCategorySpends(monthRange);

  const { merchants, loadMerchants } = useListMerchants();

  const { products, loadProducts } = useListAccountProducts();

  /**
   * Sem escolha, o card abre no item mais comprado — é o que o usuário mais tem
   * a ganhar acompanhando. Derivar em vez de guardar no estado evita a cópia
   * ficar apontando para um produto que sumiu da lista.
   */
  const selectedProduct = useMemo(() => {
    const allProducts = products ?? [];

    return (
      allProducts.find((product) => product.productKey === selectedProductKey) ??
      getMostPurchasedProduct(allProducts)
    );
  }, [products, selectedProductKey]);

  const { pricePoints, loadPricePoints } = useListPricePoints({
    productKey: selectedProduct?.productKey
  });

  const periodPurchases = purchases ?? EMPTY_PURCHASES;

  const spendSeries = useMemo(
    () => buildSpendSeries(periodPurchases, selectedPeriodId, range.from),
    [periodPurchases, selectedPeriodId, range.from]
  );

  const totalAmount = useMemo(() => getTotalAmount(periodPurchases), [periodPurchases]);

  /**
   * `null` esconde o selo: sem o período anterior carregado não dá para afirmar
   * variação nenhuma, e `+0%` diria "gastou o mesmo", que é outra coisa.
   */
  const totalChange = useMemo(() => {
    if (isLoadingPreviousPurchases || hasPreviousPurchasesError) {
      return null;
    }

    return getTotalChange(totalAmount, getTotalAmount(previousPurchases ?? []));
  }, [
    totalAmount,
    previousPurchases,
    isLoadingPreviousPurchases,
    hasPreviousPurchasesError
  ]);

  const categorySlices = useMemo(
    () => buildCategorySlices(categorySpends ?? []),
    [categorySpends]
  );

  const categoryTotalAmount = useMemo(
    () => getCategoryTotal(categorySlices),
    [categorySlices]
  );

  const merchantSpends = useMemo(
    () => buildMerchantSpends(periodPurchases, merchants ?? []),
    [periodPurchases, merchants]
  );

  /**
   * Depende das duas strings, não do objeto: `range` é recriado a cada render,
   * e memoizar por ele não memoizaria nada. As strings só mudam quando o dia
   * (ou o mês) vira — é o mesmo motivo que deixa a query key estável.
   */
  const { from: rangeFrom, to: rangeTo } = range;

  const priceTrend = useMemo(
    () =>
      buildPriceTrend(selectedProduct, pricePoints ?? [], selectedPeriodId, {
        from: rangeFrom,
        to: rangeTo
      }),
    [selectedProduct, pricePoints, selectedPeriodId, rangeFrom, rangeTo]
  );

  function handlePeriodChange(periodId: TPeriodId) {
    setSelectedPeriodId(periodId);
  }

  function handleProductPress() {
    productPickerRef.current?.open();
  }

  function handleProductSelect(product: IAccountProduct) {
    setSelectedProductKey(product.productKey);
  }

  /**
   * As seis consultas voltam juntas: retentar só a principal deixaria o selo de
   * variação, o donut de categorias e os apelidos das barras quebrados depois de
   * um erro de rede.
   */
  function handleRetry() {
    loadPurchases();
    loadPreviousPurchases();
    loadCategorySpends();
    loadMerchants();
    loadProducts();
    loadPricePoints();
  }

  return {
    productPickerRef,
    selectedProductKey: selectedProduct?.productKey ?? null,
    periodOptions: PERIOD_OPTIONS,
    selectedPeriodId,
    periodCaption: PERIOD_CAPTIONS[selectedPeriodId],
    spendSeries,
    categorySlices,
    categoryTotalAmount,
    categoryCaption: getCategoryCaption(selectedPeriodId, monthRange),
    hasCategoryError: hasCategorySpendsError,
    isRetryingCategory: isRefetchingCategorySpends,
    merchantSpends,
    priceTrend,
    totalAmount,
    totalChange,
    isLoadingStatistics: isLoadingPurchases,
    isRetrying: isRefetchingPurchases,
    /** Um refetch falho não pode apagar da tela os dados que ainda valem. */
    hasStatisticsError: hasPurchasesError && periodPurchases.length === 0,
    errorMessage: getPurchaseErrorMessage(purchasesError, ERROR_FALLBACK),
    hasStatistics: periodPurchases.length > 0,
    chartWidth: width - CHART_HORIZONTAL_INSET,
    contentBottomPadding: tabBarHeight + CONTENT_BOTTOM_SPACING,
    handlePeriodChange,
    handleProductPress,
    handleProductSelect,
    handleRetry
  };
}
