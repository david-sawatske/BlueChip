import { connect } from 'react-redux';

import HomePage from './home_page';

import { requestTargetUserData } from '../../actions/user_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
})

const mapDispatchToProps = dispatch => ({
  requestTargetUserData: id => dispatch(requestTargetUserData(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
