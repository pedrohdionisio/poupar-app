import { COLORS } from '@shared/constants/colors';
import { cn } from '@shared/utils/cn';
import { Image, type StyleProp, View, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { ScanCamera } from '../ScanCamera/ScanCamera';
import type { IScanCameraCardProps } from './interfaces';
import { useScanCameraCardController } from './useScanCameraCardController';

const CORNER_SIZE = 34;
const CORNER_CLASS = 'absolute border-grays-900';
const CORNER_STYLE = { width: CORNER_SIZE, height: CORNER_SIZE };

const CARD_SHADOW: StyleProp<ViewStyle> = {
  shadowColor: COLORS.grays[900],
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
  elevation: 6
};

export function ScanCameraCard({
  cameraRef,
  photoUri,
  isCameraActive,
  isTorchOn,
  isProcessing
}: IScanCameraCardProps) {
  const { scanLineStyle, handleViewportLayout } = useScanCameraCardController({
    isProcessing
  });

  return (
    <View className='rounded-3xl bg-white p-5' style={CARD_SHADOW}>
      <View
        className='aspect-square w-full overflow-hidden rounded-2xl bg-grays-100'
        onLayout={handleViewportLayout}
      >
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            className='h-full w-full'
            resizeMode='cover'
            accessibilityRole='image'
            accessibilityLabel='Foto da nota fiscal que você tirou'
          />
        ) : (
          isCameraActive && <ScanCamera ref={cameraRef} isTorchOn={isTorchOn} />
        )}

        <View className='absolute inset-0' pointerEvents='none'>
          <View className='h-full w-full rounded-2xl border-2 border-grays-900/40 border-dashed' />

          <View
            className={cn(
              CORNER_CLASS,
              'top-0 left-0 rounded-tl-2xl border-t-4 border-l-4'
            )}
            style={CORNER_STYLE}
          />
          <View
            className={cn(
              CORNER_CLASS,
              'top-0 right-0 rounded-tr-2xl border-t-4 border-r-4'
            )}
            style={CORNER_STYLE}
          />
          <View
            className={cn(
              CORNER_CLASS,
              'bottom-0 left-0 rounded-bl-2xl border-b-4 border-l-4'
            )}
            style={CORNER_STYLE}
          />
          <View
            className={cn(
              CORNER_CLASS,
              'right-0 bottom-0 rounded-br-2xl border-r-4 border-b-4'
            )}
            style={CORNER_STYLE}
          />

          {isProcessing && (
            <Animated.View
              className='absolute right-0 left-0 h-0.5 bg-brand-main'
              style={scanLineStyle}
            />
          )}
        </View>
      </View>
    </View>
  );
}
