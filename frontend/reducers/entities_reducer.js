import { combineReducers } from 'redux';

import UsersReducer from './users_reducer';
import LeaguesReducer from './leagues_reducer';

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  leagues: LeaguesReducer,
});

export default EntitiesReducer;
