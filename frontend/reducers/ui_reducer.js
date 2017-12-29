import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import errors from './errors_reducer';
import loading from './loading_reducer';
import remoteStocks from './remote_stocks_reducer';

export default combineReducers({
  errors,
  loading,
  remoteStocks
});
