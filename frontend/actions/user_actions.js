import * as UserAPIUtil from '../util/user_api_util';

export const START_RAILS_USER_FETCH = 'START_RAILS_USER_FETCH';
export const RECEIVE_TARGET_USER_DATA = 'RECEIVE_TARGET_USER_DATA';

// sync action creators
export const receiveTargetUserData = user => ({
  type: RECEIVE_TARGET_USER_DATA,
  targetUser: user
});

export const startRailsUserFetch = () => ({
  type: START_RAILS_USER_FETCH
});

// thunk async action creators
export const requestTargetUserData = id => dispatch => {
  dispatch(startRailsUserFetch());
  return UserAPIUtil.fetchTargetUserData(id).then(user =>{
    dispatch(receiveTargetUserData(user));
  });
};
