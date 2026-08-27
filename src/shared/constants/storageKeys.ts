/**
 * O SecureStore só aceita chaves alfanuméricas, `.`, `-` e `_` — daí o formato
 * diferente do `@namespace/chave` usado em AsyncStorage.
 */
export const STORAGE_KEYS = {
  authTokens: 'poupar.auth-tokens'
} as const;
