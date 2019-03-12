import React from "react";
import RouteForm from "../container/RouteForm";
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
    let validationHandling = () => {
        console.log("inside validationHandling");
    }
    const tree = renderer.create(<RouteForm informationDetail={informationDetail} getRoutes={getRoutes} reset={reset} validationHandling={validationHandling}/>).toJSON();
    expect(tree).toMatchSnapshot();
   });
})