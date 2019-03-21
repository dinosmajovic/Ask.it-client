import axios from 'axios';
import { editUser as editUserAction } from '../../../auth/actions';
import * as types from '../types/user-settings';

function editUserRequest() {
  return {
    type: types.EDIT_USER_REQUEST
  };
}

function editUserSuccess() {
  return {
    type: types.EDIT_USER_SUCCESS
  };
}

function editUserFailure(error) {
  return {
    type: types.EDIT_USER_FAILURE,
    payload: error
  };
}

export const editUser = ({ email, name }) => async (dispatch) => {
  dispatch(editUserRequest());
  const url = '/api/users/profile';
  try {
    await axios.put(
      url,
      { email, name },
      {
        headers: {
          Authorization: localStorage.jwtToken
        }
      }
    );
    dispatch(editUserAction({ email, name }));
    dispatch(editUserSuccess());
  } catch (error) {
    dispatch(editUserFailure(error.response.data));
  }
};

function changeUserPasswordRequest() {
  return {
    type: types.CHANGE_USER_PASSWORD_REQUEST
  };
}

function changeUserPasswordSuccess() {
  return {
    type: types.CHANGE_USER_PASSWORD_SUCCESS
  };
}

function changeUserPasswordFailure(error) {
  return {
    type: types.CHANGE_USER_PASSWORD_FAILURE,
    payload: error
  };
}

export const changeUserPassword = (
  { password, confirmPassword },
  clearPasswordForm
) => async (dispatch) => {
  dispatch(changeUserPasswordRequest());
  const url = '/api/users/profile/password';
  try {
    await axios.put(
      url,
      { password, confirmPassword },
      {
        headers: {
          Authorization: localStorage.jwtToken
        }
      }
    );
    dispatch(changeUserPasswordSuccess());
    clearPasswordForm();
  } catch (error) {
    dispatch(changeUserPasswordFailure(error.response.data));
  }
};
