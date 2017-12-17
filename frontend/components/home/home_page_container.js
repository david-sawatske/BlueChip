import { connect } from 'react-redux';

import HomePage from './home_page'

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
