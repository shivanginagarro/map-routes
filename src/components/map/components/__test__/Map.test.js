import React from "react";
import Map from "../Map";
import renderer from "react-test-renderer";


describe("Component:Map",() => {
   it("Testing the Map Component",() => {
    const tree = renderer.create(<Map />).toJSON();
    expect(tree).toMatchSnapshot();
   });
})