import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import Navigation from './Navigation';

//import mocks and spies from services
import fetchDirectionsApi, { mockresponse, mockrequestobject } from "./Navigation.mock";

/**
 * @description:
 * use of automatic mock function where react dom is being mocked that returns a spy that helps to test whther it has been called with correct properties.
 */
jest.mock('react-dom');

describe('Application:Navigation', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navigation />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(render).toHaveBeenCalledWith(<Navigation />, div);
    expect(render).toHaveBeenCalledTimes(1);
  })

  it("Testing route-api service that makes call for token and coordinates for pathways to display routes in map", () => {
    const res = fetchDirectionsApi(mockrequestobject);
    // test the properties on given object
    //test the request object of fetchDirectionApi
    expect(mockrequestobject).toHaveProperty('origin');
    expect(mockrequestobject).toHaveProperty('destination');
    //response must return some value
    expect(res).not.toBeUndefined();
    // promise resolved response
    expect(res).resolves.toBe(mockresponse);
    //called from here or not
    expect(fetchDirectionsApi).toHaveBeenCalled();
    //no of times called
    expect(fetchDirectionsApi).toHaveBeenCalledTimes(1);
    // argument testing 
    expect(fetchDirectionsApi).toHaveBeenCalledWith(mockrequestobject);
  })
})
