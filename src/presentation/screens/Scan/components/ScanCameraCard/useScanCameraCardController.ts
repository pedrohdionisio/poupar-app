import { useEffect, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import type { IUseScanCameraCardController } from './interfaces';

/** Ida (ou volta) da linha de leitura sobre a área da câmera. */
const SCAN_LINE_DURATION = 2400;

export function useScanCameraCardController({
  isProcessing
}: IUseScanCameraCardController) {
  const [viewportHeight, setViewportHeight] = useState(0);

  const progress = useSharedValue(0);

  // A linha só corre enquanto a API lê a foto — parada, ou correndo antes do
  // envio, sugeriria que estamos lendo algo quando não estamos.
  useEffect(() => {
    if (!isProcessing) {
      /** Sem o cancel a repetição infinita segue na UI thread até a tela morrer. */
      cancelAnimation(progress);
      progress.value = 0;

      return;
    }

    progress.value = withRepeat(
      withTiming(1, { duration: SCAN_LINE_DURATION, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, [isProcessing, progress]);

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * viewportHeight }]
  }));

  function handleViewportLayout({ nativeEvent }: LayoutChangeEvent) {
    setViewportHeight(nativeEvent.layout.height);
  }

  return { scanLineStyle, handleViewportLayout };
}
