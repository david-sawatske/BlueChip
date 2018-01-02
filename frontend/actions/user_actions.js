import * as UserAPIUtil from '../util/user_api_util';

export const START_REMOTE_FETCH = 'START_REMOTE_FETCH';
export const RECEIVE_TARGET_USER_DATA = 'RECEIVE_TARGET_USER_DATA';

// sync action creators
export const receiveTargetUserData = user => ({
  type: RECEIVE_TARGET_USER_DATA,
  targetUser: user
});

export const startRemoteFetch = () => ({
  type: START_REMOTE_FETCH
});

// thunk async action creators
export const requestTargetUserData = id => dispatch => {
  dispatch(startRemoteFetch());
  return UserAPIUtil.fetchTargetUserData(id).then(user =>{
    dispatch(receiveTargetUserData(user));
    return user;
  });
};
