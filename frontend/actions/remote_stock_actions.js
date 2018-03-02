import * as RemoteStockAPIUtil from '../util/remote_api_util';

export const START_REMOTE_STOCK_FETCH = 'START_REMOTE_STOCK_FETCH';
export const START_REMOTE_PEER_FETCH = 'START_REMOTE_PEER_FETCH';
export const RECEIVE_STOCK_SEARCH = 'RECEIVE_STOCK_SEARCH';
export const RECEIVE_PEER_SEARCH = 'RECEIVE_PEER_SEARCH';
export const RECEIVE_SYMBOLS = 'RECEIVE_SYMBOLS';


// sync action creators
export const receiveStockSearch = stockSeriesData => ({
  type: RECEIVE_STOCK_SEARCH,
  stockSeriesData
});

export const receivePeerSearch = stockPeerData => ({
  type: RECEIVE_PEER_SEARCH,
  stockPeerData
});

export const startStockRemoteFetch = () => ({
  type: START_REMOTE_STOCK_FETCH
});

export const startStockPeerFetch = () => ({
  type: START_REMOTE_PEER_FETCH
});

export const receiveSymbols = symbolData => ({
  type: RECEIVE_SYMBOLS,
  symbolData
});

// thunk async action creators
export const requestStockSearch = (symbol, interval, dataTypes) => dispatch => {
  dispatch(startStockRemoteFetch());

  return RemoteStockAPIUtil.fetchStockSeries(symbol, interval, dataTypes)
    .then(stockSeriesData => {
      dispatch(receiveStockSearch(stockSeriesData));
  });
}

export const requestStockPeers = tkrStr => dispatch => {
  dispatch(startStockPeerFetch());

  return RemoteStockAPIUtil.fetchPeers(tkrStr)
    .then(stockPeerData => {
      dispatch(receivePeerSearch(stockPeerData));
  });
}

export const requestSymbols = () => dispatch => (
  RemoteStockAPIUtil.fetchSymbols()
    .then(symbolData => dispatch(receiveSymbols(symbolData)))
);
