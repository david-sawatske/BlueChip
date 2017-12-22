import { combineReducers } from 'redux';

import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';
import { RECEIVE_ALL_LEAGUES,
         RECEIVE_TARGET_LEAGUE } from '../actions/league_actions';

import { merge, union } from 'lodash';

const balancesById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser.cashBalances.cashBalancesById);
    case RECEIVE_TARGET_LEAGUE:
      return merge({}, state, action.targetLeague.cashBalances.balancesById);
    case RECEIVE_ALL_LEAGUES:
      return merge({}, state, getLeagueData(action).byId);
    default:
      return state;
  }
};

const allBalanceIds = (state = [], action) => {
  const allBalances = action.allBalances;
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union([], state, action.targetUser.cashBalances.allCashBalancesIds);
    case RECEIVE_TARGET_LEAGUE:
      return union([], state, action.targetLeague.cashBalances.allBalanceIds);
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
    byId = merge({}, byId, league.cashBalances.balancesById);
    allIds = union([], allIds, league.cashBalances.allBalanceIds)
  })

  return { byId: byId, allIds: allIds }
}
// END selectors //

const BalancesReducer = combineReducers({
  balancesById,
  allBalanceIds
});

export default BalancesReducer;
