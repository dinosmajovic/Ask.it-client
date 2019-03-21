import { combineReducers } from 'redux';
import userDetailsReducer from './reducers/user-details';
import userQuestionsReducer from './reducers/user-questions';
import userSettingsReducer from './reducers/user-settings';

export default combineReducers({
  userDetails: userDetailsReducer,
  userQuestions: userQuestionsReducer,
  userSettings: userSettingsReducer
});
