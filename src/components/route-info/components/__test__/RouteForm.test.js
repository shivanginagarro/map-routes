import React from "react";
import RouteForm from "../RouteForm";
import renderer from "react-test-renderer";

describe("Component:RouteForm",() => {
   it("Testing the Route Form Component",() => {
    let informationDetail = {
        error: '',
        total_distance: '',
        total_time: ''
    }
    let getRoutes = () => {
        console.log('inside routes testing');
    }
    let reset = () => {
        console.log("inside reset testing infor");
    }
    const tree = renderer.create(<RouteForm informationDetail={informationDetail} getRoutes={getRoutes} reset={reset} />).toJSON();
    expect(tree).toMatchSnapshot();
   });
})