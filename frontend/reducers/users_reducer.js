import { combineReducers } from 'redux';

import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';
import { RECEIVE_ALL_LEAGUES,
         RECEIVE_SAMPLE_LEAGUE,
         RECEIVE_TARGET_LEAGUE } from '../actions/league_actions';

import { merge, union } from 'lodash';

const usersById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser.users.usersById);
    case RECEIVE_TARGET_LEAGUE:
    case RECEIVE_SAMPLE_LEAGUE:
      return merge({}, state, action.targetLeague.users.usersById);
    case RECEIVE_ALL_LEAGUES:
      return merge({}, state, getLeagueData(action).byId);
    default:
      return state;
  }
};

const allUserIds = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union(state, action.targetUser.users.allUserIds);
    case RECEIVE_TARGET_LEAGUE:
    case RECEIVE_SAMPLE_LEAGUE:
      return union(state, action.targetLeague.users.allUserIds);
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
    byId = merge({}, byId, league.users.usersById);
    allIds = union([], allIds, league.users.allUserIds)
  })

  return { byId: byId, allIds: allIds }
}
// END selectors //

const UsersReducer = combineReducers({
  usersById,
  allUserIds
});


export default UsersReducer;
