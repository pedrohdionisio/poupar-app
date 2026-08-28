import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import type { IPurchaseDetailHeaderProps } from './interfaces';

const BACK_HIT_SLOP = 12;

export function PurchaseDetailHeader({ onBackPress }: IPurchaseDetailHeaderProps) {
  return (
    <View className='flex-row items-center gap-3 px-5 pt-2 pb-5'>
      <Pressable
        onPress={onBackPress}
        hitSlop={BACK_HIT_SLOP}
        accessibilityRole='button'
        accessibilityLabel='Voltar'
        className='h-9 w-9 items-center justify-center rounded-lg bg-grays-100 active:opacity-60'
      >
        <ChevronLeft size={20} color={COLORS.grays[700]} strokeWidth={2} />
      </Pressable>

      <AppText variant='title' size='lg' color='strong'>
        Detalhe da compra
      </AppText>
    </View>
  );
}
