import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware  } from 'redux';
import { Provider  } from 'react-redux';
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import { composeWithDevTools } from 'redux-devtools-extension';
import api from './middlewares/api';
import App from './App';
import rootReducer from './rootReducer';
import registerServiceWorker from './registerServiceWorker';
import { userLoggedIn } from './actions/auth';

const middlewares = [
  api,
  thunk
];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

if (localStorage.bookwormJWT) {
  const payload = decode(localStorage.bookwormJWT);

  const user = {
    email: payload.email,
    confirmed: payload.confirmed,
    token: localStorage.bookwormJWT
  };

  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root')
);

registerServiceWorker();

