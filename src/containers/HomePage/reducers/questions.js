import * as types from '../types/questions';

const initialState = {
  createQuestion: {
    error: null,
    isLoading: false
  },
  editQuestion: {
    error: null,
    isLoading: false
  },
  deleteQuestion: {
    error: null,
    isLoading: false
  },
  hotQuestions: {
    questions: null,
    isLoading: false,
    error: null
  },
  error: null,
  isLoading: false,
  questions: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_QUESTIONS_REQUEST:
      return {
        ...state,
        isLoading: !action.loadMore,
        error: null
      };
    case types.FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
        error: null
      };
    case types.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case types.CREATE_QUESTION_REQUEST:
      return {
        ...state,
        createQuestion: {
          isLoading: true,
          error: null
        }
      };
    case types.CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        createQuestion: {
          isLoading: false,
          error: null
        }
      };
    case types.CREATE_QUESTION_FAILURE:
      return {
        ...state,
        createQuestion: {
          isLoading: false,
          error: action.payload
        }
      };
    case types.EDIT_QUESTION_REQUEST:
      return {
        ...state,
        editQuestion: {
          isLoading: true,
          error: null
        }
      };
    case types.EDIT_QUESTION_SUCCESS:
      return {
        ...state,
        editQuestion: {
          isLoading: false,
          error: null
        }
      };
    case types.EDIT_QUESTION_FAILURE:
      return {
        ...state,
        editQuestion: {
          isLoading: false,
          error: action.payload
        }
      };
    case types.DELETE_QUESTION_REQUEST:
      return {
        ...state,
        deleteQuestion: {
          isLoading: true,
          error: null
        }
      };
    case types.DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        deleteQuestion: {
          isLoading: false,
          error: null
        }
      };
    case types.DELETE_QUESTION_FAILURE:
      return {
        ...state,
        deleteQuestion: {
          isLoading: false,
          error: action.payload
        }
      };
    case types.LOAD_MORE_QUESTIONS_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case types.LOAD_MORE_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
        error: null
      };
    case types.LOAD_MORE_QUESTIONS_FAILURE:
      return {
        ...state,
        questions: null,
        isLoading: false,
        error: action.payload
      };
    case types.FETCH_HOT_QUESTIONS_REQUEST:
      return {
        ...state,
        hotQuestions: {
          questions: state.hotQuestions.questions,
          isLoading: true,
          error: null
        }
      };
    case types.FETCH_HOT_QUESTIONS_SUCCESS:
      return {
        ...state,
        hotQuestions: {
          questions: action.payload,
          isLoading: false,
          error: null
        }
      };
    case types.FETCH_HOT_QUESTIONS_FAILURE:
      return {
        ...state,
        hotQuestions: {
          questions: false,
          isLoading: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
