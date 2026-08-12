/**
 * `checking` cobre tanto a leitura inicial da permissão quanto o tempo em que o
 * prompt do sistema está aberto, evitando piscar o aviso de acesso negado.
 */
export type ScanPermissionStatus = 'checking' | 'granted' | 'denied';

/** Etapas exibidas no stepper, da leitura do QR até a nota importada. */
export type ScanStep = 'scan' | 'process' | 'done';
