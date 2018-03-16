import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './home/home_page_container';
import UserShow from './users/user_show_container';
import Masthead from './masthead/masthead_container';
import LeagueForm from './league/league_form_container';
import LeagueIndex from './league/league_index_container';
import StockSearch from './stock_search/stock_search_container';

import Loader from './shared/loader';

const App = () => (
  <div className="container">
    <nav className="header">
      <Switch>
        <Route exact path="/" component={ null }/>
        <Route exact path="*" component={ Masthead }/>
      </Switch>
    </nav>
    <section className="body">
      <Switch>
        <Route exact path="/leagues" component={ LeagueIndex }/>
        <Route path="/stocks/search" component={ StockSearch }/>
        <Route path="/leagues/new" component={ LeagueForm }/>
        <Route path="/users/:userId" component={ UserShow }/>
        <Route exact path="/" component={ HomePage } />
        <Route  path="/loader" component={ Loader } />
        <Route path="*" component={ ()=>(<h1>No Match</h1>) } />
      </Switch>
    </section>
  </div>
);

export default App;
