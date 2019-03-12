import React from "react";
import RouteInfo from "../component/RouteInfo";
import renderer from "react-test-renderer";


describe("Component:RouteInfo",() => {
   it("Testing the Route Info Component",() => {
    let informationDetail = {
        error: '',
        total_distance: '',
        total_time: ''
    }
    let tree = renderer.create(<RouteInfo informationDetail={informationDetail} />).toJSON();
    expect(tree).toMatchSnapshot();
   });
})