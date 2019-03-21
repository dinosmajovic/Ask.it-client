import axios from 'axios';

import * as types from '../types/top-users';

function fetchTopUsersRequest() {
  return {
    type: types.FETCH_TOP_USERS_REQUEST
  };
}

function fetchTopUsersSuccess(response) {
  return {
    type: types.FETCH_TOP_USERS_SUCCESS,
    payload: response
  };
}

function fetchTopUsersFailure(error) {
  return {
    type: types.FETCH_TOP_USERS_FAILURE,
    payload: error
  };
}

export const fetchTopUsers = () => async (dispatch) => {
  dispatch(fetchTopUsersRequest());
  const url = '/api/users/top';
  try {
    const response = await axios.get(url);
    dispatch(fetchTopUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchTopUsersFailure(error.data));
  }
};
