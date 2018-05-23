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

    <a target="_blank" href="https://github.com/david-sawatske/BlueChip">
      <img className="github" src="http://res.cloudinary.com/sawatskeda10/image/upload/v1523645571/github_gepeui.png" />
    </a>

    <a target="_blank" href="http://www.sawatske.com">
      <img className="personal-page" src="http://res.cloudinary.com/sawatskeda10/image/upload/v1524860068/personal-page_qrmtcq.png" />
    </a>

    <MastheadButtons { ...props }/>

    <TopNav currentUser={props.currentUser} />
  </div>
);

export default MastHead;
