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


  /**
   * @description:
   * state property contains "information details" and "path" coordinates
   * to pass it to it's child component.
   * "isloading" is for showing and hiding the the application loader on events changes.
   */
  state = {
    isLoading: false,
    informationDetail: {
      "total_distance": null,
      "total_time": null,
      "error": null
    },
    pathDetails: null
  }

  /**
   * @description
   * toogles the loader value.
   */
  turnsLoader = loading => {
    this.setState({ isLoading: loading });
  };

/**
 * @description
 * if any calls fails and throws an error it will be shown as error modal messages,
 * alert is used as error modal display 
 */
  showError = (message) => {
    this.turnsLoader(false);
    alert(message);        
  }

  /**@param object its a request object to get routes by origin and destination
   * @description
   * service call to get path coordinates from backend after passing origin and destinantion coordinates
   */
  getRoutes = async (object) => {
    this.turnsLoader(true);
    let response = await fetchDirectionsApi(object).catch(e => this.showError('Internal Server Error'));;
    //to handler error sent by backend for location can't be reached by driving error 
    if (response && response.data.status.toLowerCase() === "failure") {
      this.turnsLoader(false);
      this.setState({
        informationDetail: {
          "error": response.data.error
        }
      });
    }
  
    //when response is successfull with path coordinates and information for distance and time.
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
 
  //to handle reset action buttons
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

  //error boundary to handle any error thrown in from react cycle.
  // it renders error handling dom instead of breaking the entire application.
  render() {
    return (
        <div className="App">
          <h1><b>Navigation with Google Map</b></h1>
          <div>
            <ErrorBoundary>{this.state.isLoading && <div><Loader isLoading={this.state.isLoading}/></div>}</ErrorBoundary>
            <ErrorBoundary><Route informationDetail={this.state.informationDetail} getRoutes={this.getRoutes} reset={this.reset} /></ErrorBoundary>
            <ErrorBoundary><Map pathDetails={this.state.pathDetails} /></ErrorBoundary>
          </div>
        </div>
    )
  }
}


export default Navigation;
