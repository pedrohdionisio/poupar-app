import type { Ref } from 'react';

export interface IScanCamera {
  /** Devolve o `file://` da foto, ou `null` se a captura falhar. */
  takePhoto: () => Promise<string | null>;
}

export interface IScanCameraProps {
  ref: Ref<IScanCamera>;
  isTorchOn: boolean;
}

export interface IUseScanCameraController {
  ref: Ref<IScanCamera>;
}
