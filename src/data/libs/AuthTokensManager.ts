import { STORAGE_KEYS } from '@shared/constants/storageKeys';
import * as SecureStore from 'expo-secure-store';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

async function save(tokens: IAuthTokens) {
  await SecureStore.setItemAsync(STORAGE_KEYS.authTokens, JSON.stringify(tokens));
}

async function load(): Promise<IAuthTokens | null> {
  try {
    const tokens = await SecureStore.getItemAsync(STORAGE_KEYS.authTokens);

    if (!tokens) {
      return null;
    }

    return JSON.parse(tokens);
  } catch {
    /** Storage corrompido equivale a não ter sessão. */
    return null;
  }
}

async function clear() {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.authTokens);
}

export const AuthTokensManager = {
  save,
  load,
  clear
};
