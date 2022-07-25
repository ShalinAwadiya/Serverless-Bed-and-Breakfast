import React from "react";
import "./Summary.css";
import { useLocation } from "react-router-dom";
const Summary = () => {
  const location = useLocation();
  const type = location.state.type;
  if (type === "order") {
    return (
      //
      <div className="main-container">
        <div className="heading">
          <p>Thanks for Ordering food</p>
        </div>
      </div>
    );
  } else if(type === 'room') {
    return (
      <div className="main-container">
        <div className="heading">
          <p>Thanks for booking room</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main-container">
        <div className="heading">
          <p>Thanks for booking tour</p>
        </div>
      </div>
    );
  }
};

export default Summary;
