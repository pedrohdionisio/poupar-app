import { COLORS } from '@shared/constants/colors';
import { Search, X } from 'lucide-react-native';
import { Pressable, TextInput, View } from 'react-native';
import type { IMerchantsSearchInputProps } from './interfaces';

const CLEAR_HIT_SLOP = 12;

export function MerchantsSearchInput({
  value,
  onChangeText,
  onClear
}: IMerchantsSearchInputProps) {
  return (
    <View className='mx-5 mb-6 h-12 flex-row items-center gap-2 rounded-xl border border-grays-200 bg-grays-100 px-3'>
      <Search size={18} color={COLORS.grays[400]} strokeWidth={2} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder='Buscar estabelecimento'
        placeholderTextColor={COLORS.grays[400]}
        accessibilityLabel='Buscar estabelecimento'
        returnKeyType='search'
        autoCapitalize='none'
        autoCorrect={false}
        className='h-full flex-1 font-inter-regular text-[14px] text-grays-900'
      />

      {!!value && (
        <Pressable
          onPress={onClear}
          hitSlop={CLEAR_HIT_SLOP}
          accessibilityRole='button'
          accessibilityLabel='Limpar busca'
          className='active:opacity-60'
        >
          <X size={18} color={COLORS.grays[500]} strokeWidth={2} />
        </Pressable>
      )}
    </View>
  );
}
