import { connect } from 'react-redux'

import { requestTargetUserData } from '../../actions/user_actions';
import { requestAllLeagues } from '../../actions/league_actions';
import { getLeagueUserData } from '../../reducers/selectors';

import LeagueIndex from './league_index';

const mapStateToProps = state => ({
  leagueIds: state.entities.leagues.allLeagueIds,
  currentUser: state.session.currentUser,
  leagueData: getLeagueUserData(state),
})

const mapDispatchToProps = dispatch => ({
  requestAllLeagues: () => dispatch(requestAllLeagues()),
  requestTargetUserData: id => dispatch(requestTargetUserData(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueIndex)
