import { ApiErrorCode, getApiErrorCode } from '@data/config/apiError';

const MERCHANT_ERROR_MESSAGES: Partial<Record<ApiErrorCode, string>> = {
  [ApiErrorCode.VALIDATION]: 'Verifique o nome informado',
  [ApiErrorCode.RESOURCE_NOT_FOUND]: 'Este estabelecimento não está mais na sua lista',
  [ApiErrorCode.INTERNAL_SERVER_ERROR]: 'Algo deu errado no servidor. Tente novamente'
};

/**
 * Traduz o `ErrorCode` da API para pt-BR. Cai no `fallback` quando o erro não
 * veio da API (rede, timeout) ou o código não tem mensagem própria.
 */
export function getMerchantErrorMessage(error: unknown, fallback: string): string {
  const code = getApiErrorCode(error);

  if (!code) {
    return fallback;
  }

  return MERCHANT_ERROR_MESSAGES[code] ?? fallback;
}
