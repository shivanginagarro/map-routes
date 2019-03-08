import React from 'react';
import './style.css';
//setup map coordinates and api key;
import { MAP_SETTING } from "./map-config";

var GoogleMapsLoader = require('google-maps');

class Map extends React.PureComponent {
    //reference to map div
    referneceToMapDiv;
    // map on Dom
    googleMapDom;

    constructor(props) {
        super(props);
        this.referneceToMapDiv = React.createRef();
    }

    async setUpApiKeyInMap() {
        // NOTE TO SELF :probably use destructuring if possible
        GoogleMapsLoader.KEY = MAP_SETTING.KEY;
        GoogleMapsLoader.LIBRARIES = MAP_SETTING.LIBRARIES;
        let response = await new Promise(resolve => {
            GoogleMapsLoader.load(api => {
                resolve(api);
            })
        });
        this.buildMapOnDom(response);
    }

    /**
     * @param {google map object} response
     * @description makes a call for map with google object 
     */
    buildMapOnDom(response) {
        this.googleMapDom = new response.maps.Map(this.referneceMapDiv, {
            center: MAP_SETTING.COORDINATES,
            zoom: MAP_SETTING.ZOOM_SIZE
        });
    }

    componentWillMount() {
        this.setUpApiKeyInMap();
    }

    componentWillUnmount() {
        GoogleMapsLoader.release(() => console.log('No google maps api around'));
    }

    render() {
        return (
            <div id="my-map" ref={ element => this.referneceMapDiv = element} className={"map-wrapper"}>
                <h2>My Map</h2>
            </div>
        )
    }
}

export default Map;
