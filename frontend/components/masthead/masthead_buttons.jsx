import React from 'react';
import { Route, Link } from 'react-router-dom';
import Modal from 'react-modal';

import { ModalStyle } from '../../modal/modal_shared';

import SessionFormContainer from '../session_form/session_form_container';

class Masthead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      formType: null
    }

    this.modalToggle = this.modalToggle.bind(this);
  }

  handleSignout(e) {
    e.preventDefault();
    this.props.logout()
  }

  modalToggle() {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  formTypeToggle(formType) {
    this.setState({ formType: formType})
  }

  navLink(formType) {
    if (formType == 'login') {
      return (<button className="button" onClick={ (signup) =>
                 this.formTypeToggle('signup') }>
                 Sign Up
               </button>)
    } else if (formType == 'signup') {
      return (<button className="button" onClick={ (e) =>
                this.formTypeToggle('login') }>
                Sign In
              </button>) }
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="masthead">
        {currentUser ? (
          <div className="session-buttons">
            <button className="button" onClick={ (e) =>
                this.handleSignout(e) }>
                Sign Out
            </button>
          </div>

        ) : (
          <div className="session-buttons">
            <button className="button" onClick={ (e) => {
              this.formTypeToggle('login'); this.modalToggle(e) }}>
              Log In
            </button>
            <button className="button" onClick={ (e) => {
              this.formTypeToggle('signup'); this.modalToggle(e) }}>
              Sign Up
            </button>
            <button to="" className="button">Guest Login</button>
          </div>
        )}

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.modalToggle}
          style={ModalStyle}>

          <h1>session</h1>
          {this.navLink(this.state.formType)}
          <SessionFormContainer formType={this.state.formType}
                                currentUser={currentUser}/>
        </Modal>
      </div>
    );
  }
}

export default Masthead
