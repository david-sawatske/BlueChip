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
    if (this.state.formType == 'login') {
      NavLink = <button className="button" onClick={ (signup) =>
                  this.formTypeToggle('signup') }>
                  Sign Up
                </button>
    } else if (this.state.formType == 'signup') {
        NavLink = <button className="button" onClick={ (e) =>
                    this.formTypeToggle('login') }>
                    Sign In
                  </button>
     }

    return (
      <div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={hideModal}
          style={ModalStyle}>

          <h1>Session</h1>
          { NavLink }

          <SessionFormContainer formType={this.state.formType}
                                currentUser={currentUser} />
        </Modal>
      </div>
    );
  }

}

export default SesssionModal;
