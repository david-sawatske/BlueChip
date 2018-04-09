import { combineReducers } from 'redux';

import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';
import { RECEIVE_SAMPLE_LEAGUE,
         RECEIVE_TARGET_LEAGUE } from '../actions/league_actions';

import { merge, union } from 'lodash';

const transactionsById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser
                                    .userLeagueTransactions
                                    .userLeagueTransactionsById
                  );
    case RECEIVE_TARGET_LEAGUE:
    case RECEIVE_SAMPLE_LEAGUE:
      return merge({}, state, action.targetLeague
                                    .userLeagueTransactions
                                    .userLeagueTransactionsById
                  );
    default:
      return state;
  }
};

const allTransactionIds = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union([], state, action.targetUser.transactions.allTransactionIds);
    case RECEIVE_TARGET_LEAGUE:
    case RECEIVE_SAMPLE_LEAGUE:
      return union([], state, action.targetLeague.transactions.allTransactionIds);
    default:
      return state;
  }
};

const UserLeagueTransactionsReducer = combineReducers({
  transactionsById,
  allTransactionIds
});

export default UserLeagueTransactionsReducer;
