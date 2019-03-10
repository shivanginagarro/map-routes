import React from "react";
import "./loader-style.css";

function Loader({ isLoading }) {
  return (
    isLoading && (
      <div className="loader-container">
        <div className="sp sp-circle"></div>
        <h5>LOADING ....!!!!</h5>
      </div>
    )
  );
}

export { Loader };