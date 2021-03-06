import { connect } from 'react-redux';

import { requestStockSearch, requestStockPeers } from '../../actions/remote_stock_actions'
import { hideModal, showModal } from '../../actions/modal_actions';

import StockIndex from './stock_index';

const mapStateToProps = (state, ownProps) => ({
  isRemoteStockLoading: state.ui.loading.remoteStockLoading,
  remoteStockData: state.ui.remoteStocks.remoteStockData,
  isPeerLoading: state.ui.loading.remotePeersLoading,
  ownedTickers: getOwnedTickers(ownProps.transactionData),
  additionalDataTypes: 'financials,earnings,relevant,',
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestStockSearch: (ticker, dataTypes) => (
    dispatch(requestStockSearch(ticker, dataTypes))
  ),
  requestStockPeers: (peerStr) => (
    dispatch(requestStockPeers(peerStr))
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
