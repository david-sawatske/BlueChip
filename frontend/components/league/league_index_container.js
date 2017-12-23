import { connect } from 'react-redux'

import { requestAllLeagues } from '../../actions/league_actions';

import LeagueIndex from './league_index';

const mapStateToProps = state => ({
  leagueIds: state.entities.leagues.allLeagueIds,
  leaguesById: state.entities.leagues.leaguesById,
})

const mapDispatchToProps = dispatch => ({
  requestAllLeagues: () => dispatch(requestAllLeagues()),
  requestTargetUserData: id => dispatch(requestTargetUserData(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueIndex)
