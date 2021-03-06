import React from 'react';

import ModalRoot from  '../modal/modal_root_container'

class MastheadButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSignout(e) {
    e.preventDefault();

    this.props.logout()
  }

  render() {
    const { currentUser, showModal, hideModal, login } = this.props;

    return (
      <div className="button-container">
        {currentUser ? (
          <div className="session-buttons">
            <button className="button" onClick={ (e) =>
                this.handleSignout(e) }>
                Sign Out
            </button>
          </div>
        ) : (
          <div className="session-buttons">
            <button className="button" onClick={ () =>
              showModal('session', { modalOpen: true, formType: 'login' }) }>
              Log In
            </button>
            <button className="button" onClick={ () =>
              showModal('session', { modalOpen: true, formType: 'signup' }) }>
              Sign Up
            </button>
            <button className="button"
              onClick={ () =>
                login({ username: 'Stockafeller', password: 'password' }) }>
              Guest Login
            </button>
          </div>
        )}

        <ModalRoot />
      </div>
    );
  }
}

export default MastheadButtons
