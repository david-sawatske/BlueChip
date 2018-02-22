import React from 'react';
import { Route, Link } from 'react-router-dom';

import MastheadButtons from './masthead_buttons';
import TopNav from './top_nav';

const MastHead = props => (
  <div className="masthead">
    <Link to="/" className="logo">
      <img className="logo" src="http://res.cloudinary.com/sawatskeda10/image/upload/e_auto_contrast,q_100/v1516937726/cutmypic_1_pxnibw.png" />
    </Link>

    <Link to="/" className="title">
      <h1>BlueChip</h1>
    </Link>

    <MastheadButtons { ...props }/>
    <TopNav />
  </div>
);

export default MastHead;
