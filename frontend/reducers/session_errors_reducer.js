import { RECEIVE_CURRENT_USER,
         RECEIVE_SESSION_ERRORS } from '../actions/session_actions';

const defaultState = [];

export default (state = defaultState, action) => {
  Object.freeze(state);
  const errors = action.errors;

  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors
    case RECEIVE_CURRENT_USER:
      return defaultState;
    default:
      return state;
  }
};
