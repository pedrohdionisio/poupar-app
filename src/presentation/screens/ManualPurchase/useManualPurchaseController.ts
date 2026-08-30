import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import { useListMerchants } from '@data/modules/merchant/useCases/listMerchants/useListMerchants';
import { getPurchaseErrorMessage } from '@data/modules/purchase/constants/purchaseErrorMessages';
import { ImportPurchaseMapper } from '@data/modules/purchase/services/mappers/ImportPurchaseMapper';
import {
  type ImportPurchaseFormType,
  importPurchaseSchema
} from '@data/modules/purchase/useCases/importPurchase/schemas/importPurchaseSchema';
import { useImportPurchase } from '@data/modules/purchase/useCases/importPurchase/useImportPurchase';
import { zodResolver } from '@hookform/resolvers/zod';
import type { IMerchantFormBottomSheet } from '@presentation/components/MerchantFormBottomSheet/interfaces';
import type { IMerchantPickerBottomSheet } from '@presentation/components/MerchantPickerBottomSheet/interfaces';
import { useNavigation } from '@react-navigation/native';
import type { AppStackNavigationProps } from '@shared/navigation/AppStack';
import { DateFormat } from '@shared/utils/date';
import { Decimal } from '@shared/utils/decimal';
import { useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Alert } from 'react-native';

const EMPTY_ITEM = {
  description: '',
  quantity: '',
  unit: 'UN',
  unitPrice: ''
} as const;

export function useManualPurchaseController() {
  const navigation = useNavigation<AppStackNavigationProps>();

  const merchantPickerRef = useRef<IMerchantPickerBottomSheet>(null);
  const merchantFormRef = useRef<IMerchantFormBottomSheet>(null);

  /** Mesma entrada de cache que o seletor consome: serve só para o rótulo. */
  const { merchants } = useListMerchants();

  const { importPurchase, isImportingPurchase } = useImportPurchase();

  const form = useForm<ImportPurchaseFormType>({
    resolver: zodResolver(importPurchaseSchema),
    defaultValues: {
      purchasedAt: '',
      merchantId: '',
      items: [{ ...EMPTY_ITEM }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items'
  });

  const items = form.watch('items');
  const merchantId = form.watch('merchantId');

  /**
   * O total é derivado, não digitado: a API aceitaria uma soma divergente sem
   * reclamar. O cálculo vem do mapper para o rodapé não mostrar um centavo a
   * menos do que é de fato gravado.
   */
  const totalAmount = ImportPurchaseMapper.getTotalAmount(
    items.map((item) => ({
      description: item.description,
      quantity: Decimal.parse(item.quantity),
      unit: item.unit,
      unitPrice: Decimal.parse(item.unitPrice)
    }))
  );

  async function onSubmit(data: ImportPurchaseFormType) {
    const purchasedAt = DateFormat.toIsoFromDayMonthYear(data.purchasedAt);

    /** O schema já validou a data; a guarda existe para o tipo, não para o fluxo. */
    if (!purchasedAt) {
      return;
    }

    try {
      await importPurchase({
        purchasedAt,
        merchantId: data.merchantId,
        /** O schema valida o texto; a conversão para número mora aqui. */
        items: data.items.map((item) => ({
          description: item.description,
          quantity: Decimal.parse(item.quantity),
          unit: item.unit,
          unitPrice: Decimal.parse(item.unitPrice)
        }))
      });

      /** `popToTop` desempilha o formulário E a Scan; `navigate` empilharia
       * uma segunda AppTabs por cima do modal, na aba inicial. */
      navigation.popToTop();
    } catch (error) {
      Alert.alert(
        'Oops!',
        getPurchaseErrorMessage(error, 'Não foi possível cadastrar a nota')
      );
    }
  }

  /**
   * Sem isto, tocar em Cadastrar com um erro de validação lá no topo não produz
   * sinal nenhum: o botão fica inerte e a mensagem está fora da tela.
   */
  function onInvalid() {
    Alert.alert('Confira os dados', 'Alguns campos precisam ser corrigidos.');
  }

  function handleMerchantFieldPress() {
    merchantPickerRef.current?.open();
  }

  function handleMerchantSelect(merchant: IMerchant) {
    form.setValue('merchantId', merchant.id, { shouldValidate: true });
    merchantPickerRef.current?.close();
  }

  function handleCreateMerchantPress() {
    merchantFormRef.current?.open();
  }

  /** O recém-cadastrado já entra escolhido: foi para usá-lo que o sheet abriu. */
  function handleMerchantSaved(savedMerchantId: string) {
    form.setValue('merchantId', savedMerchantId, { shouldValidate: true });
    merchantPickerRef.current?.close();
  }

  function handleAddItemPress() {
    append({ ...EMPTY_ITEM });
  }

  function handleRemoveItemPress(index: number) {
    remove(index);
  }

  function handleClosePress() {
    navigation.goBack();
  }

  return {
    form,
    merchantPickerRef,
    merchantFormRef,
    merchantId: merchantId || null,
    merchantName: merchants?.find((merchant) => merchant.id === merchantId)?.name ?? null,
    itemFields: fields,
    totalAmount,
    itemsCount: fields.length,
    isImportingPurchase,
    handleSubmit: form.handleSubmit(onSubmit, onInvalid),
    handleMerchantFieldPress,
    handleMerchantSelect,
    handleCreateMerchantPress,
    handleMerchantSaved,
    handleAddItemPress,
    handleRemoveItemPress,
    handleClosePress
  };
}
