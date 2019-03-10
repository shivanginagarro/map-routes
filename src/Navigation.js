import React from 'react';
import './Navigation.css';

import RouteInfo from './components/route-info/components/Route';
import Map from './components/map/components/Map';
import ErrorBoundary from './common/utility/error-modal/error-modal';
import  { Loader } from "./common/utility/loader/loader"; 
import { fetchDirectionsApi } from './common/services/requests/routes/index';



class Navigation extends React.PureComponent {

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
        "total_distance": response.data.total_distance,
        "total_time": response.data.total_time,
      }
     })
    }

  }

  render() {
    console.log('this.state.pathDetails',this.state.pathDetails);
    return (
        <div className="App">
          <h1><b>Routing with Google Map</b></h1>
          <div className={{ "width": 100 + "%" }}>
            <ErrorBoundary>{this.state.isLoading && <div style={{"height":30+"px"}}><Loader isLoading={this.state.isLoading}/></div>}</ErrorBoundary>
            <ErrorBoundary><RouteInfo informationDetail={this.state.informationDetail} getRoutes={this.getRoutes} /></ErrorBoundary>
            <ErrorBoundary><Map pathDetails={this.state.pathDetails} /></ErrorBoundary>
          </div>
        </div>
    )
  }
}


export default Navigation;
