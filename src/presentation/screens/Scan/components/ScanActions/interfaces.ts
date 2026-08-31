import type { IScanAction } from '../../interfaces';

export interface IScanActionsProps {
  /** A lanterna só faz sentido com a câmera ao vivo, antes da foto. */
  isTorchVisible: boolean;
  isTorchOn: boolean;
  onToggleTorchPress: () => void;
  /** Mesma janela da lanterna: trocar a origem da foto só cabe antes dela. */
  isGalleryVisible: boolean;
  onPickFromGalleryPress: () => void;
  /** `null` nas fases em que só resta esperar. */
  primaryAction: IScanAction | null;
  /** Saídas alternativas da fase: cadastrar na mão, descartar, cancelar. */
  secondaryActions: IScanAction[];
  isPrimaryLoading: boolean;
}
