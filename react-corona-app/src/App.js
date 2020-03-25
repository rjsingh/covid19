import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter as Router } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import './App.css';
import Home from './Home';
import Links from './Links';

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar bg="dark" variant="dark">
            <LinkContainer to="/">
              <Navbar.Brand>UK coronavirus (COVID-19) cases</Navbar.Brand>
            </LinkContainer>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/links">
                  <Nav.Link>Extra information</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/">
                  <Nav.Link>Support</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/links" component={Links} />
        </Switch>
      </Router>
  );
}

export default App;
