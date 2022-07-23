import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  getListItemAvatarUtilityClass,
  Toolbar,
} from "@mui/material";
import Box from "@mui/material/Box";
import UserPool from "../authentication/UserPool";
import { useNavigate } from "react-router-dom";
import { getEmail } from "../../localStorage/index";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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

  const navigate = useNavigate();
  const logoutHandler = () => {
    const congnitoUser = UserPool.getCurrentUser();
    if (congnitoUser != null) {
      congnitoUser.signOut();
      localStorage.removeItem("session");
      localStorage.removeItem("email");
      localStorage.removeItem("user_id");
      console.log("logged out.");
      navigate("/login");
    }
  };

  return (
    

    <div className="ticket-wrapper">
      {data.map((ticket, index) => {
        return (
          <div class="card" style={{ width: "18rem","backgroundColor":"#264653","color":"#fff","boxShadow":"0px 0px 16px 6px rgba(0,0,0,0.33)" }} key={index} >
            <div class="card-body">
              <h5 class="card-title">{ticket.tourName}</h5>
              <h6 class="card-subtitle mb-2">Ticket#{index+1}</h6>
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
