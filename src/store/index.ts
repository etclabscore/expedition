import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router'

import thunk from 'redux-thunk';

import { AppState } from './types';

import nodes from './nodes';

export const history = createHashHistory();

// Build the middleware for intercepting and dispatching navigation actions

const rootReducer = combineReducers<any>({
  nodes: nodes.reducer,
  router: connectRouter(history)
});

const loggerMiddleware = createLogger({
  stateTransformer: (state: AppState) => state,
});

const store: Store<AppState> = createStore<AppState, any, any, null>(
  rootReducer,
  applyMiddleware(loggerMiddleware, routerMiddleware(history), thunk),
);

export default store;
