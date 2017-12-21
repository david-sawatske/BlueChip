import { combineReducers } from 'redux';

import UsersReducer from './users_reducer';
import LeaguesReducer from './leagues_reducer';
import TransactionsReducer from './transactions_reducer';
import userLeagueTransactionsReducer from './user_league_transaction_reducer';

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  leagues: LeaguesReducer,
  transactions: TransactionsReducer,
  userLeagueTransactions: userLeagueTransactionsReducer
});

export default EntitiesReducer;
