import {API} from '../axios/index';
import {route} from '../../configurations/constants/index';

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
    let tokenResponse  = await requestForRoutesToken(coordinates)
    let token  = tokenResponse && tokenResponse.data.token;  
    let routeResponse = await requestToGetRouteDirections(token);
    if (routeResponse  && routeResponse.data && routeResponse.data.status && routeResponse.data.status.toLowerCase() === 'in progress') {
        routeResponse = await fetchDirectionsApi(coordinates);
    }
    return routeResponse;
}