import { combineReducers } from 'redux';
import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';

import { merge, union } from 'lodash';

const userLeagueBalancesById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser
                                    .userLeagueBalances
                                    .userLeagueBalancesById);

    default:
      return state;
  }
};

const allUserLeagueBalanceIds = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union([], state, action.targetUser
                                    .userLeagueBalances
                                    .allUserLeagueBalanceIds);
    default:
      return state;
  }
};

const UserLeagueBalancesReducer = combineReducers({
  userLeagueBalancesById,
  allUserLeagueBalanceIds
});

export default UserLeagueBalancesReducer;
