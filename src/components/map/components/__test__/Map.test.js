import React from "react";
import Map from "../Map";
import renderer from "react-test-renderer";

import mapInitOnLoad ,{ mockresponse } from "../__mocks__/google-map-instance.mock";


describe("Component:Map",() => {
   it("Testing the Map Component",() => {
    const tree = renderer.create(<Map />).toJSON();
    expect(tree).toMatchSnapshot();
   });

   it("Testing google map instance service that makes a call for google map object on laod of applicaiton",() => {
    const res = mapInitOnLoad();
    expect(res).not.toBeUndefined();
    expect(mapInitOnLoad).toHaveBeenCalled();
    expect(mapInitOnLoad).toHaveBeenCalledTimes(1);
    expect(res).resolves.toHaveProperty('maps');
});
})