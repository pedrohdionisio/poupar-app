import { ApiErrorCode, getApiErrorCode } from '@data/config/apiError';
import type { ScanErrorCodeType } from '../types/ScanTypes';

const SCAN_ERROR_MESSAGES: Partial<Record<ApiErrorCode, string>> = {
  [ApiErrorCode.VALIDATION]: 'A nota lida veio com dados inválidos',
  [ApiErrorCode.RESOURCE_NOT_FOUND]: 'Não encontramos este scan',
  [ApiErrorCode.RESOURCE_ALREADY_EXISTS]: 'Esta nota já foi importada antes',
  [ApiErrorCode.CONFLICT]: 'Este scan não está mais aguardando confirmação',
  [ApiErrorCode.INTERNAL_SERVER_ERROR]: 'Algo deu errado no servidor. Tente novamente'
};

/**
 * Traduz o `ErrorCode` da API para pt-BR. Cai no `fallback` quando o erro não
 * veio da API (rede, timeout) ou o código não tem mensagem própria.
 */
export function getScanErrorMessage(error: unknown, fallback: string): string {
  const code = getApiErrorCode(error);

  if (!code) {
    return fallback;
  }

  return SCAN_ERROR_MESSAGES[code] ?? fallback;
}

export interface IScanFailureMessage {
  title: string;
  description: string;
  /** `false` quando repetir a foto não muda nada — nota já importada. */
  canRetry: boolean;
}

/**
 * Estes códigos não são HTTP: chegam dentro de um `200`, no corpo do scan, e
 * dizem por que a extração da foto não deu certo.
 */
const SCAN_FAILURE_MESSAGES: Record<ScanErrorCodeType, IScanFailureMessage> = {
  UNREADABLE_PHOTO: {
    title: 'Não conseguimos ler a nota',
    description:
      'A foto ficou sem nitidez suficiente. Tente de novo com boa luz, sem sombra e com a nota inteira dentro do quadro.',
    canRetry: true
  },
  PARSE_FAILED: {
    title: 'Não entendemos esta nota',
    description:
      'Conseguimos ver a foto, mas não reconhecemos o formato do cupom. Você ainda pode cadastrar a nota manualmente.',
    canRetry: true
  },
  DUPLICATE_RECEIPT: {
    title: 'Esta nota já está no Poupar',
    description:
      'Você já importou este cupom antes. Ele está na sua lista de notas, junto com os itens.',
    canRetry: false
  },
  INTERNAL_ERROR: {
    title: 'Algo deu errado ao processar',
    description:
      'Não foi possível processar a foto agora. Tente de novo em alguns instantes.',
    canRetry: true
  }
};

/** Nenhum destes dois vem da API — mas a tela precisa dizer algo. */
const TIMED_OUT_FAILURE: IScanFailureMessage = {
  title: 'A leitura está demorando',
  description:
    'O processamento da sua nota passou do tempo esperado. Ela pode aparecer nas suas notas em instantes; se não aparecer, tente enviar a foto de novo.',
  canRetry: true
};

const UNREACHABLE_FAILURE: IScanFailureMessage = {
  title: 'Não conseguimos acompanhar a leitura',
  description:
    'Perdemos a conexão enquanto sua nota era processada. Verifique sua internet e tente de novo.',
  canRetry: true
};

export interface IGetScanFailureMessageParams {
  errorCode: ScanErrorCodeType | null;
  /** A tela desistiu de esperar, não a API. */
  hasTimedOut: boolean;
}

export function getScanFailureMessage({
  errorCode,
  hasTimedOut
}: IGetScanFailureMessageParams): IScanFailureMessage {
  if (hasTimedOut) {
    return TIMED_OUT_FAILURE;
  }

  if (!errorCode) {
    return UNREACHABLE_FAILURE;
  }

  return SCAN_FAILURE_MESSAGES[errorCode];
}
