import React from 'react';
import Modal from 'react-modal';

import SessionFormContainer from '../session_form/session_form_container';

import { ModalStyle } from './modal_shared';

class SesssionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formType: null
    }
  }

  componentWillMount() {
    this.setState({ formType: this.props.formType })
  }

  formTypeToggle(type) {
    this.setState({ formType: type })
  }

  render() {
    const { modalOpen, hideModal, currentUser } = this.props;

    let NavLink = null;
    let NavHeader = null;
    if (this.state.formType == 'login') {
      NavLink = <button className="session-toggle" onClick={ (signup) =>
                  this.formTypeToggle('signup') }>
                  Need an Account? Sign Up Here!
                </button>
      NavHeader = <h1>Login</h1>
    } else if (this.state.formType == 'signup') {
        NavLink = <button className="session-toggle" onClick={ (e) =>
                    this.formTypeToggle('login') }>
                    Click Here to Sign In
                  </button>
        NavHeader = <h1>Sign Up</h1>
     }

    return (
      <div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={hideModal}
          style={ModalStyle}
          className="session-modal">

          { NavLink }

          { NavHeader }

          <SessionFormContainer formType={this.state.formType}
                                currentUser={currentUser} />
        </Modal>
      </div>
    );
  }

}

export default SesssionModal;
