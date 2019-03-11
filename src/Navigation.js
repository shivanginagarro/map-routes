import React from 'react';
import './Navigation.css';

import Route from './components/route-info/components/Route';
import Map from './components/map/components/Map';
import ErrorBoundary from './common/utility/error-modal/error-modal';
import  { Loader } from "./common/utility/loader/loader"; 
import { fetchDirectionsApi } from './common/services/index';



class Navigation extends React.PureComponent {

  constructor(props){
    super(props);
    this.reset = this.reset.bind(this);
  }

  state = {
    isLoading: false,
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

  reset(){
    this.turnsLoader(true);
    this.setState({
      informationDetail: {
        "total_distance": null,
        "total_time": null,
        "error": null,
      },
      "pathDetails":null      
    })
    this.turnsLoader(false);    
  }

  render() {
    return (
        <div className="App">
          <h1><b>Navigation with Google Map</b></h1>
          <div className={{ "width": 100 + "%" }}>
            <ErrorBoundary>{this.state.isLoading && <div style={{"height":100+"px"}}><Loader isLoading={this.state.isLoading}/></div>}</ErrorBoundary>
            <ErrorBoundary><Route informationDetail={this.state.informationDetail} getRoutes={this.getRoutes} reset={this.reset} /></ErrorBoundary>
            <ErrorBoundary><Map pathDetails={this.state.pathDetails} /></ErrorBoundary>
          </div>
        </div>
    )
  }
}


export default Navigation;
