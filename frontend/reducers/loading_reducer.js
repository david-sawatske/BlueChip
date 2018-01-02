import
{
  RECEIVE_STOCK_SEARCH,
  START_REMOTE_STOCK_FETCH
}
from '../actions/remote_stock_actions';
import
{
  RECEIVE_ALL_LEAGUES,
  RECEIVE_TARGET_LEAGUE,
  START_RAILS_LEAGUE_FETCH
}
from '../actions/remote_stock_actions';

const initialState = {
  remoteStockLoading: false,
  railsLeaugeLoading: false
};

const LoadingReducer = (state = initialState, action) =>
{
  Object.freeze(state);
  switch (action.type)
  {
    case RECEIVE_STOCK_SEARCH:
      return Object.assign(
      {}, state,
      {
        remoteStockLoading: false
      });
    case START_REMOTE_STOCK_FETCH:
      return Object.assign(
      {}, state,
      {
        remoteStockLoading: true
      });
    case RECEIVE_TARGET_LEAGUE:
    case RECEIVE_ALL_LEAGUES:
      return Object.assign(
      {}, state,
      {
        railsLeaugeLoading: false
      });
    case START_RAILS_LEAGUE_FETCH:
      return Object.assign(
      {}, state,
      {
        railsLeaugeLoading: true
      });
    default:
      return state;
  }
};

export default LoadingReducer;