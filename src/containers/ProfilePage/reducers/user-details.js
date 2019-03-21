import * as types from '../types/user-details';

const initialState = {
  error: null,
  isLoading: false,
  user: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null
      };
    case types.FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        user: null
      };
    default:
      return state;
  }
}
