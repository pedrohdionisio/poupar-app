import { useMutation } from '@tanstack/react-query';
import { AuthMutationKeys } from '../../keys/AuthKeys';
import { AuthService } from '../../services/AuthService';
import type { IForgotPasswordPayload } from '../../types/AuthTypes';

export function useForgotPassword() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [AuthMutationKeys.FORGOT_PASSWORD],
    mutationFn: async (payload: IForgotPasswordPayload) =>
      await AuthService.forgotPassword(payload)
  });

  return {
    forgotPassword: mutateAsync,
    isSendingCode: isPending
  };
}
