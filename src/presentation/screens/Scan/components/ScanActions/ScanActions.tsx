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
  primaryAction,
  secondaryActions,
  isPrimaryLoading
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
        {/* Só o primário trava durante a espera: o secundário é a saída de um
            upload lento, e desabilitá-lo junto deixaria a tela sem escape. */}
        {primaryAction && (
          <Button
            onPress={primaryAction.onPress}
            isLoading={isPrimaryLoading}
            disabled={isPrimaryLoading}
            accessibilityRole='button'
          >
            {primaryAction.label}
          </Button>
        )}

        {secondaryActions.map((action) => (
          <Button
            key={action.label}
            variant='ghost'
            onPress={action.onPress}
            accessibilityRole='button'
          >
            {action.label}
          </Button>
        ))}
      </View>
    </View>
  );
}
