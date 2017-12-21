import { combineReducers } from 'redux';
import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';

import { merge, union } from 'lodash';

const leaguesById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser.leagues.leaguesById);
    default:
      return state;
  }
};

const allLeagueIds = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union([], state, action.targetUser.leagues.allLeagueIds);
    default:
      return state;
  }
};

const LeaguesReducer = combineReducers({
  leaguesById,
  allLeagueIds
});

export default LeaguesReducer;
