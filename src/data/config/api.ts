import axios, { type InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { ApiErrorCode, getApiErrorCode } from './apiError';
import { env } from './env';

const api = axios.create({
  baseURL: env.apiUrl
});

/** Marca requests já reprocessadas para o retry nunca virar loop. */
interface IRetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshTokenInterceptorId: number | undefined;

/**
 * O Cognito do poupar-api usa rotação de refresh token com grace period 0s: o
 * token antigo morre no instante do refresh. Se dois 401 concorrentes
 * disparassem dois refreshes, o segundo derrubaria a sessão — então todos
 * esperam a mesma promise.
 */
let refreshPromise: Promise<void> | null = null;

export function setAccessToken(accessToken: string) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export function removeAccessToken() {
  api.defaults.headers.common.Authorization = undefined;
}

export function removeRefreshTokenHandler() {
  if (refreshTokenInterceptorId !== undefined) {
    api.interceptors.response.eject(refreshTokenInterceptorId);
    refreshTokenInterceptorId = undefined;
  }

  refreshPromise = null;
}

export function setRefreshTokenHandler(refreshHandler: () => Promise<void>) {
  removeRefreshTokenHandler();

  refreshTokenInterceptorId = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config as IRetriableRequestConfig | undefined;

      /**
       * O `Forbbiden` da poupar-api responde 401, não 403. Sem esta checagem um
       * erro de permissão queimaria uma rotação de refresh token à toa — e se
       * essa rotação falhar, o handler desloga o usuário.
       */
      const isForbidden = getApiErrorCode(error) === ApiErrorCode.FORBIDDEN;

      if (
        !isAxiosError(error) ||
        error.response?.status !== 401 ||
        isForbidden ||
        !config ||
        config._retry ||
        config.url === '/auth/refresh-token'
      ) {
        return Promise.reject(error);
      }

      config._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshHandler().finally(() => {
          refreshPromise = null;
        });
      }

      await refreshPromise;

      return api(config);
    }
  );
}

export { api };
