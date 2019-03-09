import React from 'react';
import './App.css';

/**
 * importing files for our homepage ui components
 */
import RouteInfo from './components/route-info/index.js';
import Map from './components/map/index.js';
import ErrorBoundary from './components/error-handling/error-handler';

import { fetchDirectionsApi } from './components/route-info/service';



class App extends React.PureComponent {

  state = {
    isLoading: false,
    errorMessage: null,
    informationDetail: {
      "total_distance": null,
      "total_time": null,
      "error": null
    },
    pathDetails: null
  }

  turnsLoader = loading => {
    this.setState({ isLoading: loading });
  };


  showError = (message) => {
    this.turnsLoader(false);
    alert(message);        
  }

  getRoutes = async (object) => {
    this.turnsLoader(true);
    let response = await fetchDirectionsApi(object).catch(e => this.showError('Internal Server Error'));;

    if (response && response.data.status.toLowerCase() === "failure") {
      this.turnsLoader(false);
      this.setState({
        informationDetail: {
          "error": response.data.error
        }
      });
    }

    if (response && response.data.status.toLowerCase() === "success") {
      this.turnsLoader(false);
      this.setState({
      pathDetails : response.data.path,
      informationDetail : {
        "total_distance": response.data.path.total_distance,
        "total_time": response.data.path.total_time,
      }
     })
    }

  }

  render() {
    let informationDetail = null;

    return (
      <ErrorBoundary>
        <div className="App">
          <h1><b>Routing with Google Map</b></h1>
          <div className={{ "width": 100 + "%" }}>
            {this.state.loading && <h1>LOADING ....!!!!!!</h1>}
            <RouteInfo informationDetail={this.state.informationDetail} getRoutes={this.getRoutes} />
            <Map pathDetails={this.state.pathDetails} />
          </div>
        </div>
      </ErrorBoundary>
    )
  }
}


export default App;
