import { connect } from 'react-redux';

import { requestStockSearch } from '../../actions/remote_stock_actions';
import { getUserLeagueData } from '../../reducers/selectors'
import { requestTargetUserData } from '../../actions/user_actions';
import { hideModal, showModal } from '../../actions/modal_actions';

import StockSearch from './stock_search';

const mapStateToProps = state => ({
  currentUserData: getUserLeagueData(state, state.session.currentUser),
  isRemoteLoading: state.ui.loading.remoteStockLoading,
  isRailsUserLoading: state.ui.loading.railsUserLoading,
  remoteStockData: state.ui.remoteStocks.remoteStockData
});

const mapDispatchToProps = dispatch => ({
  requestStockSearch: (ticker, interval, dataTypes) => (
    dispatch(requestStockSearch(ticker, interval, dataTypes))
  ),
  requestTargetUserData: id => dispatch(requestTargetUserData(id)),
  showModal: (modalType, modalProps) => (
    dispatch(showModal(modalType, modalProps))
  ),
  hideModal: () => dispatch(hideModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockSearch);
