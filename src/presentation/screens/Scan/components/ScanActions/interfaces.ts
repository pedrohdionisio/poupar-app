export interface IScanActionsProps {
  /** A lanterna só faz sentido quando a câmera está de fato ativa. */
  isTorchVisible: boolean;
  isTorchOn: boolean;
  onToggleTorchPress: () => void;
  onCancelPress: () => void;
}
