import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './home/home_page_container';
import UserShow from './users/user_show_container';
import Masthead from './masthead/masthead_container';
import LeagueForm from './league/league_form_container';
import LeagueIndex from './league/league_index_container';
import StockSearch from './stock_search/stock_search_container';

const App = () => (
  <div className="container">
    <header className="header">
      <Masthead />
    </header>

    <Switch className="body">
      <Route exact path="/leagues" component={ LeagueIndex }/>
      <Route path="/stocks/search" component={ StockSearch }/>
      <Route path="/leagues/new" component={ LeagueForm }/>
      <Route path="/users/:userId" component={ UserShow }/>
      <Route exact path="/" component={ HomePage } />
    </Switch>

    <footer className="footer">
      <h1>footer</h1>
    </footer>
  </div>
);

export default App;
