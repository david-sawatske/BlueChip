import React from 'react';

import ModalRoot from  '../modal/modal_root_container'

class Masthead extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSignout(e) {
    e.preventDefault();

    this.props.logout()
  }

  render() {
    const { currentUser, showModal, hideModal } = this.props;

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
            <button className="button" onClick={ () =>
              showModal('session', { modalOpen: true, formType: 'login' }) }>
              Log In
            </button>
            <button className="button" onClick={ () =>
              showModal('session', { modalOpen: true, formType: 'signup' }) }>
              Sign Up
            </button>
            <button to="" className="button">Guest Login</button>
          </div>
        )}

        <ModalRoot />
      </div>
    );
  }
}

export default Masthead
