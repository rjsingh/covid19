import React from "react";
import CoronaCasesTable from './CoronaCasesTable';
import {Container, Row, Col} from 'react-bootstrap';

function Home() {
  return (
    <Container>
        <Row>
            <Col><CoronaCasesTable /></Col>
            <Col><p>Something else</p></Col>
        </Row>
    </Container>
  )
}

export default Home;