import { combineReducers } from 'redux';
import questionsReducer from './reducers/questions';
import topUsersReducer from './reducers/top-users';

export default combineReducers({
  topUsers: topUsersReducer,
  questions: questionsReducer
});
