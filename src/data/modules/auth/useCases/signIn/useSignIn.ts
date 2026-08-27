import { useMutation } from '@tanstack/react-query';
import { AuthMutationKeys } from '../../keys/AuthKeys';
import { AuthService } from '../../services/AuthService';
import type { ISignInPayload } from '../../types/AuthTypes';

export function useSignIn() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [AuthMutationKeys.SIGN_IN],
    mutationFn: async (payload: ISignInPayload) => await AuthService.signIn(payload)
  });

  return {
    signIn: mutateAsync,
    isSigningIn: isPending
  };
}
