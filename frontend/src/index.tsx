// import these two polyfills to support IE
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { setToken } from './utils/fetch';
import rootSaga from './sagas';
import rootReducer from './reducers';
import theme from './theme';
import loggerMiddleware from './utils/loggerMiddleware';
import { saveState, loadState } from './utils/localStorage';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();
const persistedState = loadState();
const store = createStore(rootReducer, persistedState, applyMiddleware(sagaMiddleware, loggerMiddleware));
if (persistedState) {
  setToken(persistedState.auth.token);
}
store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(<ThemeProvider theme={theme}>
  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
  <CssBaseline />
  <Provider store={store}>
    <App />
  </Provider>
</ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
