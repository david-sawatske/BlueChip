import { connect } from 'react-redux';
import { login, signup, clearSessionErrors } from '../../actions/session_actions';

import SessionForm from './session_form';

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.formType
  const processForm = (formType === 'login') ? login : signup;

  return {
    clearSessionErrors: user => dispatch(clearSessionErrors(user)),
    processForm: user => dispatch(processForm(user)),
    formType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
