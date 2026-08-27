import type {
  IGetMeResponse,
  ISignInPayload,
  ISignUpPayload
} from '@data/modules/auth/types/AuthTypes';

export interface IAuthContextValue {
  signedIn: boolean;
  user: IGetMeResponse | undefined;
  signIn: (payload: ISignInPayload) => Promise<void>;
  signUp: (payload: ISignUpPayload) => Promise<void>;
  signOut: () => Promise<void>;
}
