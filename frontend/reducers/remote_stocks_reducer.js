import { combineReducers } from 'redux';

import { mergeWith, union } from 'lodash';

import { RECEIVE_SYMBOLS,
         RECEIVE_CHART_DATA,
         RECEIVE_PEER_SEARCH,
         RECEIVE_STOCK_SEARCH,
         START_REMOTE_PEER_FETCH,
         START_REMOTE_STOCK_FETCH } from '../actions/remote_stock_actions';

const remoteStockData = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_PEER_SEARCH:
      return mergeWith({}, action.stockPeerData, state, customizer);
    case RECEIVE_STOCK_SEARCH:
      return mergeWith({}, action.stockSeriesData, state, customizer);
    case START_REMOTE_STOCK_FETCH:
      return mergeWith({}, action.stockSeriesData, state, customizer);
    case START_REMOTE_PEER_FETCH:
      return mergeWith({}, action.stockPeerData, state, customizer);
    default:
      return state;
  }
};

const remoteSymbols = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_SYMBOLS:
      return getNameSymbol(action.symbolData);
    default:
      return state;
  }
};

const remoteChartData = (state = {}, action) => {
  switch(action.type) {

  case RECEIVE_CHART_DATA:
    return mergeWith({}, action.chartData, state);
  default:
    return state;
  }
};

// START: Selectors //
const customizer = (objValue, srcValue) => {
  if (objValue <= srcValue) {
    return objValue;
  }
}

const getNameSymbol = (symbolData) => {
  return symbolData.map(data => {
    return { name: data.name,  symbol: data.symbol }
  })
}


// START: Selectors //

const RemoteStocksReducer = combineReducers({
  remoteStockData,
  remoteSymbols,
  remoteChartData
});

export default RemoteStocksReducer;
