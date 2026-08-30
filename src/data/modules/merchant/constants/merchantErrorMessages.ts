import { ApiErrorCode, getApiErrorCode } from '@data/config/apiError';

const MERCHANT_ERROR_MESSAGES: Partial<Record<ApiErrorCode, string>> = {
  [ApiErrorCode.VALIDATION]: 'Confira o nome e o CNPJ informados',
  [ApiErrorCode.RESOURCE_NOT_FOUND]: 'Este estabelecimento não está mais na sua lista',
  /** O `DELETE` responde 409 quando o estabelecimento já tem compras. */
  [ApiErrorCode.CONFLICT]:
    'Este estabelecimento já tem compras registradas e não pode ser excluído',
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
