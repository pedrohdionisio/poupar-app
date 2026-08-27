import { api } from '@data/config/api';
import type {
  IForgotPasswordPayload,
  IGetMeResponse,
  IRefreshTokenPayload,
  IRefreshTokenResponse,
  IResetPasswordPayload,
  ISignInPayload,
  ISignInResponse,
  ISignUpPayload,
  ISignUpResponse,
  IUpdateAccountPayload
} from '../types/AuthTypes';

async function signIn(payload: ISignInPayload): Promise<ISignInResponse> {
  const { data } = await api.post<ISignInResponse>('/auth/sign-in', payload);

  return data;
}

async function signUp(payload: ISignUpPayload): Promise<ISignUpResponse> {
  const { data } = await api.post<ISignUpResponse>('/auth/sign-up', payload);

  return data;
}

async function refreshToken(
  payload: IRefreshTokenPayload
): Promise<IRefreshTokenResponse> {
  const { data } = await api.post<IRefreshTokenResponse>('/auth/refresh-token', payload);

  return data;
}

async function forgotPassword(payload: IForgotPasswordPayload): Promise<void> {
  await api.post('/auth/forgot-password', payload);
}

async function resetPassword(payload: IResetPasswordPayload): Promise<void> {
  await api.post('/auth/reset-password', payload);
}

async function getMe(): Promise<IGetMeResponse> {
  const { data } = await api.get<IGetMeResponse>('/accounts/me');

  return data;
}

/**
 * A rota é `@AdminOnly()` na poupar-api: o `accountId` vai no path e o body exige
 * `role` junto do `name`, mesmo quando só o nome muda.
 */
async function updateAccount({
  accountId,
  ...body
}: IUpdateAccountPayload): Promise<void> {
  await api.put(`/accounts/${accountId}`, body);
}

export const AuthService = {
  signIn,
  signUp,
  refreshToken,
  forgotPassword,
  resetPassword,
  getMe,
  updateAccount
};
