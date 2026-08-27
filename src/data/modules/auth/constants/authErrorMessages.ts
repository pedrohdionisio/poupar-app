import { ApiErrorCode, getApiErrorCode } from '@data/config/apiError';

const AUTH_ERROR_MESSAGES: Partial<Record<ApiErrorCode, string>> = {
  [ApiErrorCode.INVALID_CREDENTIALS]: 'As credenciais informadas são inválidas',
  [ApiErrorCode.EMAIL_ALREADY_IN_USE]: 'Este e-mail já está cadastrado',
  [ApiErrorCode.USER_NOT_FOUND]: 'Não encontramos uma conta com este e-mail',
  [ApiErrorCode.RESET_PASSWORD_CODE_WRONG]: 'Código de recuperação inválido',
  [ApiErrorCode.EXPIRED_PASSWORD_CODE]: 'O código expirou. Solicite um novo',
  [ApiErrorCode.INVALID_REFRESH_TOKEN]: 'Sua sessão expirou. Entre novamente',
  [ApiErrorCode.VALIDATION]: 'Verifique os dados informados',
  [ApiErrorCode.FORBIDDEN]: 'Sua conta não tem permissão para esta ação',
  [ApiErrorCode.RESOURCE_NOT_FOUND]: 'Não encontramos esta conta',
  [ApiErrorCode.INTERNAL_SERVER_ERROR]: 'Algo deu errado no servidor. Tente novamente'
};

/**
 * Traduz o `ErrorCode` da API para pt-BR. Cai no `fallback` quando o erro não
 * veio da API (rede, timeout) ou o código não tem mensagem própria.
 */
export function getAuthErrorMessage(error: unknown, fallback: string): string {
  const code = getApiErrorCode(error);

  if (!code) {
    return fallback;
  }

  return AUTH_ERROR_MESSAGES[code] ?? fallback;
}
