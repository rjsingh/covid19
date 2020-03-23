import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

class CoronaCasesTable extends React.Component {
  constructor() {
    super();
    this.state = {
      cases: [],
      locationName: "unknown location"
    };
  }

  componentDidMount() {
    this.loadData();
    navigator.geolocation.getCurrentPosition((position) => {
      const locationStr = position.coords.latitude + "," + position.coords.longitude;
      console.log(locationStr);
      this.loadData(locationStr);
    });
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
        this.setState({ cases: response.data, locationName: response.your_location })
      )
      .catch(error => console.log(error));
  }

  render() {
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
        <h4>Location: {this.state.locationName}</h4>
        <div>
          <BootstrapTable bootstrap4
                          keyField='county'
                          data={ cases }
                          columns={ columns }
                          striped hover condensed />
        </div>
      </div>
    );
  }
}

export default CoronaCasesTable;