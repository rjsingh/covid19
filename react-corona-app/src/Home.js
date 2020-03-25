import React from "react";
import CoronaCasesTable from './CoronaCasesTable';
import {Container, Row, Col, Jumbotron} from 'react-bootstrap';

function Home() {
  return (
    <div>
      <Jumbotron>
        <p>
          This site was created to provide UK residents statistical information on the spread of the coronavirus
          within the UK.The data source for the information is from <a href="https://www.arcgis.com/home/item.html?id=bc8ee90225644ef7a6f4dd1b13ea1d67">Arcgis</a>
        </p>
        <p>
          This site does not provide medical information or anything to that effect. Please if you're a UK resident
          who wants medical information go to the <a href="https://www.nhs.uk/conditions/coronavirus-covid-19/"> NHS website</a>
        </p>
      </Jumbotron>
      <Container>
          <Row>
              <Col><CoronaCasesTable /></Col>
          </Row>
      </Container>
    </div>
  )
}

export default Home;