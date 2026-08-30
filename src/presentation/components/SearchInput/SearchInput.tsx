import { COLORS } from '@shared/constants/colors';
import { cn } from '@shared/utils/cn';
import { Search, X } from 'lucide-react-native';
import { Pressable, TextInput, View } from 'react-native';
import type { ISearchInputProps } from './interfaces';

const CLEAR_HIT_SLOP = 12;

export function SearchInput({
  value,
  placeholder,
  onChangeText,
  onClear,
  InputComponent = TextInput,
  className
}: ISearchInputProps) {
  return (
    <View
      className={cn(
        'h-12 flex-row items-center gap-2 rounded-xl border border-grays-200 bg-grays-100 px-3',
        className
      )}
    >
      <Search size={18} color={COLORS.grays[400]} strokeWidth={2} />

      <InputComponent
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.grays[400]}
        accessibilityLabel={placeholder}
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
