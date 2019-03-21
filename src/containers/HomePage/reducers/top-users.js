import * as types from '../types/top-users';

const initialState = {
  error: null,
  isLoading: false,
  users: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TOP_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.FETCH_TOP_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: null
      };
    case types.FETCH_TOP_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        users: null
      };
    default:
      return state;
  }
}
