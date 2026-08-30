import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { Input } from '@presentation/components/Input/Input';
import { MerchantFormBottomSheet } from '@presentation/components/MerchantFormBottomSheet/MerchantFormBottomSheet';
import { MerchantPickerBottomSheet } from '@presentation/components/MerchantPickerBottomSheet/MerchantPickerBottomSheet';
import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import { DateFormat } from '@shared/utils/date';
import { ScrollView, View } from 'react-native';
import { ManualPurchaseHeader } from './components/ManualPurchaseHeader/ManualPurchaseHeader';
import { ManualPurchaseItemForm } from './components/ManualPurchaseItemForm/ManualPurchaseItemForm';
import { ManualPurchaseTotal } from './components/ManualPurchaseTotal/ManualPurchaseTotal';
import { MerchantField } from './components/MerchantField/MerchantField';
import { useManualPurchaseController } from './useManualPurchaseController';

/** Comprimento da máscara de data, com separadores: `dd/mm/aaaa`. */
const PURCHASED_AT_MASK_LENGTH = 10;

const HORIZONTAL_PADDING = 20;

const CONTENT_BOTTOM_SPACING = 32;

export function ManualPurchase() {
  const {
    form,
    merchantPickerRef,
    merchantFormRef,
    merchantId,
    merchantName,
    itemFields,
    totalAmount,
    itemsCount,
    isImportingPurchase,
    handleSubmit,
    handleMerchantFieldPress,
    handleMerchantSelect,
    handleCreateMerchantPress,
    handleMerchantSaved,
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

          <MerchantField
            control={form.control}
            merchantName={merchantName}
            onPress={handleMerchantFieldPress}
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

      <MerchantPickerBottomSheet
        ref={merchantPickerRef}
        selectedMerchantId={merchantId}
        onSelect={handleMerchantSelect}
        onCreatePress={handleCreateMerchantPress}
      />

      <MerchantFormBottomSheet ref={merchantFormRef} onSaved={handleMerchantSaved} />
    </ScreenLayout>
  );
}
