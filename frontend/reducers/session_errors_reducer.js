import { RECEIVE_CURRENT_USER,
         CLEAR_SESSION_ERRORS,
         RECEIVE_SESSION_ERRORS } from '../actions/session_actions';

const defaultState = [];

export default (state = defaultState, action) => {
  Object.freeze(state);
  const errors = action.errors;

  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return defaultState;
    default:
      return state;
  }
};
