export type AccountRoleType = 'ADMIN' | 'USER';

export interface IAuthTokensResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export type ISignInResponse = IAuthTokensResponse;

export interface ISignUpPayload {
  name: string;
  email: string;
  password: string;
  role: AccountRoleType;
}

export type ISignUpResponse = IAuthTokensResponse;

export interface IRefreshTokenPayload {
  refreshToken: string;
}

export type IRefreshTokenResponse = IAuthTokensResponse;

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  code: string;
  password: string;
}

export interface IGetMeResponse {
  id: string;
  externalId: string;
  name: string;
  email: string;
  role: AccountRoleType;
  createdAt: string;
}
