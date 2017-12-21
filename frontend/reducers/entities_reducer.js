import { combineReducers } from 'redux';

import UsersReducer from './users_reducer';
import LeaguesReducer from './leagues_reducer';
import TransactionsReducer from './transactions_reducer';

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  leagues: LeaguesReducer,
  transactions: TransactionsReducer,
});

export default EntitiesReducer;
