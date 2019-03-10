import React from 'react';
import PropTypes from 'prop-types';
import '../route-style.css';
import RouteInfo from "./RouteInfo";
import { mapInitOnLoad } from "../../../common/services/index";
import { MAP_SETTING } from "../../../common/configurations/constants/index";

class RouteForm extends React.PureComponent {

    startPointPlaces;
    dropPointPlaces;
    google;

    constructor(props) {
        super(props);
        this.state = {
            startingPoint: "",
            droppingPoint: "",
            error: null,
            total_distance: null,
            total_time: null,
            labelSubmit:"Submit"
        }
    }


    async setUpApiKeyInMap(){
        let response = await mapInitOnLoad();
        this.google = response;
        this.getPlacesData(response);        
    }

    componentDidMount() {
          this.setUpApiKeyInMap();
    }

    getPlacesData = (googleObj) => {
        let originPlace = new googleObj.maps.places.Autocomplete(this.startPoint)
        let destinationPlace = new googleObj.maps.places.Autocomplete(this.dropPoint)
        googleObj.maps.event.addListener(originPlace, 'place_changed', () => {
            this.startPointPlaces = originPlace.getPlace();
        })
        googleObj.maps.event.addListener(destinationPlace, 'place_changed', () => {
            this.dropPointPlaces = destinationPlace.getPlace();
        })
    }


    getRouteInMap = (event) => {
        event.preventDefault();
        //resetting states but not working need to check.
        this.resetStates();
        let  originLocation =  this.startPointPlaces && this.startPointPlaces.geometry.location;
        let  destinationLocation = this.dropPointPlaces && this.dropPointPlaces.geometry.location; 
        let originCoordinates = [
            originLocation.lat().toString(),originLocation.lng().toString()
        ]
        let destinationCorodinates = [
            destinationLocation.lat().toString(),destinationLocation.lng().toString()
        ]
        this.props.getRoutes({ "origin": originCoordinates, "destination": destinationCorodinates })
    }

    resetForm = () => {
        this.startPoint.value = null;
        this.dropPoint.value = null;
        this.resetStates();
    }

    resetStates = () => {
        this.setState({
            error: null,
            total_distance: null,
            total_time: null,
        });
    }

    static getDerivedStateFromProps(props,state) {
        const { informationDetail } = props;
        const { total_time, total_distance, error } = informationDetail;
        console.log('getDerivedStateFromProps',state)
        if (informationDetail) {
            return {
                total_distance,
                total_time,
                error,
                labelSubmit: total_distance || error ?"Re-Submit":"Submit"
            }
        }
        return null;
    }

    getSnapshotBeforeUpdate(){
        console.log('getSnapshotBeforeUpdate')
    }

    componentDidUpdate(){}

    render() {
        return (
            <div className="directions-form">
                <label> Starting Point:  <input type="text" name="starting" ref={el => this.startPoint = el} placeholder="Pick Up From" /> </label>
                <label> Dropping Point:  <input type="text" name="dropping" ref={el => this.dropPoint = el} placeholder="Drop To" /> </label>
                <RouteInfo informationDetail={this.props.informationDetail}/>
                <button onClick={this.getRouteInMap}>{this.state.labelSubmit}</button> <button onClick={this.resetForm}>Reset</button>
            </div>
        )
    }
}


export default RouteForm;
