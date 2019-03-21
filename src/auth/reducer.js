import * as types from './types';

const initialState = {
  error: null,
  authenticated: false,
  isLoading: false,
  user: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        authenticated: false,
        isLoading: true,
        error: null
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        isLoading: false,
        error: null,
        user: action.payload
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
        isLoading: false,
        error: action.payload,
        user: null
      };
    case types.REGISTER_REQUEST:
      return {
        ...state,
        authenticated: false,
        isLoading: true,
        error: null,
        user: null
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        authenticated: true,
        isLoading: false,
        error: null,
        user: action.payload
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        authenticated: false,
        isLoading: false,
        error: action.payload,
        user: null
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        authenticated: false,
        error: null,
        isLoading: false,
        user: null
      };
    case types.EDIT_USER:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email,
          name: action.name
        }
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
