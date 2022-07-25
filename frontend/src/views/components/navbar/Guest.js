import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authentication/AuthContext";

const Guest = ({ isRegistered, setIsRegistered }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  if (isRegistered) {
    return (
      <>
        <button
          type="button"
          class="btn btn-outline-dark"
          onClick={() => navigate("/profile")}
        >
          <CgProfile style={{ fontSize: "1.7rem" }} />
        </button>
        <button
          type="button"
          class="btn btn-outline-dark"
          onClick={() => {
            logout();
            setIsRegistered(false);
            navigate("/");
          }}
        >
          LOGOUT
        </button>
      </>
    );
  } else {
    return (
      <button
        type="button"
        class="btn btn-outline-dark"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    );
  }
};

export default Guest;
