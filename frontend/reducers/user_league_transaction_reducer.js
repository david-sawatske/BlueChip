import { combineReducers } from 'redux';
import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';

import { merge, union } from 'lodash';

const userLeagueTransactionsById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser
                                    .userLeagueTransactions
                                    .userLeagueTransactionsById);

    default:
      return state;
  }
};

const allUserLeagueTransactionIds = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union([], state, action.targetUser
                                    .userLeagueTransactions
                                    .allUserLeagueTransactionIds);
    default:
      return state;
  }
};

const userLeagueTransactionsReducer = combineReducers({
  userLeagueTransactionsById,
  allUserLeagueTransactionIds
});

export default userLeagueTransactionsReducer;
