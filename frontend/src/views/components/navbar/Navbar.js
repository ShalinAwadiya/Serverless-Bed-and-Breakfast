import '../../../assets/css/styles.css'
import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Container, Toolbar } from "@mui/material";
import Guest from './Guest';

export default function NavBar() {

  return (
    <AppBar class="bg-light" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex', flexGrow: 1 },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Bed & Breakfast
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex', flexGrow: 1 } }}>
            <Button
              key='Bot'
              component="a"
              href='/bot'
              variant='outlined'
              sx={{ my: 2, color: 'black', display: 'block', fontSize: 15 }}
            >
              CHATBOT
            </Button>
          </Box>
          <Guest isRegistered={false} />
        </Toolbar>
      </Container>
    </AppBar >
  );
}
