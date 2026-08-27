import { useMutation } from '@tanstack/react-query';
import { AuthMutationKeys } from '../../keys/AuthKeys';
import { AuthService } from '../../services/AuthService';
import type { IRefreshTokenPayload } from '../../types/AuthTypes';

export function useRefreshToken() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [AuthMutationKeys.REFRESH_TOKEN],
    mutationFn: async (payload: IRefreshTokenPayload) =>
      await AuthService.refreshToken(payload)
  });

  return {
    refreshToken: mutateAsync,
    isRefreshing: isPending
  };
}
