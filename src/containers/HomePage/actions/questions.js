import axios from 'axios';

import * as types from '../types/questions';

function fetchQuestionsRequest(loadMore) {
  return {
    type: types.FETCH_QUESTIONS_REQUEST,
    loadMore
  };
}

function fetchQuestionsSuccess(response) {
  return {
    type: types.FETCH_QUESTIONS_SUCCESS,
    payload: response
  };
}

function fetchQuestionsFailure(error) {
  return {
    type: types.FETCH_QUESTIONS_FAILURE,
    payload: error
  };
}

export const fetchQuestions = ({ page, take }, loadMore) => async (
  dispatch
) => {
  dispatch(fetchQuestionsRequest(loadMore));
  const url = '/api/questions/recent';
  try {
    const response = await axios.post(url, { page, take });
    dispatch(fetchQuestionsSuccess(response.data));
  } catch (error) {
    dispatch(fetchQuestionsFailure(error.message));
  }
};

function createQuestionRequest() {
  return {
    type: types.CREATE_QUESTION_REQUEST
  };
}

function createQuestionSuccess() {
  return {
    type: types.CREATE_QUESTION_SUCCESS
  };
}

function createQuestionFailure(error) {
  return {
    type: types.CREATE_QUESTION_FAILURE,
    payload: error
  };
}

export const createQuestion = ({ text }) => async (dispatch) => {
  dispatch(createQuestionRequest());
  const url = '/api/questions';
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
    dispatch(createQuestionSuccess());
    dispatch(fetchQuestions({ page: 1, take: 20 }));
  } catch (error) {
    dispatch(createQuestionFailure(error.data));
  }
};

function editQuestionRequest() {
  return {
    type: types.EDIT_QUESTION_REQUEST
  };
}

function editQuestionSuccess() {
  return {
    type: types.EDIT_QUESTION_SUCCESS
  };
}

function editQuestionFailure(error) {
  return {
    type: types.EDIT_QUESTION_FAILURE,
    payload: error
  };
}

export const editQuestion = (
  { text, id },
  saveEditState,
  fetchQuestionsAction
) => async (dispatch) => {
  dispatch(editQuestionRequest());
  const url = `/api/questions/${id}`;
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
    dispatch(editQuestionSuccess());
    saveEditState();
    fetchQuestionsAction();
  } catch (error) {
    dispatch(editQuestionFailure(error.data));
  }
};

function deleteQuestionRequest() {
  return {
    type: types.DELETE_QUESTION_REQUEST
  };
}

function deleteQuestionSuccess() {
  return {
    type: types.DELETE_QUESTION_SUCCESS
  };
}

function deleteQuestionFailure(error) {
  return {
    type: types.DELETE_QUESTION_FAILURE,
    payload: error
  };
}

export const deleteQuestion = (
  id,
  fetchQuestionsAction,
  history,
  homepageAfterDelete
) => async (dispatch) => {
  dispatch(deleteQuestionRequest());
  const url = `/api/questions/${id}`;
  try {
    await axios.delete(url, {
      headers: {
        Authorization: localStorage.jwtToken
      }
    });
    dispatch(deleteQuestionSuccess());
    if (homepageAfterDelete) {
      history.push('/');
    } else {
      fetchQuestionsAction();
    }
  } catch (error) {
    dispatch(deleteQuestionFailure(error.data));
  }
};

function fetchHotQuestionsRequest() {
  return {
    type: types.FETCH_HOT_QUESTIONS_REQUEST
  };
}

function fetchHotQuestionsSuccess(response) {
  return {
    type: types.FETCH_HOT_QUESTIONS_SUCCESS,
    payload: response
  };
}

function fetchHotQuestionsFailure(error) {
  return {
    type: types.FETCH_HOT_QUESTIONS_FAILURE,
    payload: error
  };
}

export const fetchHotQuestions = () => async (dispatch) => {
  dispatch(fetchHotQuestionsRequest());
  const url = '/api/questions/hot';
  try {
    const response = await axios.get(url);
    dispatch(fetchHotQuestionsSuccess(response.data));
  } catch (error) {
    dispatch(fetchHotQuestionsFailure(error.data));
  }
};

export const likeQuestion = (
  id,
  addLike,
  removeLike,
  userLikes
) => async () => {
  const url = `/api/rating/question/${id}/like`;
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

export const dislikeQuestion = (
  id,
  addDislike,
  removeDislike,
  userDislikes
) => async () => {
  const url = `/api/rating/question/${id}/dislike`;
  if (userDislikes) {
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
