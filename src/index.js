import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { loginWithToken } from './auth/actions';
import './sass/bundles/styles.scss';
import store from './store';

const token = localStorage.getItem('jwtToken');
if (token) {
  store.dispatch(loginWithToken(token));
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
