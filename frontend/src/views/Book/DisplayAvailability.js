import React, { useEffect, useState } from "react";
import "./Room.css";
import RoomCard from "./RoomCard";
import { useLocation } from "react-router-dom";

const DisplayAvailability = () => {
  const location = useLocation();
  const bookData = location.state;
  const [availability, setAvailability] = useState([]);
  const [tours, setTours] = useState([]);
  // const [keys,setKeys] = useState([]);
  // const [info,setInfo] = useState([]);
  //28-02-2022
  useEffect(() => {
    fetchAvailability();
    fetchRelatedTours();
  }, []);

  const fetchAvailability = async () => {
    fetch(
      `https://jj6eksvjm6vppixjgmuyjizbma0qqxjm.lambda-url.us-east-1.on.aws/?startDate=${
        bookData.date
      }&noOfDays=${bookData.days}&roomType=${bookData.type.split(",")[0]}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setAvailability(result.availability);
      });
  };

  const fetchRelatedTours = async () => {
    console.log("fetching...");
    fetch(
      `https://kzearvw4yjeu3xuwstrliwr3da0dlmcj.lambda-url.us-east-1.on.aws/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          days: parseInt(bookData.days),
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {availability.map((room, index) => {
          return room.available.length === parseInt(bookData.days) ? (
            <RoomCard
              key={index}
              data={room}
              bookData={bookData}
              price={bookData.type.split(",")[1]}
            />
          ) : (
            <></>
          );
        })}
      </div>
    </>
  );
};

export default DisplayAvailability;
