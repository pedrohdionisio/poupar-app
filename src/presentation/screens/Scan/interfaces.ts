/**
 * `checking` cobre tanto a leitura inicial da permissão quanto o tempo em que o
 * prompt do sistema está aberto, evitando piscar o aviso de acesso negado.
 */
export type ScanPermissionStatus = 'checking' | 'granted' | 'denied';

/** Etapas exibidas no stepper, do estabelecimento até a nota importada. */
export type ScanStep = 'merchant' | 'scan' | 'process' | 'done';

/**
 * Fase do fluxo dentro da tela. Mais fina que `ScanStep`: três fases distintas
 * (`sending`, `processing`, `confirming`) vivem sob o mesmo passo `process`.
 */
export type ScanPhase =
  | 'merchant'
  | 'capture'
  | 'sending'
  | 'processing'
  | 'review'
  | 'confirming'
  | 'done'
  | 'failure';

export interface IScanAction {
  label: string;
  onPress: () => void;
  /** O botão fica no lugar, inerte, enquanto a fase não tem o que ele precisa. */
  isDisabled?: boolean;
}
