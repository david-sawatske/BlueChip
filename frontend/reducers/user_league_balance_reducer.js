import { combineReducers } from 'redux';

import { RECEIVE_TARGET_BALANCE } from '../actions/cash_balance_actions';
import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';
import { RECEIVE_ALL_LEAGUES,
         RECEIVE_SAMPLE_LEAGUE,
         RECEIVE_TARGET_LEAGUE } from '../actions/league_actions';

import { merge, union } from 'lodash';

const userLeagueBalancesById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser
                                    .userLeagueBalances
                                    .userLeagueBalancesById
                  );
    case RECEIVE_TARGET_LEAGUE:
    case RECEIVE_SAMPLE_LEAGUE:
      return merge({}, state, action.targetLeague
                                    .userLeagueBalances
                                    .userLeagueBalancesById
                  );
    case RECEIVE_TARGET_BALANCE:
      return merge({}, state, action.targetBalance
                                    .userLeagueBalances
                                    .userLeagueBalancesById
                  );
    case RECEIVE_ALL_LEAGUES:
      return merge({}, state, getLeagueData(action).byId);
    default:
      return state;
  }
};

const allUserLeagueBalanceIds = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union([], state, action.targetUser
                                    .userLeagueBalances
                                    .allUserLeagueBalanceIds
                  );
    case RECEIVE_TARGET_LEAGUE:
    case RECEIVE_SAMPLE_LEAGUE:
      return union([], state, action.targetLeague
                                    .userLeagueBalances
                                    .allUserLeagueBalanceIds
                  );
    case RECEIVE_TARGET_BALANCE:
      return union([], state, action.targetBalance
        .userLeagueBalances
        .allUserLeagueBalanceIds
      );
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
    byId = merge({}, byId, league.userLeagueBalances
                                 .userLeagueBalancesById);
    allIds = union([], allIds, league.userLeagueBalances
                                     .allUserLeagueBalanceIds);
  })

  return { byId: byId, allIds: allIds }
}
// END selectors //

const UserLeagueBalancesReducer = combineReducers({
  userLeagueBalancesById,
  allUserLeagueBalanceIds
});

export default UserLeagueBalancesReducer;
