import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import AuthReducer from './auth/reducer';
import HomePageReducer from './containers/HomePage/reducer';
import ProfilePageReducer from './containers/ProfilePage/reducer';
import QuestionPageReducer from './containers/QuestionPage/reducer';

export default combineReducers({
  form,
  user: AuthReducer,
  homePage: HomePageReducer,
  questionPage: QuestionPageReducer,
  profilePage: ProfilePageReducer
});
