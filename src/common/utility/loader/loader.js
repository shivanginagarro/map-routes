import React from "react";
import "./loader-style.css";

function Loader({ isLoading }) {
  console.log('isLoading',isLoading);
  return (
    isLoading && (
      <div class="col-sm-2">
        <div class="sp sp-circle"></div>
        <h5>LOADING ....!!!!</h5>
      </div>
    )
  );
}

export { Loader };