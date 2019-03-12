import React from 'react';
import PropTypes from 'prop-types';
import '../route-style.css';
import RouteInfo from "../component/RouteInfo";
import { mapInitOnLoad } from "../../../common/services/index";
import { requiredValidation, samePlaceValidation } from "../constant/constant";

class RouteForm extends React.PureComponent {
    //to save selected place object for origin 
    startPointPlaces;
    //to save selected place object for destination     
    dropPointPlaces;
    //to store google object locally
    google;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            total_distance: null,
            total_time: null,
            labelSubmit: "Submit",
            origin: '',
            destination: ''
        }
        this.originChangeHanlder = this.originChangeHanlder.bind(this);
        this.destinationChangeHanlder = this.destinationChangeHanlder.bind(this)
    }

    //call to get google map object
    async setUpApiKeyInMap() {
        let response = await mapInitOnLoad();
        this.google = response;
        this.getPlacesData(response);
    }

    componentDidMount() {
        this.setUpApiKeyInMap();
    }

    /**
     * @description
     * to get origin and destination dropdown options for places in input fields respectively.
     * Autocomplete method of google api is used to get it   
     */
    getPlacesData = (googleObj) => {
        this.startPoint = document.getElementById("origin");
        this.dropPoint = document.getElementById("destination");
        let originPlace = new googleObj.maps.places.Autocomplete(this.startPoint)
        let destinationPlace = new googleObj.maps.places.Autocomplete(this.dropPoint)
        googleObj.maps.event.addListener(originPlace, 'place_changed', () => {
            this.startPointPlaces = originPlace.getPlace();
            this.setState({ origin: this.startPointPlaces.formatted_address });
        })
        googleObj.maps.event.addListener(destinationPlace, 'place_changed', () => {
            this.dropPointPlaces = destinationPlace.getPlace();
            this.setState({ destination: this.dropPointPlaces.formatted_address });
        })
    }

    /**
     * @description
     * to get latitude and longitude of seleted origin and destination places and
     *  then make a request to backend to get the coordinates of routes/path  
     */
    getRouteInMap = (event) => {
        event.preventDefault();
        const { origin, destination } = this.state;
        //validation for valid input
        if (!origin || !destination) {
            this.props.validationHandling({
                error: requiredValidation
            });
            return;
        }
        if (origin === destination) {
            this.props.validationHandling({
                error: samePlaceValidation
            });
            return;
        }
        //resetting states but not working need to check.
        this.props.reset();
        let originLocation = this.startPointPlaces && this.startPointPlaces.geometry.location;
        let destinationLocation = this.dropPointPlaces && this.dropPointPlaces.geometry.location;
        let originCoordinates = [
            originLocation.lat().toString(), originLocation.lng().toString()
        ]
        let destinationCorodinates = [
            destinationLocation.lat().toString(), destinationLocation.lng().toString()
        ]
        this.props.getRoutes({ "origin": originCoordinates, "destination": destinationCorodinates })
    }
    /**
     * @description
     * reset the entire form :reset the inputdivs and reset the information div of our form on click of reset button
     */
    resetForm = () => {
        this.setState({
            origin:'',
            destination:''
        })
        this.props.reset();
    }

    //updates states on getting any changes in props value
    static getDerivedStateFromProps(props, state) {
        const { informationDetail } = props;
        const { total_time, total_distance, error } = informationDetail;
        if (informationDetail) {
            return {
                total_distance,
                total_time,
                error,
                labelSubmit: total_distance || error ? "Re-Submit" : "Submit"
            }
        }
        return null;
    }

    originChangeHanlder(event) {
        this.setState({ origin: event.target.value });
    }

    destinationChangeHanlder(event) {
        this.setState({ destination: event.target.value });
    }

    render() {
        return (
            <div className="directions-form">
                <label className="form-label">
                    <span>Starting Point :</span>
                    {this.state.origin.length > 0 && <span className={"float-right"} onClick={() => this.setState({ origin: "" })}><img height={"20px"} width={"20px"} alt="Remove" src={require("../../../images/remove.png")} /></span>}
                    <input type="text" value={this.state.origin} onChange={this.originChangeHanlder} name="starting" id={"origin"} placeholder="Pick Up From" />
                </label>
                <label className="form-label">
                    <span>Dropping Point :</span>
                    {this.state.destination.length > 0 && <span className={"float-right"} onClick={() => this.setState({ destination: "" })}><img height={"20px"} width={"20px"} alt="Remove" src={require("../../../images/remove.png")} /></span>}
                    <input type="text" value={this.state.destination} onChange={this.destinationChangeHanlder} name="dropping" id={"destination"} placeholder="Drop To" />
                </label>
                <RouteInfo informationDetail={this.props.informationDetail} />
                <div className="btn-container">
                    <button className="form-btn" onClick={this.getRouteInMap}>{this.state.labelSubmit}</button> <button onClick={this.resetForm}>Reset</button>
                </div>
            </div>
        )
    }
}

RouteForm.protoType = {
    informationDetail: PropTypes.object.isRequired,
    getRoutes: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
}

export default RouteForm;
