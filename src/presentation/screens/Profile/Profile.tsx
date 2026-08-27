import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { ScreenLayout } from '@presentation/layouts/ScreenLayout/ScreenLayout';
import { COLORS } from '@shared/constants/colors';
import { Pencil } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { EditNameBottomSheet } from './components/EditNameBottomSheet/EditNameBottomSheet';
import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { useProfileController } from './useProfileController';

const EDIT_HIT_SLOP = 8;

export function Profile() {
  const {
    editNameBottomSheetRef,
    user,
    contentBottomPadding,
    handleEditNamePress,
    handleSignOut
  } = useProfileController();

  return (
    <ScreenLayout edges={['top']}>
      <ProfileHeader />

      <View
        className='flex-1 justify-between px-5'
        style={{ paddingBottom: contentBottomPadding }}
      >
        <View className='flex-row items-center gap-3 rounded-xl border border-grays-200 p-4'>
          <View className='flex-1 gap-1'>
            <AppText size='xs' color='subtle'>
              Nome
            </AppText>

            <AppText size='md' weight='semibold' color='strong' numberOfLines={1}>
              {user?.name}
            </AppText>

            <AppText size='sm' color='muted' numberOfLines={1}>
              {user?.email}
            </AppText>
          </View>

          <Pressable
            onPress={handleEditNamePress}
            hitSlop={EDIT_HIT_SLOP}
            accessibilityRole='button'
            accessibilityLabel='Editar seu nome'
            className='h-9 w-9 items-center justify-center rounded-lg bg-grays-100 active:opacity-60'
          >
            <Pencil size={16} color={COLORS.grays[600]} strokeWidth={2} />
          </Pressable>
        </View>

        <Button variant='ghost' onPress={handleSignOut}>
          Sair da conta
        </Button>
      </View>

      <EditNameBottomSheet ref={editNameBottomSheetRef} />
    </ScreenLayout>
  );
}
