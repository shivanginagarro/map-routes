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
            message: ""
        }
    }

    componentWillMount() {
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
        googleObj.maps.event.addListener(originPlace, 'place_changed', () =>{
            _this.startPointPlaces = originPlace.getPlace();
         })
         googleObj.maps.event.addListener(destinationPlace, 'place_changed', () =>{
            _this.dropPointPlaces = destinationPlace.getPlace();
         })
    }


    getRouteInMap = (event) =>{
        event.preventDefault();
        this.props.getRoutes(_this.startPointPlaces,_this.dropPointPlaces);     
    }

    render() {
        return (
            <form>
                <label> Starting Point:  <input type="text" name="starting" ref={el => _this.startPoint = el} placeholder="Pick Up From" /> </label>
                <label> Dropping Point:  <input type="text" name="dropping" ref={el => _this.dropPoint = el} placeholder="Drop To" /> </label>
                {_this.state.message && _this.state.message.length > 0 ? <div>{_this.state.message}</div> : null}
                <input type="submit" value="Submit" onClick={_this.getRouteInMap} /> <button>Reset</button>
            </form>
        )
    }
}

RouteForm.propTypes = {
    googleObject: PropTypes.object
}
export default RouteForm;
