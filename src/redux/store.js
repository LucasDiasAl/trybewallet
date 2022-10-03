import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rooteReducer from './reducers';

const store = createStore(rooteReducer, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}

export default store;
