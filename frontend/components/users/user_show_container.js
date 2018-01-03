import { connect } from 'react-redux';

import { requestTargetUserData } from '../../actions/user_actions';

import UserShow from './user_show';

const mapStateToProps = state => ({
  isRailsUserLoading: state.ui.loading.railsUserLoading,
  currentUser: state.session.currentUser,
  usersById: state.entities.users.usersById,
});

const mapDispatchToProps = dispatch => ({
  requestTargetUserData: id => dispatch(requestTargetUserData(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);
