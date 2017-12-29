import * as RemoteStockAPIUtil from '../util/remote_api_util';

export const START_REMOTE_FETCH = 'START_REMOTE_FETCH';
export const RECEIVE_STOCK_SEARCH = 'RECEIVE_STOCK_SEARCH';
export const RECEIVE_SAMPLE_STOCK_DATA = 'RECEIVE_SAMPLE_STOCK_DATA';

// sync action creators
export const receiveStockSearch = stockSeriesData => ({
  type: RECEIVE_STOCK_SEARCH,
  stockSeriesData
});

export const receiveSampleStockData = stockSeriesData => ({
  type: RECEIVE_SAMPLE_STOCK_DATA,
  stockSeriesData
});

export const startRemoteFetch = () => ({
  type: START_REMOTE_FETCH
});

// thunk async action creators
export const  requestStockSearch = (symbol, interval) => dispatch => {
  dispatch(startRemoteFetch());
  return RemoteStockAPIUtil.fetchStockSeries(symbol, interval)
    .then(stockSeriesData => {
      dispatch(receiveStockSearch(stockSeriesData));
      return stockSeriesData;
  });
}

export const requestSampleData = (symbol, interval) => dispatch => (
  RemoteStockAPIUtil.fetchStockSeries(symbol, interval)
    .then(stockSeriesData => dispatch(receiveSampleStockData(stockSeriesData)))
);
