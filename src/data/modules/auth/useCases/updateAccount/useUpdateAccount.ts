import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthMutationKeys, AuthQueryKeys } from '../../keys/AuthKeys';
import { AuthService } from '../../services/AuthService';
import type { IGetMeResponse, IUpdateAccountPayload } from '../../types/AuthTypes';

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [AuthMutationKeys.UPDATE_ACCOUNT],
    mutationFn: async (payload: IUpdateAccountPayload) =>
      await AuthService.updateAccount(payload),
    /**
     * `invalidateQueries` não serve aqui: o `AuthProvider` consome o GET_ME com
     * `enabled: false`, então invalidar só marcaria como stale sem refazer o
     * fetch. Escrevemos o cache na mão — a rota responde 200 sem body.
     */
    onSuccess: (_data, { name }) => {
      queryClient.setQueryData<IGetMeResponse>(
        [AuthQueryKeys.GET_ME],
        (account) => account && { ...account, name }
      );
    }
  });

  return {
    updateAccount: mutateAsync,
    isUpdatingAccount: isPending
  };
}
