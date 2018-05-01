import { RECEIVE_SYMBOLS,
         RECEIVE_PEER_SEARCH,
         RECEIVE_STOCK_SEARCH,
         START_SYMBOL_FETCH,
         START_REMOTE_PEER_FETCH,
         START_REMOTE_STOCK_FETCH } from '../actions/remote_stock_actions';

import { RECEIVE_ALL_LEAGUES,
         RECEIVE_TARGET_LEAGUE,
         START_RAILS_LEAGUE_FETCH } from '../actions/league_actions';

import { START_RAILS_USER_FETCH,
         RECEIVE_TARGET_USER_DATA } from '../actions/user_actions';

const initialState = {
  remoteStockLoading: false,
  remotePeersLoading: false,
  railsLeagueLoading: false,
  railsUserLoading: false,
  symbolsLoading: false
};

const LoadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_STOCK_SEARCH:
      return Object.assign({}, state, { remoteStockLoading: false });
    case RECEIVE_PEER_SEARCH:
      return Object.assign({}, state, { remotePeersLoading: false });
    case START_REMOTE_STOCK_FETCH:
      return Object.assign({}, state, { remoteStockLoading: true });
    case START_REMOTE_PEER_FETCH:
      return Object.assign({}, state, { remotePeersLoading: true });
    case RECEIVE_TARGET_LEAGUE:
    case RECEIVE_ALL_LEAGUES:
      return Object.assign({}, state, { railsLeagueLoading: false });
    case START_RAILS_LEAGUE_FETCH:
      return Object.assign({}, state, { railsLeagueLoading: true });
    case RECEIVE_TARGET_USER_DATA:
      return Object.assign({}, state, { railsUserLoading: false });
    case START_RAILS_USER_FETCH:
      return Object.assign({}, state, { railsUserLoading: true });
    case START_SYMBOL_FETCH:
      return Object.assign({}, state, { symbolsLoading: true });
    case RECEIVE_SYMBOLS:
      return Object.assign({}, state, { symbolsLoading: false });
    default:
      return state;
  }
};

export default LoadingReducer;
