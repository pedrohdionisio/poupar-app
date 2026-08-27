import {
  removeAccessToken,
  removeRefreshTokenHandler,
  setAccessToken,
  setRefreshTokenHandler
} from '@data/config/api';
import { AuthTokensManager, type IAuthTokens } from '@data/libs/AuthTokensManager';
import { AuthService } from '@data/modules/auth/services/AuthService';
import type { ISignInPayload, ISignUpPayload } from '@data/modules/auth/types/AuthTypes';
import { useGetMe } from '@data/modules/auth/useCases/getMe/useGetMe';
import { useForceRender } from '@shared/hooks/useForceRender';
import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  type PropsWithChildren,
  use,
  useCallback,
  useLayoutEffect,
  useState
} from 'react';
import type { IAuthContextValue } from './interfaces';

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);

  /** A query fica desligada: só rodamos ela manualmente, via `loadUser`. */
  const { user, loadUser } = useGetMe({ enabled: false });
  const queryClient = useQueryClient();
  const forceRender = useForceRender();

  const signOut = useCallback(async () => {
    removeAccessToken();
    removeRefreshTokenHandler();

    queryClient.clear();
    forceRender();

    await AuthTokensManager.clear();
  }, [queryClient, forceRender]);

  const setupAuth = useCallback(
    async (tokens: IAuthTokens) => {
      setAccessToken(tokens.accessToken);

      setRefreshTokenHandler(async () => {
        try {
          const storedTokens = await AuthTokensManager.load();

          if (!storedTokens) {
            throw new Error('Tokens not found');
          }

          const newTokens = await AuthService.refreshToken({
            refreshToken: storedTokens.refreshToken
          });

          setAccessToken(newTokens.accessToken);

          /**
           * A rotação do Cognito invalida o refresh token antigo na hora, então
           * os dois precisam ser regravados a cada refresh.
           */
          await AuthTokensManager.save(newTokens);
        } catch (error) {
          await signOut();
          throw error;
        }
      });

      await loadUser();

      setIsReady(true);
    },
    [signOut, loadUser]
  );

  useLayoutEffect(() => {
    async function load() {
      const tokens = await AuthTokensManager.load();

      if (!tokens) {
        setIsReady(true);
        return;
      }

      await setupAuth(tokens);
    }

    load();
  }, [setupAuth]);

  const signIn = useCallback(
    async (payload: ISignInPayload) => {
      const tokens = await AuthService.signIn(payload);

      await AuthTokensManager.save(tokens);
      await setupAuth(tokens);
    },
    [setupAuth]
  );

  /** O cadastro já devolve tokens, então a conta nova entra logada. */
  const signUp = useCallback(
    async (payload: ISignUpPayload) => {
      const tokens = await AuthService.signUp(payload);

      await AuthTokensManager.save(tokens);
      await setupAuth(tokens);
    },
    [setupAuth]
  );

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        signedIn: !!user,
        user,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return use(AuthContext);
}
