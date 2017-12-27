import { connect } from 'react-redux';

import { requestSampleLeague } from '../../actions/league_actions';
import { getLeagueUserData } from '../../reducers/selectors';

import HomePage from './home_page';

import { requestTargetUserData } from '../../actions/user_actions';

const mapStateToProps = state => ({
  leagueIds: state.entities.leagues.allLeagueIds,
  leagueData: getLeagueUserData(state),
  currentUser: state.session.currentUser,
})

const mapDispatchToProps = dispatch => ({
  requestSampleLeague: id => dispatch(requestSampleLeague(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
