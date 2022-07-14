import React from "react";
import FoodCard from "./FoodCard";
import "./Food.css";

const Food = () => {
  const data = [
    {
      name: "dish 1",
      rate: 500,
      url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "dish 2",
      rate: 500,
      url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "dish 3",
      rate: 500,
      url: "https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "dish 4",
      rate: 500,
      url: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60"
    },
  ];

  return (
    <div style={{"display":"flex","justifyContent":"space-evenly","flexWrap":"wrap"}}>
      {data.map((dish,index) => {
        return <FoodCard key={index} data={dish}/>;
      })}
    </div>
  );
};

export default Food;
