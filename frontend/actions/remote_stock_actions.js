import * as RemoteStockAPIUtil from '../util/remote_api_util';

export const START_REMOTE_STOCK_FETCH = 'START_REMOTE_STOCK_FETCH';
export const START_REMOTE_PEER_FETCH = 'START_REMOTE_PEER_FETCH';
export const START_SYMBOL_FETCH = 'START_SYMBOL_FETCH';
export const START_CHART_FETCH = 'START_CHART_FETCH';
export const RECEIVE_STOCK_SEARCH = 'RECEIVE_STOCK_SEARCH';
export const RECEIVE_PEER_SEARCH = 'RECEIVE_PEER_SEARCH';
export const RECEIVE_CHART_DATA = 'RECEIVE_CHART_DATA';
export const RECEIVE_SYMBOLS = 'RECEIVE_SYMBOLS';

// sync action creators
export const receiveStockSearch = stockSeriesData => ({
  type: RECEIVE_STOCK_SEARCH,
  stockSeriesData
});

export const receiveChartData = (symbol, interval, stockChartData) => ({
  type: RECEIVE_CHART_DATA,
  chartData: { [symbol]: { [interval]: stockChartData }}
});

export const receivePeerSearch = stockPeerData => ({
  type: RECEIVE_PEER_SEARCH,
  stockPeerData
});

export const startStockRemoteFetch = () => ({
  type: START_REMOTE_STOCK_FETCH
});

export const startChartFetch = () => ({
  type: START_CHART_FETCH
});

export const startStockPeerFetch = () => ({
  type: START_REMOTE_PEER_FETCH
});

export const receiveSymbols = symbolData => ({
  type: RECEIVE_SYMBOLS,
  symbolData
});

export const startSymbolFetch = () => ({
  type: START_SYMBOL_FETCH
});

// thunk async action creators
export const requestStockSearch = (symbol, dataTypes) => dispatch => {
  dispatch(startStockRemoteFetch());

  return RemoteStockAPIUtil.fetchStockSeries(symbol, dataTypes)
    .then(stockSeriesData => {
      dispatch(receiveStockSearch(stockSeriesData));
  });
}

export const requestChartUpdate = (symbol, interval) => dispatch => {
  dispatch(startChartFetch());

  return RemoteStockAPIUtil.fetchChartUpdate(symbol, interval)
    .then(stockChartData => {
      dispatch(receiveChartData(symbol, interval, stockChartData));
  });
}

export const requestStockPeers = tkrStr => dispatch => {
  dispatch(startStockPeerFetch());

  return RemoteStockAPIUtil.fetchPeers(tkrStr)
    .then(stockPeerData => {
      dispatch(receivePeerSearch(stockPeerData));
  });
}

export const requestSymbols = () => dispatch => {
  dispatch(startSymbolFetch());

  return RemoteStockAPIUtil.fetchSymbols()
    .then(symbolData => dispatch(receiveSymbols(symbolData)))
};
