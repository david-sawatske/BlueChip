import { connect } from 'react-redux';
import { login, signup, clearSessionErrors } from '../../actions/session_actions';
import { requestTargetUserData } from '../../actions/user_actions';
import { hideModal } from '../../actions/modal_actions';

import SessionForm from './session_form';

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.ui.errors.session
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.formType
  const processForm = (formType === 'login') ? login : signup;

  return {
    requestTargetUserData: id => dispatch(requestTargetUserData(id)),
    clearSessionErrors: user => dispatch(clearSessionErrors(user)),
    processForm: user => dispatch(processForm(user)),
    hideModal: user => dispatch(hideModal()),
    formType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
