import {MAP_SETTING} from "../../configurations/map/index";
let map = require('google-maps');

let googleInstance = null;

const settingInit = () => {
    map.KEY = MAP_SETTING.KEY;
    map.LIBRARIES = MAP_SETTING.LIBRARIES;
}

export const mapInitOnLoad = async () => {
    settingInit();
    const myMapPromise = await new Promise(resolve => {
        map.load(api => {
            googleInstance = !googleInstance ? api : googleInstance;
            resolve(googleInstance);
        })
    });
    return myMapPromise;
}