import React from 'react';
import { Route, Link } from 'react-router-dom';

import MastheadButtons from './masthead_buttons';

const MastHead = ({ currentUser, logout }) => (
  <div>
    <Link to="/" className="title">
      <h1>BlueChip</h1>
    </Link>

    <MastheadButtons currentUser={currentUser}
                     logout={logout}/>
  </div>
);

export default MastHead;
