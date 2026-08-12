import type { IScanCameraProps } from '../ScanCamera/interfaces';

export interface IScanCameraCardProps extends IScanCameraProps {
  /** Desmonta a câmera (e para a linha de leitura) quando a tela sai de foco. */
  isCameraActive: boolean;
}
