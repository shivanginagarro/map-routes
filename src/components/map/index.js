import React from 'react';
import './style.css';
//setup map coordinates and api key;
import { MAP_SETTING } from "./map-config";
//global map init service and google map object
import { mapInitOnLoad } from './map-api-init-service';
var GoogleMapsLoader = require('google-maps');

class Map extends React.PureComponent {

    currentMap;
    maps;

    constructor(props) {
        super(props);
        //reference to map div        
        this.refereneceMapDiv = React.createRef();
    }

    async setUpApiKeyInMap() {
        // NOTE TO SELF :probably use destructuring if possible
        GoogleMapsLoader.KEY = MAP_SETTING.KEY;
        GoogleMapsLoader.LIBRARIES = MAP_SETTING.LIBRARIES;
        let response = await mapInitOnLoad(GoogleMapsLoader);
        this.maps = response;
        this.buildMapOnDom(response);
    }

    /**
     * @param {google map object} response
     * @description makes a call for map with google object using this.referenceMapDiv to
     *  pass DIV to give dom for rendering map
     */
    buildMapOnDom(response) {
        this.googleMapInstance =  new response.maps.Map(this.refereneceMapDiv, {
            center: MAP_SETTING.COORDINATES,
            zoom: MAP_SETTING.ZOOM_SIZE
        });
    }

    componentDidMount(){
        this.setUpApiKeyInMap();
    }

    render() {
        return (
            <div id="my-map" ref={element => this.refereneceMapDiv = element} className={"map-wrapper"}>
                <h2>My Map</h2>
            </div>
        )
    }
}

export default Map;
