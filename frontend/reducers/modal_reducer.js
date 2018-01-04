import { SHOW_MODAL, HIDE_MODAL } from '../actions/session_actions';

const defaultState = {
  modalType: null,
  modalProps: {}
}

const ModalReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch(action.type){
    case 'SHOW_MODAL':
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      }
    case 'HIDE_MODAL':
      return defaultState
    default:
      return state;
  }
};

export default ModalReducer;
