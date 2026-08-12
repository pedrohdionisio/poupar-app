import { AppText } from '@presentation/components/AppText/AppText';
import { Button } from '@presentation/components/Button/Button';
import { COLORS } from '@shared/constants/colors';
import { CameraOff } from 'lucide-react-native';
import { View } from 'react-native';
import type { IScanPermissionNoticeProps } from './interfaces';

export function ScanPermissionNotice({
  canAskAgain,
  onAllowPress,
  onOpenSettingsPress
}: IScanPermissionNoticeProps) {
  return (
    <View className='items-center gap-6'>
      <View className='h-16 w-16 items-center justify-center rounded-2xl bg-grays-100'>
        <CameraOff size={28} color={COLORS.grays[400]} strokeWidth={1.8} />
      </View>

      <View className='gap-2'>
        <AppText variant='title' size='lg' color='strong' align='center'>
          {canAskAgain ? 'Precisamos da sua câmera' : 'Acesso à câmera bloqueado'}
        </AppText>

        <AppText size='sm' color='muted' align='center'>
          {canAskAgain
            ? 'É pela câmera que lemos o QR code impresso na sua nota fiscal.'
            : 'Libere o acesso à câmera nas configurações do seu celular para voltar a escanear suas notas.'}
        </AppText>
      </View>

      <View className='w-full'>
        <Button onPress={canAskAgain ? onAllowPress : onOpenSettingsPress}>
          {canAskAgain ? 'Permitir acesso' : 'Abrir configurações'}
        </Button>
      </View>
    </View>
  );
}
