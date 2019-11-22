import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from "redux-devtools-extension";
import createRootReducer from "./modules/rootReducer";
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const enhancer =
  process.env.NODE_ENV === "development" ? devToolsEnhancer() : null;

const store = createStore(createRootReducer(history) , compose(applyMiddleware(thunk, routerMiddleware(history)), enhancer));

export default store;
