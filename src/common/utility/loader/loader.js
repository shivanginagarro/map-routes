import React from "react";
import "./loader-style.css";

function Loader({ isLoading }) {
  return (
    isLoading &&
     (
      <div className="loader-container">
        <div className="sp sp-circle"></div>
      </div>
    )
  );
}

export { Loader };