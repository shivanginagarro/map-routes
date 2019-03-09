import React from 'react';
import './style.css';
import RouteForm from './RouteForm';
import { fetchDirectionsApi} from './service';


class RouteInfo extends React.PureComponent {


    getRoutes = (object) => {
         fetchDirectionsApi(object);
    }

    render() {
        return (
            <div id="my-route" className={"route-info-wrapper"}>
                <RouteForm getRoutes={this.getRoutes} />
            </div>
        )
    }
}

export default RouteInfo;