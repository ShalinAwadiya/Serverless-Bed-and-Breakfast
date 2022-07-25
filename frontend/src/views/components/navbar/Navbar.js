import "../../../assets/css/styles.css";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Container, Toolbar } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import Guest from "./Guest";
import { getEmail } from "../../../localStorage/index";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    if (getEmail()) {
      setIsRegistered(true);
    }
  }, [isRegistered]);
  return (
    <AppBar class="navbar-light bg-light" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Bed & Breakfast
          </Typography>

          <Box sx={{ mr: 5, display: { xs: "none", md: "flex" } }}>
            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={() => navigate("/food")}
            >
              KITCHEN
            </button>
          </Box>

          <Box sx={{ mr: 5, display: { xs: "none", md: "flex" } }}>
            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={() => navigate("/food-cart")}
            >
              CART
            </button>
          </Box>

          <Box sx={{ mr: 5, display: { xs: "none", md: "flex" } }}>
            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={() => navigate("/feedback")}
            >
              Feedback
            </button>
          </Box>

          <Box sx={{ mr: 5, display: { xs: "none", md: "flex" } }}>
            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={() => navigate("/notify")}
            >
              Notifications
            </button>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex", ml: 10 } }}>
            <Guest
              isRegistered={isRegistered}
              setIsRegistered={setIsRegistered}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
