import { connect } from 'react-redux';

import { requestSampleLeague } from '../../actions/league_actions';

import HomePage from './home_page';

import { requestTargetUserData } from '../../actions/user_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
  requestSampleLeague: id => dispatch(requestSampleLeague(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
