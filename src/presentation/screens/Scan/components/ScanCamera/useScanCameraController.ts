import type { CameraView } from 'expo-camera';
import { useImperativeHandle, useRef } from 'react';
import type { IUseScanCameraController } from './interfaces';

/**
 * A foto vai inteira para o S3, com teto de 10MB na assinatura. Comprimir na
 * captura evita estourar o limite num aparelho de câmera grande — e o cupom
 * continua legível para a extração.
 */
const PHOTO_QUALITY = 0.6;

export function useScanCameraController({ ref }: IUseScanCameraController) {
  const cameraRef = useRef<CameraView>(null);

  useImperativeHandle(ref, () => ({
    takePhoto: async () => {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: PHOTO_QUALITY,
        /**
         * `skipProcessing` deixaria a foto na orientação crua do sensor: o
         * preview sairia deitado e a extração leria o cupom de lado.
         */
        skipProcessing: false,
        exif: false
      });

      return photo?.uri ?? null;
    }
  }));

  return { cameraRef };
}
