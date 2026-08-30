import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { cn } from '@shared/utils/cn';
import { ChevronDown, Store } from 'lucide-react-native';
import { useController } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import type { IMerchantFieldProps } from './interfaces';

/**
 * Ligado ao form como o `Input`, mas sem teclado: o estabelecimento agora vem
 * da lista da conta, e não de um CNPJ digitado a cada nota.
 */
export function MerchantField({ control, merchantName, onPress }: IMerchantFieldProps) {
  const { fieldState } = useController({ name: 'merchantId', control });

  const error = fieldState.error?.message;

  return (
    <View className='gap-1'>
      <AppText size='sm'>Estabelecimento</AppText>

      <Pressable
        onPress={onPress}
        accessibilityRole='button'
        accessibilityLabel={
          merchantName
            ? `Trocar estabelecimento: ${merchantName}`
            : 'Escolher estabelecimento'
        }
        className={cn(
          'h-[52px] flex-row items-center gap-3 rounded-[10px] border bg-white px-[14px] active:opacity-60',
          error ? 'border-danger' : 'border-grays-400'
        )}
      >
        <Store size={18} color={COLORS.grays[600]} strokeWidth={1.8} />

        <AppText
          size='md'
          color={merchantName ? 'strong' : 'subtle'}
          numberOfLines={1}
          className='flex-1'
        >
          {merchantName ?? 'Escolha um estabelecimento'}
        </AppText>

        <ChevronDown size={18} color={COLORS.grays[500]} strokeWidth={2} />
      </Pressable>

      {error && (
        <AppText className='text-danger' size='sm'>
          {error}
        </AppText>
      )}
    </View>
  );
}
