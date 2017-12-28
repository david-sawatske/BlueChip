import React from 'react';
import { Route, Link } from 'react-router-dom';
import Modal from 'react-modal';

import { ModalStyle } from '../../modal/modal_shared';

import SessionFormContainer from '../session_form/session_form_container';
import MastheadButtons from './masthead_buttons';

class Masthead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser, logout } = this.props;

    return (
      <div className="masthead">
        <Link to="/" className="title">
          <h1>BlueChip</h1>
        </Link>

        <MastheadButtons currentUser={currentUser}
                         logout={logout}/>
      </div>
    );
  }
}

export default Masthead
