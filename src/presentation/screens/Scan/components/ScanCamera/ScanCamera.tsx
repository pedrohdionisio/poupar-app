import { CameraView } from 'expo-camera';
import { StyleSheet } from 'react-native';
import type { IScanCameraProps } from './interfaces';
import { useScanCameraController } from './useScanCameraController';

export function ScanCamera({ ref, isTorchOn }: IScanCameraProps) {
  const { cameraRef } = useScanCameraController({ ref });

  return (
    <CameraView
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      facing='back'
      enableTorch={isTorchOn}
    />
  );
}
