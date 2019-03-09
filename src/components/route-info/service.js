import {API} from './axios-wrapper';
import {route} from './config';

const requestForRoutesToken  = async (coordinates) => {
    const url = route;
    const request = {
        ...coordinates
    };
    return await API.post(url, request);
}

const requestToGetRouteDirections = async (token) => {
  const url = `${route}/${token}`;
  return await API.get(url);
} 


export const fetchDirectionsApi = async (coordinates) => {
    let tokenResponse  = await requestForRoutesToken(coordinates);
    console.log(tokenResponse);
    let token  = tokenResponse.data.token ;  
    let routeResponse = await requestToGetRouteDirections(token);
    console.log(routeResponse);
}