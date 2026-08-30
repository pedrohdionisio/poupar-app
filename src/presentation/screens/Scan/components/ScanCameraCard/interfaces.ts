import type { Ref } from 'react';
import type { IScanCamera } from '../ScanCamera/interfaces';

export interface IScanCameraCardProps {
  cameraRef: Ref<IScanCamera>;
  /** Enquanto `null`, mostra a câmera ao vivo; preenchido, mostra a foto tirada. */
  photoUri: string | null;
  /** Desmonta a câmera quando a tela sai de foco ou a foto já foi tirada. */
  isCameraActive: boolean;
  isTorchOn: boolean;
  /** Linha de leitura correndo sobre a foto enquanto a API extrai a nota. */
  isProcessing: boolean;
}

export interface IUseScanCameraCardController {
  isProcessing: boolean;
}
