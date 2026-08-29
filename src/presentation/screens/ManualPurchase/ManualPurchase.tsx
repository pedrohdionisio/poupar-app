import {
  MERCHANT_ADDRESS_MAX_LENGTH,
  MERCHANT_NAME_MAX_LENGTH
} from '@data/modules/purchase/useCases/importPurchase/schemas/importPurchaseSchema';
import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { Input } from '@presentation/components/Input/Input';
import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import { Cnpj } from '@shared/utils/cnpj';
import { DateFormat } from '@shared/utils/date';
import { ScrollView, View } from 'react-native';
import { ManualPurchaseHeader } from './components/ManualPurchaseHeader/ManualPurchaseHeader';
import { ManualPurchaseItemForm } from './components/ManualPurchaseItemForm/ManualPurchaseItemForm';
import { ManualPurchaseTotal } from './components/ManualPurchaseTotal/ManualPurchaseTotal';
import { useManualPurchaseController } from './useManualPurchaseController';

/** Comprimento das máscaras, com separadores: `00.000.000/0000-00`, `dd/mm/aaaa`. */
const CNPJ_MASK_LENGTH = 18;

const PURCHASED_AT_MASK_LENGTH = 10;

const HORIZONTAL_PADDING = 20;

const CONTENT_BOTTOM_SPACING = 32;

export function ManualPurchase() {
  const {
    form,
    itemFields,
    totalAmount,
    itemsCount,
    isImportingPurchase,
    handleSubmit,
    handleAddItemPress,
    handleRemoveItemPress,
    handleClosePress
  } = useManualPurchaseController();

  return (
    <ScreenLayout>
      <ManualPurchaseHeader onClosePress={handleClosePress} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingBottom: CONTENT_BOTTOM_SPACING
        }}
      >
        <View className='gap-4'>
          <AppText variant='title' size='md' weight='semibold' color='strong'>
            Estabelecimento
          </AppText>

          <Input
            name='merchantCnpj'
            control={form.control}
            label='CNPJ'
            placeholder='00.000.000/0000-00'
            keyboardType='number-pad'
            maxLength={CNPJ_MASK_LENGTH}
            format={Cnpj.mask}
          />

          <Input
            name='merchantName'
            control={form.control}
            label='Nome'
            placeholder='Ex.: Mercado da esquina'
            autoCapitalize='sentences'
            maxLength={MERCHANT_NAME_MAX_LENGTH}
          />

          <Input
            name='merchantAddress'
            control={form.control}
            label='Endereço'
            placeholder='Ex.: Rua das Flores, 123 - Centro'
            autoCapitalize='sentences'
            maxLength={MERCHANT_ADDRESS_MAX_LENGTH}
          />

          <Input
            name='purchasedAt'
            control={form.control}
            label='Data da compra'
            placeholder='dd/mm/aaaa'
            keyboardType='number-pad'
            maxLength={PURCHASED_AT_MASK_LENGTH}
            format={DateFormat.maskDayMonthYear}
          />
        </View>

        <AppText
          variant='title'
          size='md'
          weight='semibold'
          color='strong'
          className='mt-8 mb-4'
        >
          Itens
        </AppText>

        <View className='gap-4'>
          {itemFields.map((field, index) => (
            <ManualPurchaseItemForm
              key={field.id}
              index={index}
              control={form.control}
              canRemove={itemFields.length > 1}
              onRemovePress={handleRemoveItemPress}
            />
          ))}

          <Button variant='ghost' onPress={handleAddItemPress}>
            Adicionar item
          </Button>
        </View>

        <View className='mt-8 gap-4'>
          <ManualPurchaseTotal totalAmount={totalAmount} itemsCount={itemsCount} />

          <Button
            onPress={handleSubmit}
            isLoading={isImportingPurchase}
            disabled={isImportingPurchase}
          >
            Cadastrar nota
          </Button>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
