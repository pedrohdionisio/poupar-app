import { QueryClient } from '@tanstack/react-query';

/**
 * Instanciado em escopo de módulo de propósito: criar o client dentro do render
 * do `App` o recriaria a cada re-render, jogando o cache fora.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: false
    }
  }
});
