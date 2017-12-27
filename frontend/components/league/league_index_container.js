import { connect } from 'react-redux'

import { requestAllLeagues } from '../../actions/league_actions';
import { getLeagueUserData } from '../../reducers/selectors';

import LeagueIndex from './league_index';

const mapStateToProps = state => ({
  leagueIds: state.entities.leagues.allLeagueIds,
  leagueData: getLeagueUserData(state)
})

const mapDispatchToProps = dispatch => ({
  requestAllLeagues: () => dispatch(requestAllLeagues()),
  requestTargetUserData: id => dispatch(requestTargetUserData(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueIndex)
