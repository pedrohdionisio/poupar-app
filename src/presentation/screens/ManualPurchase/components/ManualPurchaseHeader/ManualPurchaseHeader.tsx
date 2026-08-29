import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { X } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import type { IManualPurchaseHeaderProps } from './interfaces';

const CLOSE_HIT_SLOP = 12;

export function ManualPurchaseHeader({ onClosePress }: IManualPurchaseHeaderProps) {
  return (
    <View className='flex-row items-center gap-3 px-5 pt-2 pb-5'>
      <Pressable
        onPress={onClosePress}
        hitSlop={CLOSE_HIT_SLOP}
        accessibilityRole='button'
        accessibilityLabel='Fechar cadastro manual'
        className='h-9 w-9 items-center justify-center rounded-lg bg-grays-100 active:opacity-60'
      >
        <X size={20} color={COLORS.grays[700]} strokeWidth={2} />
      </Pressable>

      <View className='flex-1 gap-1'>
        <AppText variant='title' size='lg' color='strong'>
          Cadastrar nota
        </AppText>

        <AppText size='sm' color='muted'>
          Informe o estabelecimento e os itens da compra.
        </AppText>
      </View>
    </View>
  );
}
