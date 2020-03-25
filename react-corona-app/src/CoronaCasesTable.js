import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Spinner from 'react-bootstrap/Spinner';

class CoronaCasesTable extends React.Component {
  constructor() {
    super();
    this.state = {
      cases: [],
      locationName: ""
    };
  }

  componentDidMount() {
    this.loadData("");
    navigator.geolocation.getCurrentPosition((position) => {
      const locationStr = position.coords.latitude + "," + position.coords.longitude;
      this.loadData(locationStr);
    });
  }

  loadData(location=null) {
    // Fetching data from FaceBook Jest Repo
    fetch(
      'http://localhost/location/' + location,
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
      text: "Rank"
    }, {
      dataField: 'distance',
      text: "Distance to you (miles)"
    }];
    return (
      <div>
        {cases.length === 0 ?
          <div>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <p>Getting location data...</p>
          </div>
        :
          <div>
          <p>Location: {this.state.locationName}</p>
          <BootstrapTable bootstrap4
                          keyField='county'
                          data={ cases }
                          columns={ columns }
                          striped hover condensed pagination={ paginationFactory() } />
          </div>
        }
      </div>
    );
  }
}

export default CoronaCasesTable;