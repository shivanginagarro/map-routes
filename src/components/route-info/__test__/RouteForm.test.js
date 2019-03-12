import React from "react";
import RouteForm from "../container/RouteForm";
import renderer from "react-test-renderer";
import Enzyme , { shallow , mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({"adapter": new Adapter()});

const informationDetail = {
    error: '',
    total_distance: '',
    total_time: ''
}
const getRoutes = () => {
    console.log('inside routes testing');
}
const reset = () => {
    console.log("inside reset testing infor");
}
const validationHandling = () => {
    console.log("inside validationHandling");
}

describe("Component:RouteForm",() => {
    let wrapper = shallow(<RouteForm informationDetail={informationDetail} getRoutes={getRoutes} reset={reset} validationHandling={validationHandling} />);
    
    it("Testing the Route Form Component: snapshot",() => {
    const tree = renderer.create(<RouteForm informationDetail={informationDetail} getRoutes={getRoutes} reset={reset} validationHandling={validationHandling}/>).toJSON();
    expect(tree).toMatchSnapshot();
   });
   
   it("rendering test of RouteForm",() => {
        expect(wrapper.exists()).toBe(true);
   });

   it("input values changed",() => {
    wrapper.find("#origin").simulate("change", {
        target : { value: "Delhi" }
    });
    expect(wrapper.find("#origin").props().value).toEqual("Delhi");
   })
})