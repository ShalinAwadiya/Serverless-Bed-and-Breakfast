import React, { useState } from "react";
import './Food.css';
import { Button, Grid, Paper, Snackbar, Stack, Typography } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { getSession } from '../../localStorage';
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FoodCard = ({ item }) => {
  const [added, setAdded] = useState(false);

  const addToCart = (item) => {
    let foodItem = {
      name: item.name,
      basePrice: item.price,
      price: item.price,
      quantity: 1
    }

    var request = {
      userSub: getSession().idToken.payload.sub,
      email: getSession().idToken.payload.email,
      totalPrice: item.price,
      food: foodItem
    }
    console.log(JSON.stringify(request));

    axios({
      method: 'post',
      url: 'https://ubrqk7ctmctgdpncdkxxsrhvqe0dwefh.lambda-url.us-east-1.on.aws/',
      data: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      setAdded(true);
      console.log({ res });
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAdded(false);
  };

  return (
    <Grid item md={3} sm={6} xs={12}>
      <Paper sx={{ p: 2 }}>
        <Grid item sx={{ display: { xs: 'flex', md: 'flex', maxHeight: 180, minHeight: 180 } }}>
          <img
            width="100%"
            src={item.image}
            srcSet={item.image}
            loading="lazy"
          />
        </Grid>

        <Stack direction={'column'}>
          <Typography
            component={'div'}
            variant="body1"
            width="100%"
            color='black'
            textAlign="left"
            fontWeight="bold"
            marginLeft={1}>
            {item.name}
          </Typography>

          <Typography
            variant="body1"
            textAlign="left"
            color='black'
            marginLeft={1}>
            ${item.price}
            <br />
          </Typography>

          <Button
            onClick={() => addToCart(item)}
            variant='contained'>
            Add to Cart
          </Button>
        </Stack>
      </Paper >

      <Snackbar open={added} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Food Item added to cart!!!
        </Alert>
      </Snackbar>
    </Grid >
  );
};
export default FoodCard;