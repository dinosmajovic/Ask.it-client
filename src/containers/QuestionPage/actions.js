import axios from 'axios';
import * as types from './types';

function fetchQuestionRequest() {
  return {
    type: types.FETCH_QUESTION_REQUEST
  };
}

function fetchQuestionSuccess(response) {
  return {
    type: types.FETCH_QUESTION_SUCCESS,
    payload: response
  };
}

function fetchQuestionFailure(error) {
  return {
    type: types.FETCH_QUESTION_FAILURE,
    payload: error
  };
}

export const fetchQuestion = (id) => async (dispatch) => {
  dispatch(fetchQuestionRequest());
  const url = `/api/questions/${id}`;
  try {
    const response = await axios.get(url);
    dispatch(fetchQuestionSuccess(response.data));
  } catch (error) {
    dispatch(fetchQuestionFailure(error.message));
  }
};

function fetchAnswersRequest() {
  return {
    type: types.FETCH_ANSWERS_REQUEST
  };
}

function fetchAnswersSuccess(response) {
  return {
    type: types.FETCH_ANSWERS_SUCCESS,
    payload: response.data
  };
}

function fetchAnswersFailure(error) {
  return {
    type: types.FETCH_ANSWERS_FAILURE,
    payload: error
  };
}

export const fetchAnswers = ({ id, page, take }) => async (dispatch) => {
  dispatch(fetchAnswersRequest());
  const url = `/api/questions/${id}/answers`;
  try {
    const response = await axios.post(url, { page, take });
    dispatch(fetchAnswersSuccess(response));
  } catch (error) {
    dispatch(fetchAnswersFailure(error.data));
  }
};

function createAnswerRequest() {
  return {
    type: types.CREATE_ANSWER_REQUEST
  };
}

function createAnswerSuccess() {
  return {
    type: types.CREATE_ANSWER_SUCCESS
  };
}

function createAnswerFailure(error) {
  return {
    type: types.CREATE_ANSWER_FAILURE,
    payload: error
  };
}

export const createAnswer = ({ id, text }) => async (dispatch) => {
  dispatch(createAnswerRequest());
  const url = `/api/questions/${id}/answer`;
  try {
    await axios.post(
      url,
      { text },
      {
        headers: {
          Authorization: localStorage.jwtToken
        }
      }
    );
    dispatch(createAnswerSuccess());
    dispatch({ type: types.ADD_ANSWER_COUNT });
    dispatch(fetchAnswers({ id, page: 1, take: 20 }));
  } catch (error) {
    dispatch(createAnswerFailure(error.data));
  }
};

function editAnswerRequest() {
  return {
    type: types.EDIT_ANSWER_REQUEST
  };
}

function editAnswerSuccess() {
  return {
    type: types.EDIT_ANSWER_SUCCESS
  };
}

function editAnswerFailure(error) {
  return {
    type: types.EDIT_ANSWER_FAILURE,
    payload: error
  };
}

export const editAnswer = (
  { questionId, answerId, text },
  saveEditState
) => async (dispatch) => {
  dispatch(editAnswerRequest());
  const url = `/api/questions/answer/${answerId}`;
  try {
    await axios.put(
      url,
      { text },
      {
        headers: {
          Authorization: localStorage.jwtToken
        }
      }
    );
    dispatch(editAnswerSuccess());
    saveEditState();
    dispatch(fetchAnswers({ id: questionId, page: 1, take: 20 }));
  } catch (error) {
    dispatch(editAnswerFailure(error.data));
  }
};

function deleteAnswerRequest() {
  return {
    type: types.DELETE_ANSWER_REQUEST
  };
}

function deleteAnswerSuccess() {
  return {
    type: types.DELETE_ANSWER_SUCCESS
  };
}

function deleteAnswerFailure(error) {
  return {
    type: types.DELETE_ANSWER_FAILURE,
    payload: error
  };
}

export const deleteAnswer = ({ questionId, answerId }) => async (dispatch) => {
  dispatch(deleteAnswerRequest());
  const url = `/api/questions/answer/${answerId}`;
  try {
    await axios.delete(url, {
      headers: {
        Authorization: localStorage.jwtToken
      }
    });
    dispatch(deleteAnswerSuccess());
    dispatch({ type: types.REMOVE_ANSWER_COUNT });
    dispatch(fetchAnswers({ id: questionId, page: 1, take: 20 }));
  } catch (error) {
    dispatch(deleteAnswerFailure(error.data));
  }
};

export const likeAnswer = (id, addLike, removeLike, userLikes) => async () => {
  const url = `/api/rating/answer/${id}/like`;
  if (userLikes) {
    try {
      await axios.delete(url, {
        headers: {
          Authorization: localStorage.jwtToken
        }
      });

      removeLike();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  } else {
    try {
      await axios.post(url, null, {
        headers: {
          Authorization: localStorage.jwtToken
        }
      });
      addLike();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};

export const dislikeAnswer = (
  id,
  addDislike,
  removeDislike,
  userLikes
) => async () => {
  const url = `/api/rating/answer/${id}/dislike`;
  if (userLikes) {
    try {
      await axios.delete(url, {
        headers: {
          Authorization: localStorage.jwtToken
        }
      });

      removeDislike();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  } else {
    try {
      await axios.post(url, null, {
        headers: {
          Authorization: localStorage.jwtToken
        }
      });
      addDislike();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};
