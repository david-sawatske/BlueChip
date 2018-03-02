import { connect } from 'react-redux';

import { requestStockSearch,
         requestStockPeers,
         requestSymbols } from '../../actions/remote_stock_actions';
import { requestTargetLeague } from '../../actions/league_actions';
import { hideModal, showModal } from '../../actions/modal_actions';
import { requestTargetUserData } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';

import { getLeagueUserData } from '../../reducers/selectors';

import HomePage from './home_page';

const mapStateToProps = state => ({
  remoteStockData: state.ui.remoteStocks.remoteStockData,
  leagueIds: state.entities.leagues.allLeagueIds,
  leagueData: getLeagueUserData(state),
  currentUser: state.session.currentUser
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestTargetLeague: id => dispatch(requestTargetLeague(id)),
  requestStockSearch: (ticker, interval, dataTypes) => (
    dispatch(requestStockSearch(ticker, interval, dataTypes))
  ),
  requestStockPeers: () => dispatch(requestStockPeers()),
  requestSymbols: () => dispatch(requestSymbols()),
  logout: () => dispatch(logout()),
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
