import { combineReducers } from 'redux';
import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';

import { merge, union } from 'lodash';

const transactionsById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser.userLeagueTransactions.userLeagueTransactionsById);
    default:
      return state;
  }
};

const allTransactionIds = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union([], state, action.targetUser.transactions.allTransactionIds);
    default:
      return state;
  }
};

const TransactionsReducer = combineReducers({
  transactionsById,
  allTransactionIds
});

export default TransactionsReducer;
