import { connect } from 'react-redux';

import { requestStockSearch,
         requestStockPeers,
         requestSymbols } from '../../actions/remote_stock_actions';
import { hideModal, showModal } from '../../actions/modal_actions';
import { requestTargetUserData } from '../../actions/user_actions';
import { logout, login } from '../../actions/session_actions';

import { getLeagueUserData, getUserLeagueData } from '../../reducers/selectors';

import HomePage from './home_page';

const mapStateToProps = state => ({
  remoteStockData: state.ui.remoteStocks.remoteStockData,
  tickerData: state.ui.remoteStocks.remoteSymbols,
  userId: state.entities.users.allUserIds[0],
  leagueUserData: getLeagueUserData(state),
  userLeagueData: getUserLeagueData(state),
  currentUser: state.session.currentUser
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestTargetUserData: id => dispatch(requestTargetUserData(id)),
  requestStockSearch: (ticker, dataTypes) => (
    dispatch(requestStockSearch(ticker, dataTypes))
  ),
  requestStockPeers: () => dispatch(requestStockPeers()),
  requestSymbols: () => dispatch(requestSymbols()),
  logout: () => dispatch(logout()),
  login: user => dispatch(login(user)),
  hideModal: () => dispatch(hideModal()),
  showModal: (modalType, modalProps) => (
    dispatch(showModal(modalType, modalProps))
  ),
  currentPath: ownProps.match.path,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
