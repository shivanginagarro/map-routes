import React from "react";
import Route from "../container/Route";
import renderer from "react-test-renderer"

describe("Component:Route", () => {
    it("Testing the Parent Route Component", () => {
        let informationDetail = {
            error: '',
            total_distance: '',
            total_time: ''
        }
        let getRoutes = () => {
            console.log('inside routes testing');
        }
        let reset = () => {
            console.log("inside reset testing");
        }
        let validationHandling = () => {
            console.log("inside validationHandling");
        }
        const tree = renderer.create(<Route informationDetail={informationDetail} getRoutes={getRoutes} reset={reset} validationHandling={validationHandling}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})