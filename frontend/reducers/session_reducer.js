import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

import merge from 'lodash/merge'

const defaultState = { currentUser: null };

const SessionReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;

      return merge({}, { currentUser });
    default:
      return state;
  }
};

export default SessionReducer;
