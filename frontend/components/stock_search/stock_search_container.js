import { connect } from 'react-redux';

import { requestStockSearch } from '../../actions/remote_stock_actions';

import StockSearch from './stock_search';

const mapStateToProps = state => ({
  isRemoteLoading: state.ui.loading.remoteStockLoading
});

const mapDispatchToProps = dispatch => ({
  requestStockSearch: (ticker, interval) => (
    dispatch(requestStockSearch(ticker, interval))
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockSearch);
