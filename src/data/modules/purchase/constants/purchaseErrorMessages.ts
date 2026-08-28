import { ApiErrorCode, getApiErrorCode } from '@data/config/apiError';

const PURCHASE_ERROR_MESSAGES: Partial<Record<ApiErrorCode, string>> = {
  [ApiErrorCode.VALIDATION]: 'Tente novamente em instantes',
  [ApiErrorCode.RESOURCE_NOT_FOUND]: 'Não encontramos o recibo desta compra',
  [ApiErrorCode.INTERNAL_SERVER_ERROR]: 'Algo deu errado no servidor. Tente novamente'
};

/**
 * Traduz o `ErrorCode` da API para pt-BR. Cai no `fallback` quando o erro não
 * veio da API (rede, timeout) ou o código não tem mensagem própria.
 */
export function getPurchaseErrorMessage(error: unknown, fallback: string): string {
  const code = getApiErrorCode(error);

  if (!code) {
    return fallback;
  }

  return PURCHASE_ERROR_MESSAGES[code] ?? fallback;
}
