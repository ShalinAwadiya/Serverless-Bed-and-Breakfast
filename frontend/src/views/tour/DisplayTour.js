import React, { useEffect, useState } from "react";
import TourCard from "./TourCard";
import { useLocation } from "react-router-dom";
import { getEmail } from "../../localStorage";
const DisplayTour = () => {
  const location = useLocation();
  const bookData = location.state;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://kzearvw4yjeu3xuwstrliwr3da0dlmcj.lambda-url.us-east-1.on.aws/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          days: parseInt(bookData.bookData.days),
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      {data.map((tour, index) => {
        return (
          <TourCard key={index} data={tour} date={bookData.bookData.date} />
        );
      })}
    </div>
  );
};

export default DisplayTour;
