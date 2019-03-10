import { MAP_SETTING } from "../../configurations/constants/index";
import map from 'google-maps';

let googleInstance = null;

const settingInit = () => {
    map.KEY = MAP_SETTING.KEY;
    map.LIBRARIES = MAP_SETTING.LIBRARIES;
}
settingInit();


export const mapInitOnLoad = async () => {
    const myMapPromise = await new Promise(resolve => {
        if (googleInstance) {
            resolve(googleInstance);
        }
        else {
            map.load(api => {
                googleInstance = api;
                resolve(googleInstance);
            })
        }
    });
    return myMapPromise;
}