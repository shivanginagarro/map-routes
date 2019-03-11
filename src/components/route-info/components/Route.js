import React from 'react';
import '../route-style.css';
import RouteForm from './RouteForm';


class Route extends React.PureComponent {
//renders routefrom 
    render() {
        return (
            <div id="my-route" className={"route-info-wrapper"}>
                <RouteForm getRoutes={this.props.getRoutes} {...this.props} />
            </div>
        )
    }
}

export default Route;