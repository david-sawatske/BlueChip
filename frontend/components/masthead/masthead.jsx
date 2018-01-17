import React from 'react';
import { Route, Link } from 'react-router-dom';

import MastheadButtons from './masthead_buttons';

const MastHead = props => (
  <div className="masthead">
    <Link to="/" className="logo">
      <img className="logo" src="http://res.cloudinary.com/sawatskeda10/image/upload/v1516212174/logo_vuxq8f.jpg" />
    </Link>

    <Link to="/" className="title">
      <h1>BlueChip</h1>
    </Link>

    <MastheadButtons { ...props }/>
  </div>
);

export default MastHead;
