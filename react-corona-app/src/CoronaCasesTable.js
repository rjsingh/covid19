import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast'

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
      text: "Rank (higher is worse)"
    }, {
      dataField: 'distance',
      text: "Distance to you (miles)",
      sort: true
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
          <Toast>
            <Toast.Header>
              <strong>Location</strong>
            </Toast.Header>
            <Toast.Body>
              {this.state.locationName}
            </Toast.Body>
          </Toast>
          <BootstrapTable bootstrap4
                          keyField='county'
                          data={ cases }
                          columns={ columns }
                          striped hover condensed className="theme-dark" />
          </div>
        }
      </div>
    );
  }
}

export default CoronaCasesTable;