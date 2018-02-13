import * as RemoteStockAPIUtil from '../util/remote_api_util';

export const START_REMOTE_STOCK_FETCH = 'START_REMOTE_STOCK_FETCH';
export const START_REMOTE_PEER_FETCH = 'START_REMOTE_PEER_FETCH';
export const RECEIVE_STOCK_SEARCH = 'RECEIVE_STOCK_SEARCH';

// sync action creators
export const receiveStockSearch = stockSeriesData => ({
  type: RECEIVE_STOCK_SEARCH,
  stockSeriesData
});

export const startStockRemoteFetch = () => ({
  type: START_REMOTE_STOCK_FETCH
});

export const startStockPeerFetch = () => ({
  type: START_REMOTE_PEER_FETCH
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
  dispatch(startStockRemoteFetch());

  return RemoteStockAPIUtil.fetchPeers(tkrStr)
    .then(stockPeerData => {
      dispatch(receiveStockSearch(stockPeerData));
  });
}
