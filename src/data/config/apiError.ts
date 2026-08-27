import { isAxiosError } from 'axios';

/** Espelha o `ErrorCode` da poupar-api (`src/application/errors/ErrorCode.ts`). */
export enum ApiErrorCode {
  VALIDATION = 'VALIDATION',
  EMAIL_ALREADY_IN_USE = 'EMAIL_ALREADY_IN_USE',
  INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  RESET_PASSWORD_CODE_WRONG = 'RESET_PASSWORD_CODE_WRONG',
  EXPIRED_PASSWORD_CODE = 'EXPIRED_PASSWORD_CODE',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',
  RECEIPT_EXTRACTION_FAILED = 'RECEIPT_EXTRACTION_FAILED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  CONFLICT = 'CONFLICT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN'
}

interface IApiErrorBody {
  error?: {
    code?: string;
    message?: unknown;
  };
}

/**
 * A API responde erro como `{ error: { code, message, details? } }`. Devolve
 * `null` quando o erro não veio dela (rede, timeout, bug de runtime).
 */
export function getApiErrorCode(error: unknown): ApiErrorCode | null {
  if (!isAxiosError<IApiErrorBody>(error)) {
    return null;
  }

  const code = error.response?.data?.error?.code;

  if (!code || !(code in ApiErrorCode)) {
    return null;
  }

  return code as ApiErrorCode;
}
