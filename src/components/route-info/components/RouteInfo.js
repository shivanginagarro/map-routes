import React from "react";
import PropTypes from 'prop-types';

//its is more like a  presentational component for displaying the route related information from backend.  

const RouteInfo = (props) => {
    const { informationDetail } = props;
    return (
        <>
        {informationDetail.total_distance ? <div><label>Total Distance</label>:{informationDetail.total_distance}</div> : null}
        {informationDetail.total_time ? <div><label>Total Time</label>:{informationDetail.total_time}</div> : null}
        {informationDetail.error ? <div><label>Error</label>:{informationDetail.error}</div> : null}
        </>
    )
}


RouteInfo.protoType = {
    informationDetail : PropTypes.object.isRequired,
}
export default RouteInfo;