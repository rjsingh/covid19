import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

function NavigationBar() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark" sticky="top">
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
    )
}

export default NavigationBar;