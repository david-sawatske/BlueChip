import { combineReducers } from 'redux';

import { mergeWith} from 'lodash';

import { RECEIVE_STOCK_SERIES,
         RECEIVE_STOCK_SEARCH } from '../actions/remote_stock_actions';

const remoteStockData = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_STOCK_SERIES:
      return mergeWith({}, action.stockSeriesData, state, customizer);
    case RECEIVE_STOCK_SEARCH:
      return mergeWith({}, action.stockSeriesData, state, customizer);
    default:
      return state;
  }
};

// START: Selectors //
function customizer(objValue, srcValue) {
  if (objValue <= srcValue) {
    return objValue;
  }
}
// START: Selectors //

const RemoteStocksReducer = combineReducers({
  remoteStockData
});

export default RemoteStocksReducer;
