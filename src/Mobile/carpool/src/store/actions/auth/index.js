import {createPromiseAction} from '@adobe/redux-saga-promise';

export const GetToken = {
  Trigger: 'GET_TOKEN',
  Success: 'GET_TOKEN_SUCCESS',
  Loading: 'GET_TOKEN_LOADING',
  Error: 'GET_TOKEN_ERROR',
  Refresh: 'REFRESH_TOKEN',
};

export const RegisterUser = {
  Trigger: 'REGISTER_USER',

  PromiseTrigger: 'REGISTER_USER.TRIGGER',
};

export const LogoutUser = {
  Trigger: 'LOGOUT_USER',
  Success: 'LOGOUT_USER_SUCCESS',
};

export const getToken = payload => ({type: GetToken.Trigger, payload});

export const getTokenSuccess = payload => ({type: GetToken.Success, payload});

export const getTokenError = payload => ({type: GetToken.Error, payload});

export const getTokenLoading = () => ({type: GetToken.Loading});

export const registerUser = payload =>
  createPromiseAction(RegisterUser.Trigger)(payload);

export const logoutUser = () => ({type: LogoutUser.Trigger});

export const logoutUserSuccess = () => ({type: LogoutUser.Success});

export const refreshToken = () => ({type: GetToken.Refresh});
