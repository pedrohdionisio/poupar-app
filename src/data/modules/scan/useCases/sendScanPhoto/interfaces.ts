import type { ScanContentType } from '../../types/ScanTypes';

export interface ISendScanPhotoPayload {
  /** `file://` local devolvido pela câmera. */
  photoUri: string;
  contentType: ScanContentType;
}
