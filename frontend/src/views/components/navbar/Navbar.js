import '../../../assets/css/styles.css'
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Container, Toolbar } from "@mui/material";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import Guest from './Guest';
import { getEmail } from '../../../localStorage/index';

export default function NavBar() {
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    if (getEmail()) {
      setIsRegistered(true)
    }
  }, [isRegistered])
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
              display: { xs: 'none', md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Bed & Breakfast
          </Typography>

          <Box sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='kitchen'
              component="a"
              href='/food'
              variant='outlined'
              sx={{ my: 2, color: 'black', display: 'block', fontSize: 15 }}
            >
              <BreakfastDiningIcon /> KITCHEN
            </Button>
          </Box>

          <Box sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='cart'
              component="a"
              href='/food-cart'
              variant='outlined'
              sx={{ my: 2, color: 'black', display: 'block', fontSize: 15 }}
            >
              <ShoppingBagIcon /> CART
            </Button>
          </Box>

          <Box sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='feedback'
              component="a"
              href='/feedback'
              variant='outlined'
              sx={{ my: 2, color: 'black', display: 'block', fontSize: 15 }}
            >
               Feedback
            </Button>
          </Box>

          <Box sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='notify'
              component="a"
              href='/notify'
              variant='outlined'
              sx={{ my: 2, color: 'black', display: 'block', fontSize: 15 }}
            >
               Notifications
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex', ml: 10 } }}>
            <Guest isRegistered={isRegistered} setIsRegistered={setIsRegistered} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
