import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

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
    fetch(
      '/location/' + location,
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
    const { SearchBar } = Search;
    const columns = [{
      dataField: 'county',
      text: 'Region',
    }, {
      dataField: 'cases',
      text: '# Cases',
      sort: true,
      searchable: false
    }, {
      dataField: 'rank',
      text: "Rank",
      searchable: false
    }, {
      dataField: 'distance',
      text: "Distance to you (miles)",
      searchable: false
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
            <Alert variant="dark">Location: <i>{this.state.locationName}</i></Alert>
            <ToolkitProvider
              keyField="county"
              data={ cases }
              columns={ columns }
              search>
              {
                props => (
                  <div>
                  <SearchBar { ...props.searchProps } />
                  <hr />
                  <BootstrapTable bootstrap4
                                  { ...props.baseProps }
                                  striped hover condensed pagination={ paginationFactory() } />
                  </div>
                )
              }
            </ToolkitProvider>
          </div>
        }
      </div>
    );
  }
}

export default CoronaCasesTable;