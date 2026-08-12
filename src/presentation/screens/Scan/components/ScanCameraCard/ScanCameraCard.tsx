import { cn } from '@shared/utils/cn';
import { useEffect, useState } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { ScanCamera } from '../ScanCamera/ScanCamera';
import type { IScanCameraCardProps } from './interfaces';

const CORNER_SIZE = 34;
const CORNER_CLASS = 'absolute border-grays-900';
const CORNER_STYLE = { width: CORNER_SIZE, height: CORNER_SIZE };

/** Ida (ou volta) da linha de leitura sobre a área da câmera. */
const SCAN_LINE_DURATION = 2400;

const cardShadow: StyleProp<ViewStyle> = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
  elevation: 6
};

export function ScanCameraCard({
  isCameraActive,
  isTorchOn,
  onBarcodeScanned
}: IScanCameraCardProps) {
  const [viewportHeight, setViewportHeight] = useState(0);
  const progress = useSharedValue(0);

  // A linha só se move com a câmera ligada — parada, ela sugeriria que estamos
  // lendo algo quando não estamos.
  useEffect(() => {
    if (!isCameraActive) return;

    progress.value = withRepeat(
      withTiming(1, { duration: SCAN_LINE_DURATION, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, [isCameraActive, progress]);

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * viewportHeight }]
  }));

  return (
    <View className='rounded-3xl bg-white p-5' style={cardShadow}>
      <View
        className='aspect-square w-full overflow-hidden rounded-2xl bg-grays-100'
        onLayout={({ nativeEvent }) => setViewportHeight(nativeEvent.layout.height)}
      >
        {isCameraActive && (
          <ScanCamera isTorchOn={isTorchOn} onBarcodeScanned={onBarcodeScanned} />
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

          {isCameraActive && (
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
