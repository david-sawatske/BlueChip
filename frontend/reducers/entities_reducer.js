import { combineReducers } from 'redux';

import UsersReducer from './users_reducer';
import LeaguesReducer from './leagues_reducer';
import BalancesReducer from './cash_balances_reducer';
import TransactionsReducer from './transactions_reducer';
import UserLeagueBalancesReducer from './user_league_balance_reducer';
import UserLeagueTransactionsReducer from './user_league_transaction_reducer';

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  leagues: LeaguesReducer,
  cashBalances: BalancesReducer,
  transactions: TransactionsReducer,
  userLeagueBalances: UserLeagueBalancesReducer,
  userLeagueTransactions: UserLeagueTransactionsReducer,
});

export default EntitiesReducer;
