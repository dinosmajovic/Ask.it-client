import * as types from '../types/user-settings';

const initialState = {
  userPassword: {
    error: null,
    isLoading: false
  },
  editUser: {
    error: null,
    isLoading: false
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.EDIT_USER_REQUEST:
      return {
        ...state,
        editUser: {
          isLoading: true,
          error: null
        }
      };
    case types.EDIT_USER_SUCCESS:
      return {
        ...state,
        editUser: {
          isLoading: false,
          error: null
        }
      };
    case types.EDIT_USER_FAILURE:
      return {
        ...state,
        editUser: {
          isLoading: false,
          error: action.payload
        }
      };
    case types.CHANGE_USER_PASSWORD_REQUEST:
      return {
        ...state,
        userPassword: {
          isLoading: true,
          error: null
        }
      };
    case types.CHANGE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        userPassword: {
          isLoading: false,
          error: null
        }
      };
    case types.CHANGE_USER_PASSWORD_FAILURE:
      return {
        ...state,
        userPassword: {
          isLoading: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
