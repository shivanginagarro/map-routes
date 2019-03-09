import React from 'react';
import './style.css';
import RouteForm from './RouteForm';


class RouteInfo extends React.PureComponent {

    render() {
        return (
            <div id="my-route" className={"route-info-wrapper"}>
                <RouteForm getRoutes={this.props.getRoutes} />
            </div>
        )
    }
}

export default RouteInfo;