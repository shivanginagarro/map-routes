import React from 'react';
import '../map-style.css';
import { mapInitOnLoad } from "../../../common/services/index";
import { MAP_SETTING } from "../../../common/configurations/constants/index";

class Map extends React.PureComponent {

    currentMap;
    google;

    constructor(props) {
        super(props);
        this.state = {}; 
    }

    /**
     * @param {google map object} response
     * @description makes a call for map with google object using _thisreferenceMapDiv to
     *  pass DIV to give dom for rendering map
     */
    buildMapOnDom(response) {
        this.currentMap =  new response.maps.Map(this.mapDiv, {
            center: MAP_SETTING.COORDINATES,
            zoom: MAP_SETTING.ZOOM_SIZE
        });
    }


    async setUpApiKeyInMap(){
        let response = await mapInitOnLoad();
        this.google = response
        this.buildMapOnDom(response);        
    }

    componentDidMount(){
        this.setUpApiKeyInMap();
    }

    /**
     * @description Prepare Map positions from path points
     * @param path Array of points
     */
    preparePositionsFromPath = path => {
        return path.map(([lat, lng]) => new this.google.maps.LatLng(lat, lng));
    };

    
    drawDirections = (pathDetails) => {
        const directionsService = new this.google.maps.DirectionsService;
        const directionsRenderer = new this.google.maps.DirectionsRenderer;
        directionsRenderer.setMap(this.currentMap);
        const positions = this.preparePositionsFromPath(pathDetails);
        const waypoints = positions
            .slice(1, positions.length - 1)
            .map(location => ({ location, stopover: false }));

        // request for the google map directions api
        const request = {
            origin: positions[0],
            destination: positions[positions.length - 1],
            waypoints,
            optimizeWaypoints: true,
            travelMode: this.google.maps.TravelMode.DRIVING
        };

        // get the route from directionService and then plot with the help of directionsRenderer
        directionsService.route(request, (response, status) => {
            if (status === this.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert('Error in direction service response');
            }
        });
    };

    getSnapshotBeforeUpdate() {
        const { pathDetails } = this.props;
        if (pathDetails) {
            this.drawDirections(pathDetails);
        } else {
            this.setUpApiKeyInMap();
        }
        return null;
    }

    // do nothing
    componentDidUpdate() {}

    render() {
        return (
            <div id="my-map" ref={element => this.mapDiv = element} className={"map-wrapper"}>
                <h2>My Map</h2>
            </div>
        )
    }
}

export default Map;
