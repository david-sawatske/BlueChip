import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_TARGET_USER_DATA = 'RECEIVE_TARGET_USER_DATA';

// sync action creators
export const receiveTargetUserData = user => ({
  type: RECEIVE_TARGET_USER_DATA,
  targetUser: user
});

// thunk async action creators
export const requestTargetUserData = id => dispatch => (
  UserAPIUtil.fetchTargetUserData(id).then(user => {
    dispatch(receiveTargetUserData(user))
  })
);
