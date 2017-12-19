import { combineReducers } from 'redux';

import { RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';

import { merge, union } from 'lodash';

const usersById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return merge({}, state, getUserById(action));
    default:
      return state;
  }
};

const allUserIds = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_TARGET_USER_DATA:
      return union(state, [action.targetUser.id]);
    default:
      return state;
  }
};

// START: Selectors (temp) //
const getUserById = action => {
  const targetUser = action.targetUser;

  return { [targetUser.id]: { id: targetUser.id,
                              username: targetUser.username}}
};

const UsersReducer = combineReducers({
  usersById,
  allUserIds
});
// START: Selectors (temp)//

export default UsersReducer;
