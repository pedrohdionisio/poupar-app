import { getPurchaseErrorMessage } from '@data/modules/purchase/constants/purchaseErrorMessages';
import { ImportPurchaseMapper } from '@data/modules/purchase/services/mappers/ImportPurchaseMapper';
import {
  type ImportPurchaseFormType,
  importPurchaseSchema
} from '@data/modules/purchase/useCases/importPurchase/schemas/importPurchaseSchema';
import { useImportPurchase } from '@data/modules/purchase/useCases/importPurchase/useImportPurchase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { AppStackNavigationProps } from '@shared/navigation/AppStack';
import { Cnpj } from '@shared/utils/cnpj';
import { DateFormat } from '@shared/utils/date';
import { Decimal } from '@shared/utils/decimal';
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

  const { importPurchase, isImportingPurchase } = useImportPurchase();

  const form = useForm<ImportPurchaseFormType>({
    resolver: zodResolver(importPurchaseSchema),
    defaultValues: {
      purchasedAt: '',
      merchantCnpj: '',
      merchantName: '',
      merchantAddress: '',
      items: [{ ...EMPTY_ITEM }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items'
  });

  const items = form.watch('items');

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
        merchantCnpj: Cnpj.unformat(data.merchantCnpj),
        merchantName: data.merchantName,
        merchantAddress: data.merchantAddress,
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
    itemFields: fields,
    totalAmount,
    itemsCount: fields.length,
    isImportingPurchase,
    handleSubmit: form.handleSubmit(onSubmit, onInvalid),
    handleAddItemPress,
    handleRemoveItemPress,
    handleClosePress
  };
}
