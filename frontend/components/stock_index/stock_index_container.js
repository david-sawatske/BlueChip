import { connect } from 'react-redux';

import { requestStockSearch } from '../../actions/remote_stock_actions'
import { hideModal, showModal } from '../../actions/modal_actions';

import StockIndex from './stock_index';

const mapStateToProps = (state, ownProps) => ({
  isRemoteStockLoading: state.ui.loading.remoteStockLoading,
  isRailsUserLoading: state.ui.loading.railsUserLoading,
  remoteStockData: state.ui.remoteStocks.remoteStockData,
  ownedTickers: getOwnedTickers(ownProps.transactionData),
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestStockSearch: (ticker, interval, dataTypes) => (
    dispatch(requestStockSearch(ticker, interval, dataTypes))
  ),
  showModal: (modalType, modalProps) => (
    dispatch(showModal(modalType, modalProps))
  ),
  hideModal: () => dispatch(hideModal())
});

// Selects all of the ticker symbols for owned stocks
const getOwnedTickers = transactionData => {
  let tickers = [];

  Object.values(transactionData).map(transaction => {
    tickers.push([...new Set(Object.values(transaction).map(a => a.symbol))])
  })

  return tickers.join()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockIndex);
