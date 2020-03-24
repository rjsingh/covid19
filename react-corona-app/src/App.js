import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import './App.css';
import CoronaCasesTable from './CoronaCasesTable';

function App() {
  return (
    <Container>
    <div className="App">
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">UK coronavirus (COVID-19) cases</Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Extra information</Nav.Link>
              <Nav.Link href="#pricing">Support</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <CoronaCasesTable />
    </div>
    </Container>
  );
}

export default App;
