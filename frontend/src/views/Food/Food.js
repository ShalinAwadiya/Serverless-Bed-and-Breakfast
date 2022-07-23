import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Snackbar } from "@mui/material";

import FoodCard from "./FoodCard";
import "./Food.css";

const Food = () => {
  const [data, setData] = useState([]);
  const [added, setAdded] = useState(false);

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
    <>
      <Grid container spacing={3} sx={{ p: 2 }}>
        {
          data.map((dish, index) => {
            return <FoodCard key={index} item={dish} setAdded={setAdded} />;
          })
        }
      </Grid>
    </>
  );
};

export default Food;
