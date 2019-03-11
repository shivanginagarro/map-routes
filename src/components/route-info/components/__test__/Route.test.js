import React from "react";
import Route from "../Route";
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
        const tree = renderer.create(<Route informationDetail={informationDetail} getRoutes={getRoutes} reset={reset} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})