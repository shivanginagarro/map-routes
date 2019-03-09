import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { MAP_SETTING } from "../map/map-config";
import { mapInitOnLoad } from '../map/map-api-init-service';
var GoogleMapsLoader = require('google-maps');

let _this;
class RouteForm extends React.PureComponent {

    startPointPlaces;
    dropPointPlaces;

    constructor(props) {
        super(props);
        _this = this;
        _this.state = {
            startingPoint: "",
            droppingPoint: "",
            error: null,
            total_distance: null,
            total_time: null,
            labelSubmit:"Submit"
        }
    }

    componentDidMount() {
        _this.setUpApiKeyInMap();
    }

    setUpApiKeyInMap = async () => {
        // NOTE TO SELF :probably use destructuring if possible
        GoogleMapsLoader.KEY = MAP_SETTING.KEY;
        GoogleMapsLoader.LIBRARIES = MAP_SETTING.LIBRARIES;
        let response = await mapInitOnLoad(GoogleMapsLoader);
        _this.map = response;
        _this.getPlacesData(response);
    }


    getPlacesData = (googleObj) => {
        let originPlace = new googleObj.maps.places.Autocomplete(_this.startPoint)
        let destinationPlace = new googleObj.maps.places.Autocomplete(_this.dropPoint)
        googleObj.maps.event.addListener(originPlace, 'place_changed', () => {
            _this.startPointPlaces = originPlace.getPlace();
        })
        googleObj.maps.event.addListener(destinationPlace, 'place_changed', () => {
            _this.dropPointPlaces = destinationPlace.getPlace();
        })
    }


    getRouteInMap = (event) => {
        event.preventDefault();
        //resetting states but not working need to check.
        _this.resetStates();
        let originCoordinates = [
            _this.startPointPlaces.geometry.location.lat().toString(),
            _this.startPointPlaces.geometry.location.lng().toString()
        ]
        let destinationCorodinates = [
            _this.dropPointPlaces.geometry.location.lat().toString(),
            _this.dropPointPlaces.geometry.location.lng().toString()
        ]
        this.props.getRoutes({ "origin": originCoordinates, "destination": destinationCorodinates })
    }

    resetForm = () => {
        _this.startPoint = undefined;
        _this.dropPoint = undefined;
        _this.resetStates();
    }

    resetStates = () => {
        _this.setState({
            error: null,
            total_distance: null,
            total_time: null,
        });
    }

    static getDerivedStateFromProps(props,state) {
        const { informationDetail } = props;
        const { total_time, total_distance, error } = informationDetail;
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

    componentDidUpdate(){}

    render() {
        return (
            <form>
                <label> Starting Point:  <input type="text" name="starting" ref={el => _this.startPoint = el} placeholder="Pick Up From" /> </label>
                <label> Dropping Point:  <input type="text" name="dropping" ref={el => _this.dropPoint = el} placeholder="Drop To" /> </label>
                {_this.state.total_distance ? 
                       <div><label>Total Distance</label>:{_this.state.total_distance}</div> : null}
                {_this.state.total_time ? 
                       <div><label>Total Time</label>:{_this.state.total_time}</div> : null}
                {_this.state.error ? 
                       <div><label>Error</label>:{_this.state.error}</div> : null}
                <input type="submit" value={_this.state.labelSubmit} onClick={_this.getRouteInMap} /> <button onClick={_this.resetForm}>Reset</button>
            </form>
        )
    }
}

RouteForm.propTypes = {
    googleObject: PropTypes.object
}
export default RouteForm;
