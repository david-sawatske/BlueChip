import { combineReducers } from 'redux';

import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';

import { merge, union } from 'lodash';

const balancesById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser.cashBalances.cashBalancesById);
    default:
      return state;
  }
};

const allBalanceIds = (state = [], action) => {
  const allBalances = action.allBalances;
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union([], state, action.targetUser.cashBalances.allCashBalancesIds);
    default:
      return state;
  }
};

const BalancesReducer = combineReducers({
  balancesById,
  allBalanceIds
});

export default BalancesReducer;
