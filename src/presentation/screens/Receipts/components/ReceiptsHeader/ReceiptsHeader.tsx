import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { Filter, Search } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { GreenFullLogo } from '@/shared/assets/svgs/GreenFullLogo';
import type { IReceiptsHeaderProps } from './interfaces';

const ICON_HIT_SLOP = 12;

export function ReceiptsHeader({
  userName,
  onSearchPress,
  onMenuPress
}: IReceiptsHeaderProps) {
  return (
    <View className='flex-row items-start justify-between px-5 pt-2 pb-6'>
      <View className='flex-1 gap-1 pr-4'>
        <AppText variant='title' size='xl' color='strong' numberOfLines={1}>
          Olá, {userName}
        </AppText>

        <View className='flex flex-row items-center gap-2'>
          <AppText size='sm' color='muted'>
            seja bem-vindo ao
          </AppText>

          <GreenFullLogo height={20} />
        </View>
      </View>

      <View className='flex-row items-center gap-2 pt-1'>
        <Pressable
          onPress={onSearchPress}
          hitSlop={ICON_HIT_SLOP}
          accessibilityRole='button'
          accessibilityLabel='Buscar notas'
          className='active:opacity-60'
        >
          <Search size={22} color={COLORS.grays[900]} strokeWidth={2} />
        </Pressable>

        <Pressable
          onPress={onMenuPress}
          hitSlop={ICON_HIT_SLOP}
          accessibilityRole='button'
          accessibilityLabel='Abrir menu'
          className='active:opacity-60'
        >
          <Filter size={22} color={COLORS.grays[900]} strokeWidth={2} />
        </Pressable>
      </View>
    </View>
  );
}
