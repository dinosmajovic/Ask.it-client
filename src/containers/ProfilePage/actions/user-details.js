import axios from 'axios';
import * as types from '../types/user-details';


function fetchUserDetailsRequest() {
  return {
    type: types.FETCH_USER_DETAILS_REQUEST
  };
}

function fetchUserDetailsSuccess(response) {
  return {
    type: types.FETCH_USER_DETAILS_SUCCESS,
    payload: response
  };
}

function fetchUserDetailsFailure(error) {
  return {
    type: types.FETCH_USER_DETAILS_FAILURE,
    payload: error
  };
}

export const fetchUserDetails = (userId) => async (dispatch) => {
  dispatch(fetchUserDetailsRequest());
  const url = `/api/users/profile/${userId}`;
  try {
    const response = await axios.get(url);
    dispatch(fetchUserDetailsSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserDetailsFailure(error.response.data));
  }
};
