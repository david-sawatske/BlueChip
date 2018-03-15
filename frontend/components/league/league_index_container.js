import { connect } from 'react-redux'

import { getUserLeagueIds, getLeagueUserData } from '../../reducers/selectors';
import { requestTargetUserData } from '../../actions/user_actions';
import { requestAllLeagues,



  requestTargetLeague } from '../../actions/league_actions';

import LeagueIndex from './league_index';

const mapStateToProps = state => ({
  isLeagueLoading: state.ui.loading.railsLeagueLoading,
  isUserLoading: state.ui.loading.railsUserLoading,
  leagueIds: state.entities.leagues.allLeagueIds,
  currentUserLeagueIds: getUserLeagueIds(state),
  allLeaguesData: getLeagueUserData(state),
})

const mapDispatchToProps = dispatch => ({
  requestTargetUserData: id => dispatch(requestTargetUserData(id)),
  requestTargetLeague: id => dispatch(requestTargetLeague(id)),
  requestAllLeagues: () => dispatch(requestAllLeagues())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueIndex)
