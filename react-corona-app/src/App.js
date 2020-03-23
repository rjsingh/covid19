import React from 'react';
import { Navbar} from 'react-bootstrap';
import './App.css';
import CoronaCasesTable from './CoronaCasesTable';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">UK coronavirus (COVID-19) cases</Navbar.Brand>
        </Navbar>
      </header>
      <CoronaCasesTable />
    </div>
  );
}

export default App;
