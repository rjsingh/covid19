import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import NavigationBar from './NavigationBar';
import Home from './Home';
import Links from './Links';

function App() {
  return (
    <Router>

      <NavigationBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/links" component={Links} />
      </Switch>

    </Router>
  );
}

export default App;
