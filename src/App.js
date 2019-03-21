import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import NotFoundPage from './containers/NotFoundPage';
import ProfilePage from './containers/ProfilePage';
import QuestionPage from './containers/QuestionPage';
import RegisterPage from './containers/RegisterPage';
import HasAuth from './hoc/has_auth';

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={HasAuth(LoginPage)} />
    <Route exact path="/register" component={HasAuth(RegisterPage)} />
    <Route exact path="/question/:id" component={QuestionPage} />
    <Route path="/profile/:id" component={ProfilePage} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default App;
