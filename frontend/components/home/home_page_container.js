import { connect } from 'react-redux';

import { requestTargetLeague } from '../../actions/league_actions';
import { getLeagueUserData } from '../../reducers/selectors';

import HomePage from './home_page';

import { requestStockSearch } from '../../actions/remote_stock_actions';
import { requestTargetUserData } from '../../actions/user_actions';

const mapStateToProps = state => ({
  remoteStockData: state.ui.remoteStocks.remoteStockData,
  leagueIds: state.entities.leagues.allLeagueIds,
  leagueData: getLeagueUserData(state),
  currentUser: state.session.currentUser,
})

const mapDispatchToProps = dispatch => ({
  requestTargetLeague: id => dispatch(requestTargetLeague(id)),
  requestStockSearch: ticker => dispatch(requestStockSearch(ticker))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
