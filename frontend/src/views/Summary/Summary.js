import React from "react";
import "./Summary.css";
import { useLocation } from "react-router-dom";
const Summary = () => {
    const location = useLocation();
    const data = location.state.room;
    const type = location.state.type;
  if (type === "order") {
    return (
      //
      <h1>Order</h1>
    );
  } else {
    return (
      <div className="main-container">
        <div className="heading">
          <p>Thanks for booking room,</p>
        </div>
        <hr />
        <div style={{ backgroundColor: "#8a817c" }}>
          <div className="room">
            <div>
              <p>Room</p>
            </div>
            <div>
              <p>id.</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="summary">
          <div className="room-img">
            <img
              src={data.url}
              alt="..."
            />
          </div>
          {/* <div className="room-data">
            <p>Bed : {data.Bed}</p>
            <p>Days :</p>
          </div> */}
        </div>
        <hr />
        <div style={{ backgroundColor: "#8a817c" }}>
          <div className="total">
            <p>Total&nbsp;:&nbsp;${data.rate}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Summary;
