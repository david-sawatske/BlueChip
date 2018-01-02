import { connect } from 'react-redux';

import { requestTargetLeague } from '../../actions/league_actions';
import { getLeagueUserData } from '../../reducers/selectors';

import HomePage from './home_page';

import { requestTargetUserData } from '../../actions/user_actions';

const mapStateToProps = state => ({
  leagueIds: state.entities.leagues.allLeagueIds,
  leagueData: getLeagueUserData(state),
  currentUser: state.session.currentUser,
})

const mapDispatchToProps = dispatch => ({
  requestTargetLeague: id => dispatch(requestTargetLeague(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
