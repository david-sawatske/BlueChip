import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import { RECEIVE_STOCK_SERIES,
         RECEIVE_STOCK_SEARCH } from '../actions/remote_stock_actions';

const remoteStockData = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_STOCK_SERIES:
      return merge({}, state, action);
    case RECEIVE_STOCK_SEARCH:
      return merge({}, state, action);
    default:
      return state;
  }
};

const RemoteStocksReducer = combineReducers({
  remoteStockData
});

export default RemoteStocksReducer;
