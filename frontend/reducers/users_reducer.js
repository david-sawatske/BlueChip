import { combineReducers } from 'redux';

import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';

import { merge, union } from 'lodash';

const usersById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, action.targetUser.users.usersById);
    default:
      return state;
  }
};

const allUserIds = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union(state, action.targetUser.users.allUserIds);
    default:
      return state;
  }
};

const UsersReducer = combineReducers({
  usersById,
  allUserIds
});


export default UsersReducer;
