import type { IScan } from '@data/modules/scan/types/Scan';
import type { ScanContentType } from '@data/modules/scan/types/ScanTypes';
import type { ScanPhase, ScanStep } from './interfaces';

interface IGetScanPhaseParams {
  hasConfirmedScan: boolean;
  isConfirmingScan: boolean;
  isSendingPhoto: boolean;
  hasTimedOut: boolean;
  hasScanError: boolean;
  /** O `POST /scans` exige o estabelecimento: sem ele a câmera nem abre. */
  hasMerchant: boolean;
  scan: IScan | undefined;
  scanId: string | null;
}

/**
 * A ordem das guardas é o próprio fluxo, do fim para o começo: o que já
 * aconteceu ganha do que ainda está em curso.
 */
export function getScanPhase({
  hasConfirmedScan,
  isConfirmingScan,
  isSendingPhoto,
  hasTimedOut,
  hasScanError,
  hasMerchant,
  scan,
  scanId
}: IGetScanPhaseParams): ScanPhase {
  if (hasConfirmedScan) return 'done';
  if (isConfirmingScan) return 'confirming';
  if (hasTimedOut || hasScanError || scan?.status === 'FAILED') return 'failure';
  if (scan?.status === 'AWAITING_REVIEW' && scan.draft) return 'review';
  if (isSendingPhoto) return 'sending';
  if (scanId) return 'processing';
  if (!hasMerchant) return 'merchant';

  return 'capture';
}

/** Uma falha não volta o stepper: ela para no passo em que aconteceu. */
export function getScanStep(phase: ScanPhase): ScanStep {
  if (phase === 'merchant') return 'merchant';
  if (phase === 'capture') return 'scan';
  if (phase === 'done') return 'done';

  return 'process';
}

/** Só as fases que mostram o card da câmera têm legenda. */
export const SCAN_PHASE_CAPTION: Partial<Record<ScanPhase, string>> = {
  capture: 'Enquadre a nota fiscal inteira, com boa luz e sem sombra.',
  sending: 'Enviando a foto da sua nota…',
  processing: 'Lendo os itens da sua nota. Isso leva alguns segundos.'
};

/** As fases que mostram a foto (ou a câmera) no card, com legenda embaixo. */
export function isCameraPhase(phase: ScanPhase): boolean {
  return phase === 'capture' || phase === 'sending' || phase === 'processing';
}

/**
 * O content-type vai assinado no presigned POST do S3: subir um arquivo que não
 * bate com o que foi assinado é rejeitado no upload. A câmera sempre entrega
 * JPEG, mas a galeria devolve o que estiver lá — daí a conferência.
 */
export function getScanContentType(mimeType: string | undefined): ScanContentType | null {
  if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
    return mimeType;
  }

  return null;
}
