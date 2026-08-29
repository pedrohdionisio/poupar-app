import { Button } from '@presentation/components/Button/Button';
import { COLORS } from '@shared/constants/colors';
import { cn } from '@shared/utils/cn';
import { Flashlight, FlashlightOff } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import type { IScanActionsProps } from './interfaces';

const TORCH_SIZE = 52;

export function ScanActions({
  isTorchVisible,
  isTorchOn,
  onToggleTorchPress,
  onManualPress,
  onCancelPress
}: IScanActionsProps) {
  const TorchIcon = isTorchOn ? Flashlight : FlashlightOff;

  return (
    <View className='items-center gap-3 px-5 pb-2'>
      {isTorchVisible && (
        <Pressable
          onPress={onToggleTorchPress}
          accessibilityRole='button'
          accessibilityLabel={isTorchOn ? 'Desligar lanterna' : 'Ligar lanterna'}
          accessibilityState={{ selected: isTorchOn }}
          className={cn(
            'items-center justify-center rounded-full border active:opacity-60',
            isTorchOn ? 'border-brand-main bg-brand-main' : 'border-grays-200 bg-white'
          )}
          style={{ width: TORCH_SIZE, height: TORCH_SIZE }}
        >
          <TorchIcon
            size={22}
            color={isTorchOn ? COLORS.white : COLORS.grays[600]}
            strokeWidth={2}
          />
        </Pressable>
      )}

      <View className='w-full gap-1'>
        <Button onPress={onManualPress}>Cadastrar sem escanear</Button>

        <Button variant='ghost' onPress={onCancelPress}>
          Cancelar
        </Button>
      </View>
    </View>
  );
}
