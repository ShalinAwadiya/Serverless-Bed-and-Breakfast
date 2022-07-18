import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import "./Food.css";
import axios from "axios";
import { Grid } from "@mui/material";

const Food = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://rueg22wgtxogcfc3dpjv4g6fci0zbjtz.lambda-url.us-east-1.on.aws/'
    }).then((res) => {
      console.log({ res });
      setData(res.data.Items);
    });
  }, []);

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {
        data.map((dish, index) => {
          return <FoodCard key={index} item={dish} />;
        })
      }
    </Grid>
  );
};

export default Food;
