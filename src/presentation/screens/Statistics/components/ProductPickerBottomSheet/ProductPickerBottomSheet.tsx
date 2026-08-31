import type { IAccountProduct } from '@data/modules/product/types/Product';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { AppText } from '@presentation/components/AppText/AppText';
import { SearchInput } from '@presentation/components/SearchInput/SearchInput';
import { Skeleton } from '@presentation/components/Skeleton/Skeleton';
import { COLORS } from '@shared/constants/colors';
import { cn } from '@shared/utils/cn';
import { Currency } from '@shared/utils/currency';
import { Check, Package, SearchX } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import type { IProductPickerBottomSheetProps } from './interfaces';
import { useProductPickerBottomSheetController } from './useProductPickerBottomSheetController';

const CONTENT_BOTTOM_SPACING = 24;

const CONTENT_HORIZONTAL_PADDING = 24;

/** Altura fixa: o conteúdo é uma lista, e sem teto ela cresce sem parar. */
const SHEET_HEIGHT = '75%';

const PLACEHOLDER_ROWS = [0, 1, 2, 3];

interface IProductOptionProps {
  product: IAccountProduct;
  isSelected: boolean;
  onPress: (product: IAccountProduct) => void;
}

function ProductOption({ product, isSelected, onPress }: IProductOptionProps) {
  const purchasesLabel = `${product.purchasesCount} ${
    product.purchasesCount === 1 ? 'compra' : 'compras'
  }`;

  return (
    <Pressable
      onPress={() => onPress(product)}
      accessibilityRole='button'
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`Ver o preço de ${product.name}`}
      className={cn(
        'flex-row items-center gap-3 rounded-xl border p-3 active:opacity-60',
        isSelected ? 'border-brand-main bg-brand-light/10' : 'border-grays-200 bg-white'
      )}
    >
      <View className='h-10 w-10 items-center justify-center rounded-lg bg-grays-100'>
        <Package size={18} color={COLORS.grays[700]} strokeWidth={1.8} />
      </View>

      <View className='flex-1 gap-0.5'>
        <AppText size='sm' weight='semibold' color='strong' numberOfLines={1}>
          {product.name}
        </AppText>

        <AppText size='xs' color='muted' numberOfLines={1}>
          {purchasesLabel} · {Currency.format(product.lastUnitPrice)}
        </AppText>
      </View>

      {isSelected && <Check size={18} color={COLORS.brand.main} strokeWidth={2.5} />}
    </Pressable>
  );
}

function ProductPickerSkeleton() {
  return (
    <View
      accessible
      accessibilityRole='progressbar'
      accessibilityLabel='Carregando seus produtos'
      className='gap-2'
    >
      {PLACEHOLDER_ROWS.map((row) => (
        <Skeleton key={row} className='h-16 w-full' rounded='lg' />
      ))}
    </View>
  );
}

interface IProductPickerEmptyProps {
  isSearching: boolean;
}

function ProductPickerEmpty({ isSearching }: IProductPickerEmptyProps) {
  const Icon = isSearching ? SearchX : Package;

  return (
    <View className='items-center gap-3 py-10'>
      <View className='h-14 w-14 items-center justify-center rounded-2xl bg-grays-100'>
        <Icon size={26} color={COLORS.grays[400]} strokeWidth={1.8} />
      </View>

      <View className='gap-1'>
        <AppText size='md' weight='semibold' color='strong' align='center'>
          {isSearching ? 'Nenhum produto encontrado' : 'Nenhum produto ainda'}
        </AppText>

        <AppText size='sm' color='muted' align='center'>
          {isSearching
            ? 'Tente outro nome.'
            : 'Importe uma nota para o Poupar começar a acompanhar os preços.'}
        </AppText>
      </View>
    </View>
  );
}

function ProductPickerSeparator() {
  return <View className='h-2' />;
}

export function ProductPickerBottomSheet({
  ref,
  selectedProductKey,
  onSelect
}: IProductPickerBottomSheetProps) {
  const {
    bottomSheetModalRef,
    bottom,
    searchTerm,
    filteredProducts,
    isLoadingProducts,
    isSearching,
    handleSearchChange,
    handleClearSearch,
    handleSelect
  } = useProductPickerBottomSheetController({ ref, onSelect });

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={[SHEET_HEIGHT]}
      keyboardBehavior='interactive'
      keyboardBlurBehavior='restore'
      android_keyboardInputMode='adjustResize'
    >
      <BottomSheetView
        style={{
          flex: 1,
          paddingBottom: bottom + CONTENT_BOTTOM_SPACING,
          paddingHorizontal: CONTENT_HORIZONTAL_PADDING
        }}
      >
        <View className='gap-1 pb-4'>
          <AppText variant='title' size='lg' color='strong'>
            Qual produto?
          </AppText>

          <AppText size='sm' color='muted'>
            Escolha um item para ver como o preço dele andou.
          </AppText>
        </View>

        <View className='flex-1 gap-4'>
          <SearchInput
            value={searchTerm}
            placeholder='Buscar produto'
            onChangeText={handleSearchChange}
            onClear={handleClearSearch}
            InputComponent={BottomSheetTextInput}
          />

          {isLoadingProducts ? (
            <ProductPickerSkeleton />
          ) : (
            <BottomSheetFlatList
              data={filteredProducts}
              keyExtractor={(product: IAccountProduct) => product.productKey}
              renderItem={({ item }) => (
                <ProductOption
                  product={item}
                  isSelected={item.productKey === selectedProductKey}
                  onPress={handleSelect}
                />
              )}
              ItemSeparatorComponent={ProductPickerSeparator}
              ListEmptyComponent={<ProductPickerEmpty isSearching={isSearching} />}
              keyboardShouldPersistTaps='handled'
              keyboardDismissMode='on-drag'
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
