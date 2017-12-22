import { combineReducers } from 'redux';

import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';
import { RECEIVE_TARGET_LEAGUE,
         RECEIVE_ALL_LEAGUES } from '../actions/league_actions';

import { merge, union } from 'lodash';

const leaguesById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser.leagues.leaguesById);
    case RECEIVE_TARGET_LEAGUE:
      return merge({}, state, action.targetLeague.leagues.leaguesById);
    case RECEIVE_ALL_LEAGUES:
      return merge({}, state, getLeagueData(action).byId);
    default:
      return state;
  }
};

const allLeagueIds = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union([], state, action.targetUser.leagues.allLeagueIds);
    case RECEIVE_TARGET_LEAGUE:
      return union([], state, action.targetLeague.leagues.allLeagueIds);
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
    byId = merge({}, byId, league.leagues.leaguesById);
    allIds = union([], allIds, league.leagues.allLeagueIds)
  })

  return { byId: byId, allIds: allIds }
}
// END selectors //

const LeaguesReducer = combineReducers({
  leaguesById,
  allLeagueIds
});

export default LeaguesReducer;
