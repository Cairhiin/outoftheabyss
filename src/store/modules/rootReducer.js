import { combineReducers } from "redux";
import logbook from "./logbook/reducers";
import characters from "./characters/reducers";
import npcs from "./npcs/reducers";
import visibilityFilter from './npcs/visibilityFilter';
import sortColumn from './npcs/sortColumn';
import auth from './auth/reducers';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) => combineReducers({
  logbook,
  characters,
  npcs,
  visibilityFilter,
  sortColumn,
  auth,
  router: connectRouter(history)
});

export default createRootReducer;
