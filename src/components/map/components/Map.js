import React from 'react';
import '../map-style.css';
import { mapInitOnLoad } from "../../../common/services/requests/map/index";
import { MAP_SETTING } from "../../../common/services/configurations/map/index";

let _this;

class Map extends React.PureComponent {

    currentMap;
    google;

    constructor(props) {
        super(props);
        _this = this;
        _this.state = {}; 
    }

    /**
     * @param {google map object} response
     * @description makes a call for map with google object using _thisreferenceMapDiv to
     *  pass DIV to give dom for rendering map
     */
    buildMapOnDom(response) {
        _this.currentMap =  new response.maps.Map(_this.mapDiv, {
            center: MAP_SETTING.COORDINATES,
            zoom: MAP_SETTING.ZOOM_SIZE
        });
    }


    async setUpApiKeyInMap(){
        let response = await mapInitOnLoad();
        console.log('setUpApiKeyInMap response',response);
        _this.google = response
        _this.buildMapOnDom(response);        
    }

    componentDidMount(){
        _this.setUpApiKeyInMap();
        console.log('_this.google',_this.google);
    }

    /**
     * @description Prepare Map positions from path points
     * @param path Array of points
     */
    preparePositionsFromPath = path => {
        return path.map(([lat, lng]) => new _this.google.LatLng(lat, lng));
    };

    /**
     * @description Plot the received points on map as route directions
     * @param Object Response object returned from the Api containing the path points
     */
    drawDirections = ({ pathDetails }) => {
        console.log('_thismaps',_this.google,_this.google.DirectionsRenderer,_this.google.DirectionsService);
        const directionsService = new _this.google.DirectionsService;
        const directionsRenderer = new _this.google.DirectionsRenderer;
        console.log('directionsService directionsRenderer',directionsService,directionsRenderer);
        directionsRenderer.setMap(_this.map);

        const positions = _this.preparePositionsFromPath(pathDetails);
        const waypoints = positions
            .slice(1, positions.length - 1)
            .map(location => ({ location, stopover: false }));

        // request for the google map directions api
        const request = {
            origin: positions[0],
            destination: positions[positions.length - 1],
            waypoints,
            optimizeWaypoints: true,
            travelMode: _this.maps.TravelMode.DRIVING
        };

        // get the route from directionService and then plot with the help of directionsRenderer
        directionsService.route(request, (response, status) => {
            if (status === _this.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert('Error in direction service response');
            }
        });
    };

    static getDerivedStateFromProps(props,state) {
        const { pathDetails } = props;
        console.log('pathDetails',pathDetails,'props',props);
        if (pathDetails) {
            _this.drawDirections(pathDetails);
        }
        return null;
    }

    // do nothing
    componentDidUpdate() {}

    render() {
        console.log('_thisprops',_this.props);
        return (
            <div id="my-map" ref={element => _this.mapDiv = element} className={"map-wrapper"}>
                <h2>My Map</h2>
            </div>
        )
    }
}

export default Map;
