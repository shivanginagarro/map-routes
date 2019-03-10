import React from "react";

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

export default RouteInfo;