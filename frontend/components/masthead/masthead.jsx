import React from 'react';
import { Route, Link } from 'react-router-dom';

import MastheadButtons from './masthead_buttons';

const MastHead = props => (
  <div>
    <Link to="/" className="title">
      <h1>BlueChip</h1>
    </Link>

    <MastheadButtons { ...props }/>
  </div>
);

export default MastHead;
