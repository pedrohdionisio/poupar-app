import type { BarcodeScanningResult } from 'expo-camera';

export interface IScanCameraProps {
  isTorchOn: boolean;
  onBarcodeScanned: (result: BarcodeScanningResult) => void;
}
