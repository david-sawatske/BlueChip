import { connect } from 'react-redux';

import LeagueForm from './league_form';
import { createLeague } from '../../actions/league_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  createLeague: league => dispatch(createLeague(league))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueForm);
