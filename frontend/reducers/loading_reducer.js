import { RECEIVE_SAMPLE_STOCK_DATA, RECEIVE_STOCK_SEARCH,
         START_REMOTE_FETCH } from '../actions/remote_stock_actions';

const initialState = {
  remoteStockLoading: false
};

const LoadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_SAMPLE_STOCK_DATA:
    case RECEIVE_STOCK_SEARCH:
      return Object.assign({}, state, { remoteStockLoading: false });
    case START_REMOTE_FETCH:
      return Object.assign({}, state, { remoteStockLoading: true });
    default:
      return state;
  }
};

export default LoadingReducer;
