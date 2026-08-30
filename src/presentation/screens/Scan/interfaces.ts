/**
 * `checking` cobre tanto a leitura inicial da permissão quanto o tempo em que o
 * prompt do sistema está aberto, evitando piscar o aviso de acesso negado.
 */
export type ScanPermissionStatus = 'checking' | 'granted' | 'denied';

/** Etapas exibidas no stepper, da foto até a nota importada. */
export type ScanStep = 'scan' | 'process' | 'done';

/**
 * Fase do fluxo dentro da tela. Mais fina que `ScanStep`: três fases distintas
 * (`sending`, `processing`, `confirming`) vivem sob o mesmo passo `process`.
 */
export type ScanPhase =
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
}
