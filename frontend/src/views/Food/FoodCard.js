import React, { useState } from "react";
import './Food.css';
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { getSession } from '../../localStorage';
import axios from "axios";

const FoodCard = ({ item }) => {
  const navigate = useNavigate();

  const [added, setAdded] = useState(false);

  const addToCart = (item) => {
    let foodItem = {
      name: item.name,
      price: item.price,
      quantity: 1
    }

    console.log({ foodItem });

    if (getSession()) {
      //If the user is already loggedIn and session exists
      var request = {
        userSub: getSession().idToken.payload.sub,
        email: getSession().idToken.payload.email,
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
    } else {
      //We need to store the cart in local storage and insert once the user logs in successfully
    }
  }

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
    </Grid >
  );
};
export default FoodCard;
