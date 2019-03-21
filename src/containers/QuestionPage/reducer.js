import * as types from './types';

const initialState = {
  createAnswer: {
    error: null,
    isLoading: false
  },
  answers: {
    answers: null,
    isLoading: false,
    error: null
  },
  editAnswer: {
    isLoading: false,
    error: null
  },
  deleteAnswer: {
    isLoading: false,
    error: null
  },
  error: null,
  isLoading: false,
  question: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_QUESTION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        question: action.payload,
        isLoading: false,
        error: null
      };
    case types.FETCH_QUESTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case types.FETCH_ANSWERS_REQUEST:
      return {
        ...state,
        answers: {
          isLoading: true,
          error: null,
          answers: state.answers.answers
        }
      };
    case types.FETCH_ANSWERS_SUCCESS:
      return {
        ...state,
        answers: {
          isLoading: false,
          error: null,
          answers: action.payload
        }
      };
    case types.FETCH_ANSWERS_FAILURE:
      return {
        ...state,
        answers: {
          isLoading: false,
          error: action.payload
        }
      };
    case types.CREATE_ANSWER_REQUEST:
      return {
        ...state,
        createAnswer: {
          isLoading: true,
          error: null
        }
      };
    case types.CREATE_ANSWER_SUCCESS:
      return {
        ...state,
        createAnswer: {
          isLoading: false,
          error: null
        }
      };
    case types.CREATE_ANSWER_FAILURE:
      return {
        ...state,
        createAnswer: {
          isLoading: false,
          error: action.payload
        }
      };
    case types.ADD_ANSWER_COUNT:
      return {
        ...state,
        question: {
          ...state.question,
          answers: state.question.answers + 1
        }
      };
    case types.REMOVE_ANSWER_COUNT:
      return {
        ...state,
        question: {
          ...state.question,
          answers: state.question.answers - 1
        }
      };
    case types.EDIT_ANSWER_REQUEST:
      return {
        ...state,
        editAnswer: {
          isLoading: true,
          error: null
        }
      };
    case types.EDIT_ANSWER_SUCCESS:
      return {
        ...state,
        editAnswer: {
          isLoading: false,
          error: null
        }
      };
    case types.EDIT_ANSWER_FAILURE:
      return {
        ...state,
        editAnswer: {
          isLoading: false,
          error: action.payload
        }
      };
    case types.DELETE_ANSWER_REQUEST:
      return {
        ...state,
        deleteAnswer: {
          isLoading: true,
          error: null
        }
      };
    case types.DELETE_ANSWER_SUCCESS:
      return {
        ...state,
        deleteAnswer: {
          isLoading: false,
          error: null
        }
      };
    case types.DELETE_ANSWER_FAILURE:
      return {
        ...state,
        deleteAnswer: {
          isLoading: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
