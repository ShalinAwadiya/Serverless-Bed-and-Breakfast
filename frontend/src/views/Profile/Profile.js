import React, { useEffect, useState } from "react";

import UserPool from "../authentication/UserPool";
import { useNavigate } from "react-router-dom";
import { getEmail } from "../../localStorage/index";

import "./profile.css";

const Profile = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      `https://lffyvdvm5hquei7oi7w37fz44u0efnfp.lambda-url.us-east-1.on.aws/?email=${getEmail()}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => setData(result.data));
  }, []);

  return (
    <div className="ticket-wrapper">
      {data.map((ticket, index) => {
        return (
          <div
            class="card"
            style={{
              width: "18rem",
              backgroundColor: "#264653",
              color: "#fff",
              boxShadow: "0px 0px 16px 6px rgba(0,0,0,0.33)",
            }}
            key={index}
          >
            <div class="card-body">
              <h5 class="card-title">{ticket.tourName}</h5>
              <h6 class="card-subtitle mb-2">Ticket#{index + 1}</h6>
              <p class="card-text">{ticket.price}</p>
              <p class="card-text">{ticket.bookingDate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
