import { useMutation } from '@tanstack/react-query';
import { AuthMutationKeys } from '../../keys/AuthKeys';
import { AuthService } from '../../services/AuthService';
import type { IResetPasswordPayload } from '../../types/AuthTypes';

export function useResetPassword() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [AuthMutationKeys.RESET_PASSWORD],
    mutationFn: async (payload: IResetPasswordPayload) =>
      await AuthService.resetPassword(payload)
  });

  return {
    resetPassword: mutateAsync,
    isResetting: isPending
  };
}
