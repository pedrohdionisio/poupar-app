import { Button } from '@presentation/components/Button/Button';
import { COLORS } from '@shared/constants/colors';
import { cn } from '@shared/utils/cn';
import type { LucideIcon } from 'lucide-react-native';
import { Flashlight, FlashlightOff, Images } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import type { IScanActionsProps } from './interfaces';

const CONTROL_SIZE = 52;

interface IScanControlProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onPress: () => void;
}

/** Botão redondo dos controles de captura: lanterna e galeria. */
function ScanControl({
  icon: Icon,
  label,
  isActive = false,
  onPress
}: IScanControlProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole='button'
      accessibilityLabel={label}
      accessibilityState={{ selected: isActive }}
      className={cn(
        'items-center justify-center rounded-full border active:opacity-60',
        isActive ? 'border-brand-main bg-brand-main' : 'border-grays-200 bg-white'
      )}
      style={{ width: CONTROL_SIZE, height: CONTROL_SIZE }}
    >
      <Icon
        size={22}
        color={isActive ? COLORS.white : COLORS.grays[600]}
        strokeWidth={2}
      />
    </Pressable>
  );
}

export function ScanActions({
  isTorchVisible,
  isTorchOn,
  onToggleTorchPress,
  isGalleryVisible,
  onPickFromGalleryPress,
  primaryAction,
  secondaryActions,
  isPrimaryLoading
}: IScanActionsProps) {
  return (
    <View className='items-center gap-3 px-5 pb-2'>
      {/* Lanterna e galeria lado a lado: são as duas formas de melhorar a foto,
          e empilhá-las como botões de texto encheria o rodapé. */}
      {(isTorchVisible || isGalleryVisible) && (
        <View className='flex-row items-center gap-3'>
          {isTorchVisible && (
            <ScanControl
              icon={isTorchOn ? Flashlight : FlashlightOff}
              label={isTorchOn ? 'Desligar lanterna' : 'Ligar lanterna'}
              isActive={isTorchOn}
              onPress={onToggleTorchPress}
            />
          )}

          {isGalleryVisible && (
            <ScanControl
              icon={Images}
              label='Escolher uma foto da galeria'
              onPress={onPickFromGalleryPress}
            />
          )}
        </View>
      )}

      <View className='w-full gap-1'>
        {/* Só o primário trava durante a espera: o secundário é a saída de um
            upload lento, e desabilitá-lo junto deixaria a tela sem escape. */}
        {primaryAction && (
          <Button
            onPress={primaryAction.onPress}
            isLoading={isPrimaryLoading}
            disabled={isPrimaryLoading || primaryAction.isDisabled}
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
