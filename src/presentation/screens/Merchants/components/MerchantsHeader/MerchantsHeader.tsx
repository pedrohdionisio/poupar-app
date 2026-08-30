import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { Plus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import type { IMerchantsHeaderProps } from './interfaces';

const CREATE_HIT_SLOP = 8;

export function MerchantsHeader({ onCreatePress }: IMerchantsHeaderProps) {
  return (
    <View className='flex-row items-start gap-4 px-5 pt-8 pb-5'>
      <View className='flex-1 gap-1'>
        <AppText variant='title' size='xl' color='strong'>
          Estabelecimentos
        </AppText>

        <AppText size='sm' color='muted'>
          Os lugares onde você compra. Escolha um deles ao registrar uma nota.
        </AppText>
      </View>

      <Pressable
        onPress={onCreatePress}
        hitSlop={CREATE_HIT_SLOP}
        accessibilityRole='button'
        accessibilityLabel='Cadastrar estabelecimento'
        className='h-10 w-10 items-center justify-center rounded-xl bg-brand-main active:opacity-70'
      >
        <Plus size={20} color={COLORS.white} strokeWidth={2} />
      </Pressable>
    </View>
  );
}
