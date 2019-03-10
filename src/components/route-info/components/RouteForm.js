import React from 'react';
import PropTypes from 'prop-types';
import '../route-style.css';
import RouteInfo from "./RouteInfo";
import { mapInitOnLoad } from "../../../common/services/requests/map/index";
import { MAP_SETTING } from "../../../common/services/configurations/map/index";

let _this;
class RouteForm extends React.PureComponent {

    startPointPlaces;
    dropPointPlaces;
    google;

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


    async setUpApiKeyInMap(){
        let response = await mapInitOnLoad();
        console.log("inside route setUpApiKeyInMap",response);
        _this.google = response;
        _this.getPlacesData(response);        
    }

    componentDidMount() {
          _this.setUpApiKeyInMap();
        console.log('inside route this.google,componentDidMount',_this.google);
    }

    getPlacesData = (googleObj) => {
        let originPlace = new googleObj.maps.places.Autocomplete(_this.startPoint)
        let destinationPlace = new googleObj.maps.places.Autocomplete(_this.dropPoint)
        console.log('originPlace.getPlace()',originPlace.getPlace());
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
        let  originLocation =  _this.startPointPlaces && _this.startPointPlaces.geometry.location;
        let  destinationLocation = _this.dropPointPlaces && _this.dropPointPlaces.geometry.location; 
        console.log(originLocation,destinationLocation,event);
        let originCoordinates = [
            originLocation.lat().toString(),originLocation.lng().toString()
        ]
        let destinationCorodinates = [
            destinationLocation.lat().toString(),destinationLocation.lng().toString()
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
            <div className="directions-form">
                <label> Starting Point:  <input type="text" name="starting" ref={el => _this.startPoint = el} placeholder="Pick Up From" /> </label>
                <label> Dropping Point:  <input type="text" name="dropping" ref={el => _this.dropPoint = el} placeholder="Drop To" /> </label>
                <RouteInfo informationDetail={_this.props.informationDetail}/>
                <button onClick={_this.getRouteInMap}>{_this.state.labelSubmit}</button> <button onClick={_this.resetForm}>Reset</button>
            </div>
        )
    }
}


export default RouteForm;
