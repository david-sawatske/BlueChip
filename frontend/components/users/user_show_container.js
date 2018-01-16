import { connect } from 'react-redux';

import { requestTargetUserData } from '../../actions/user_actions';

import { getUserLeagueData } from '../../reducers/selectors'

import UserShow from './user_show';

const mapStateToProps = state => ({
  isRailsUserLoading: state.ui.loading.railsUserLoading,
  userData: getUserLeagueData(state)
});

const mapDispatchToProps = dispatch => ({
  requestTargetUserData: id => dispatch(requestTargetUserData(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);
