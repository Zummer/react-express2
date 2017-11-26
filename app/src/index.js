import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware  } from "redux";
import { Provider  } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import api from './middlewares/api';
import App from './App';
import rootReducer from './rootReducer';
import registerServiceWorker from './registerServiceWorker';

const middlewares = [
  api,
  thunk
];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root')
);

registerServiceWorker();

