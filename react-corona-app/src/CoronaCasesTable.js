import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class CoronaCasesTable extends React.Component {
  constructor() {
    super();
    this.state = {
      cases: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(location=null) {
    // Fetching data from FaceBook Jest Repo
    fetch(
      'http://localhost:5000/location/' + (location ? location : "cambridge"),
      {
        method: "GET",
      }
    )
      .then(res => res.json())
      .then(response =>
        this.setState({ cases: response })
      )
      .catch(error => console.log(error));
  }

  render() {
    navigator.geolocation.getCurrentPosition((position) => {
      const locationStr = position.coords.latitude + "," + position.coords.longitude;
      console.log(locationStr);
      this.loadData(locationStr);
    });
    const { cases} = this.state;
    const columns = [{
      dataField: 'county',
      text: 'County'
    }, {
      dataField: 'cases',
      text: '# Cases',
      sort: true
    }, {
      dataField: 'rank',
      text: "Rank (higher is worse)"
    }, {
      dataField: 'distance',
      text: "Distance to you (miles)",
      sort: true
    }];

    return (
      <div>
        <h1> UK coronavirus (COVID-19) cases </h1>
        <BootstrapTable bootstrap4 keyField='county' data={ cases } columns={ columns } striped hover condensed />
      </div>
    );
  }
}

export default CoronaCasesTable;