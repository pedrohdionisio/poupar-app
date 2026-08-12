import { CameraView } from 'expo-camera';
import { StyleSheet } from 'react-native';
import type { IScanCameraProps } from './interfaces';

export function ScanCamera({ isTorchOn, onBarcodeScanned }: IScanCameraProps) {
  return (
    <CameraView
      style={StyleSheet.absoluteFill}
      facing='back'
      enableTorch={isTorchOn}
      // Restringir ao QR evita leituras acidentais dos códigos de barras que
      // também são impressos no cupom.
      barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      onBarcodeScanned={onBarcodeScanned}
    />
  );
}
