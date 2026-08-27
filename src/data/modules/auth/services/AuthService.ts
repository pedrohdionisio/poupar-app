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
  ISignUpResponse
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

export const AuthService = {
  signIn,
  signUp,
  refreshToken,
  forgotPassword,
  resetPassword,
  getMe
};
