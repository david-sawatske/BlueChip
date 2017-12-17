import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './home/home_page_container';
import MastheadContainer from './masthead/masthead_container';

const App = () => (
  <div className="container">
    <header className="header">
      <MastheadContainer />
    </header>

    <Switch className="body">
      <Route exact path="/" component={ HomePage } />
    </Switch>

    <footer className="footer">
      <h1>footer</h1>
    </footer>
  </div>
);

export default App;
