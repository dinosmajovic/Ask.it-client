import axios from 'axios';
import * as types from '../types/user-questions';

function fetchUserQuestionsRequest(loadMore) {
  return {
    type: types.FETCH_USER_QUESTIONS_REQUEST,
    loadMore
  };
}

function fetchUserQuestionsSuccess(response) {
  return {
    type: types.FETCH_USER_QUESTIONS_SUCCESS,
    payload: response
  };
}

function fetchUserQuestionsFailure(error) {
  return {
    type: types.FETCH_USER_QUESTIONS_FAILURE,
    payload: error
  };
}

export const fetchUserQuestions = ({ page, take, id }, loadMore) => async (
  dispatch
) => {
  dispatch(fetchUserQuestionsRequest(loadMore));
  const url = `/api/users/profile/${id}/questions`;
  try {
    const response = await axios.post(url, { page, take });
    dispatch(fetchUserQuestionsSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserQuestionsFailure(error.response.data));
  }
};
