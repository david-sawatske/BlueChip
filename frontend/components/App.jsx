import React from 'react';
import { Route, Switch } from 'react-router-dom';

const App = () => (
  <div className="container">
    <header className="header">
      <h1>header</h1>
    </header>

    <Switch className="body">
      <Route exact path="/" component={ TempComponent } />
    </Switch>

    <footer className="footer">
      <h1>footer</h1>
    </footer>
  </div>
);

export default App;

const TempComponent = () => (
  <div>
    <h1>HOME</h1>
  </div>
)
