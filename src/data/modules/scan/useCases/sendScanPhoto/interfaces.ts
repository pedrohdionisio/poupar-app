import type { ScanContentType } from '../../types/ScanTypes';

export interface ISendScanPhotoPayload {
  /** Escolhido no primeiro passo da tela, antes de a câmera abrir. */
  merchantId: string;
  /** `file://` local devolvido pela câmera. */
  photoUri: string;
  contentType: ScanContentType;
}
