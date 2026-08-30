import { getMerchantCategoryLabel } from '@data/modules/merchant/constants/merchantCategories';
import type { IMerchant } from '@data/modules/merchant/types/Merchant';
import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { ErrorState } from '@presentation/components/ErrorState/ErrorState';
import { SearchInput } from '@presentation/components/SearchInput/SearchInput';
import { Skeleton } from '@presentation/components/Skeleton/Skeleton';
import { COLORS } from '@shared/constants/colors';
import { cn } from '@shared/utils/cn';
import { Check, Plus, SearchX, Store } from 'lucide-react-native';
import { FlatList, Pressable, View } from 'react-native';
import type { IMerchantPickerProps } from './interfaces';
import { useMerchantPickerController } from './useMerchantPickerController';

const PLACEHOLDER_ROWS = [0, 1, 2, 3];

interface IMerchantOptionProps {
  merchant: IMerchant;
  isSelected: boolean;
  onPress: (merchant: IMerchant) => void;
}

function MerchantOption({ merchant, isSelected, onPress }: IMerchantOptionProps) {
  const purchasesLabel = `${merchant.purchasesCount} ${
    merchant.purchasesCount === 1 ? 'compra' : 'compras'
  }`;

  return (
    <Pressable
      onPress={() => onPress(merchant)}
      accessibilityRole='button'
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`Escolher ${merchant.name}`}
      className={cn(
        'flex-row items-center gap-3 rounded-xl border p-3 active:opacity-60',
        isSelected ? 'border-brand-main bg-brand-light/10' : 'border-grays-200 bg-white'
      )}
    >
      <View className='h-10 w-10 items-center justify-center rounded-lg bg-grays-100'>
        <Store size={18} color={COLORS.grays[700]} strokeWidth={1.8} />
      </View>

      <View className='flex-1 gap-0.5'>
        <AppText size='sm' weight='semibold' color='strong' numberOfLines={1}>
          {merchant.name}
        </AppText>

        <AppText size='xs' color='muted' numberOfLines={1}>
          {getMerchantCategoryLabel(merchant.category)} · {purchasesLabel}
        </AppText>
      </View>

      {isSelected && <Check size={18} color={COLORS.brand.main} strokeWidth={2.5} />}
    </Pressable>
  );
}

function MerchantPickerSkeleton() {
  return (
    <View
      accessible
      accessibilityRole='progressbar'
      accessibilityLabel='Carregando seus estabelecimentos'
      className='gap-2'
    >
      {PLACEHOLDER_ROWS.map((row) => (
        <Skeleton key={row} className='h-16 w-full' rounded='lg' />
      ))}
    </View>
  );
}

interface IMerchantPickerEmptyProps {
  isSearching: boolean;
}

function MerchantPickerEmpty({ isSearching }: IMerchantPickerEmptyProps) {
  const Icon = isSearching ? SearchX : Store;

  return (
    <View className='items-center gap-3 py-10'>
      <View className='h-14 w-14 items-center justify-center rounded-2xl bg-grays-100'>
        <Icon size={26} color={COLORS.grays[400]} strokeWidth={1.8} />
      </View>

      <View className='gap-1'>
        <AppText size='md' weight='semibold' color='strong' align='center'>
          {isSearching
            ? 'Nenhum estabelecimento encontrado'
            : 'Você ainda não cadastrou nenhum'}
        </AppText>

        <AppText size='sm' color='muted' align='center'>
          {isSearching
            ? 'Tente outro nome ou cadastre um novo.'
            : 'Cadastre o primeiro para começar a registrar suas compras.'}
        </AppText>
      </View>
    </View>
  );
}

function MerchantPickerSeparator() {
  return <View className='h-2' />;
}

export function MerchantPicker({
  selectedMerchantId,
  onSelect,
  onCreatePress,
  InputComponent,
  ListComponent = FlatList,
  className
}: IMerchantPickerProps) {
  const {
    searchTerm,
    filteredMerchants,
    isLoadingMerchants,
    isRetrying,
    hasMerchantsError,
    errorMessage,
    isSearching,
    handleSearchChange,
    handleClearSearch,
    handleRetry
  } = useMerchantPickerController();

  if (hasMerchantsError) {
    return (
      <ErrorState
        title='Não conseguimos carregar seus estabelecimentos'
        message={errorMessage}
        isRetrying={isRetrying}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <View className={cn('flex-1 gap-4', className)}>
      <SearchInput
        value={searchTerm}
        placeholder='Buscar estabelecimento'
        onChangeText={handleSearchChange}
        onClear={handleClearSearch}
        InputComponent={InputComponent}
      />

      {isLoadingMerchants ? (
        <MerchantPickerSkeleton />
      ) : (
        <ListComponent
          data={filteredMerchants}
          keyExtractor={(merchant: IMerchant) => merchant.id}
          renderItem={({ item }) => (
            <MerchantOption
              merchant={item}
              isSelected={item.id === selectedMerchantId}
              onPress={onSelect}
            />
          )}
          ItemSeparatorComponent={MerchantPickerSeparator}
          ListEmptyComponent={<MerchantPickerEmpty isSearching={isSearching} />}
          keyboardShouldPersistTaps='handled'
          keyboardDismissMode='on-drag'
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button variant='ghost' onPress={onCreatePress}>
        <View className='flex-row items-center gap-2'>
          <Plus size={18} color={COLORS.brand.main} strokeWidth={2} />

          <AppText size='sm' weight='medium' color='brand'>
            Novo estabelecimento
          </AppText>
        </View>
      </Button>
    </View>
  );
}
