import { useReducer } from 'react';

/**
 * Força um re-render quando o estado que importa vive fora do React — no
 * `signOut`, o `queryClient.clear()` esvazia o cache do `GET_ME` sem notificar
 * quem já desinscreveu da query.
 */
export function useForceRender() {
  return useReducer((count: number) => count + 1, 0)[1];
}
