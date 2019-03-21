import axios from 'axios';

import * as types from './types';

function loginRequest() {
  return {
    type: types.LOGIN_REQUEST
  };
}

function loginSuccess(response) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: response
  };
}

function loginFailure(error) {
  return {
    type: types.LOGIN_FAILURE,
    payload: error
  };
}

export const login = ({ email, password }, history) => async (dispatch) => {
  dispatch(loginRequest());
  const url = '/api/auth/login';
  try {
    const response = await axios.post(url, { email, password });
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    history.push('/');
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT_USER });
  localStorage.setItem('jwtToken', '');
};

export const loginWithToken = (token) => async (dispatch) => {
  dispatch(loginRequest());
  const url = '/api/auth/loginWithToken';
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token
      }
    });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

function registerRequest() {
  return {
    type: types.REGISTER_REQUEST
  };
}

function registerSuccess(response) {
  return {
    type: types.REGISTER_SUCCESS,
    payload: response
  };
}

function registerFailure(error) {
  return {
    type: types.REGISTER_FAILURE,
    payload: error
  };
}

export const register = ({ email, password, name }, history) => async (
  dispatch
) => {
  dispatch(registerRequest());
  const url = '/api/auth/register';
  try {
    const response = await axios.post(url, { email, password, name });
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    history.push('/');
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
  }
};

export function editUser({ email, name }) {
  return {
    type: types.EDIT_USER,
    email,
    name
  };
}

export const clearErrors = () => (dispatch) => dispatch({ type: types.CLEAR_ERRORS });
