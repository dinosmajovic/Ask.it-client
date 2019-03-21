import * as types from '../types/user-questions';

const initialState = {
  error: null,
  isLoading: false,
  questions: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER_QUESTIONS_REQUEST:
      return {
        ...state,
        isLoading: !action.loadMore,
        error: null
      };
    case types.FETCH_USER_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
        error: null
      };
    case types.FETCH_USER_QUESTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        questions: null
      };
    default:
      return state;
  }
}
