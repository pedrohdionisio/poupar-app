import { useMutation } from '@tanstack/react-query';
import { AuthMutationKeys } from '../../keys/AuthKeys';
import { AuthService } from '../../services/AuthService';
import type { ISignUpPayload } from '../../types/AuthTypes';

export function useSignUp() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [AuthMutationKeys.SIGN_UP],
    mutationFn: async (payload: ISignUpPayload) => await AuthService.signUp(payload)
  });

  return {
    signUp: mutateAsync,
    isSigningUp: isPending
  };
}
