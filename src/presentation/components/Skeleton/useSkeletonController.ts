import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';

/** Ida (ou volta) da pulsação. */
const PULSE_DURATION = 800;

const MIN_OPACITY = 0.4;

const MAX_OPACITY = 1;

export function useSkeletonController() {
  const progress = useSharedValue(MIN_OPACITY);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(MAX_OPACITY, {
        duration: PULSE_DURATION,
        easing: Easing.inOut(Easing.quad)
      }),
      -1,
      true
    );
  }, [progress]);

  const pulseStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

  return { pulseStyle };
}
