import { combineReducers } from 'redux';

import { RECEIVE_TRANSACTION } from '../actions/transaction_actions';
import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';
import { RECEIVE_ALL_LEAGUES,
         RECEIVE_SAMPLE_LEAGUE,
         RECEIVE_TARGET_LEAGUE } from '../actions/league_actions';

import { merge, union } from 'lodash';

const transactionsById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TRANSACTION:
      return merge({}, state, action.transaction.transactions.transactionsById);
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser.transactions.transactionsById);
    case RECEIVE_TARGET_LEAGUE:
    case RECEIVE_SAMPLE_LEAGUE:
      return merge({}, state, action.targetLeague.transactions.transactionsById);
    case RECEIVE_ALL_LEAGUES:
      return merge({}, state, getLeagueData(action).byId);
    default:
      return state;
  }
};

const allTransactionIds = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_TRANSACTION:
      return union([], state, action.transaction.transactions.allTransactionIds);
    case RECEIVE_TARGET_USER_DATA:
      return union([], state, action.targetUser.transactions.allTransactionIds);
    case RECEIVE_TARGET_LEAGUE:
    case RECEIVE_SAMPLE_LEAGUE:
      return union([], state, action.targetLeague.transactions.allTransactionIds);
    case RECEIVE_ALL_LEAGUES:
      return union(state, getLeagueData(action).allIds);
    default:
      return state;
  }
};

// START selectors //
const getLeagueData = obj => {
  let byId = {};
  let allIds = [];

  Object.values(obj.allLeagues).map(league => {
    byId = merge({}, byId, league.transactions.transactionsById);
    allIds = union([], allIds, league.transactions.allTransactionIds)
  })

  return { byId: byId, allIds: allIds }
}
// END selectors //

const TransactionsReducer = combineReducers({
  transactionsById,
  allTransactionIds
});

export default TransactionsReducer;
