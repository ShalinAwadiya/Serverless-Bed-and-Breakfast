import React,{ useEffect, useState } from "react";
import "./Room.css";
import RoomCard from "./RoomCard";
import { useLocation } from "react-router-dom";

const DisplayAvailability = () => {
  const location = useLocation()
  const bookData= location.state;
  const [availability,setAvailability] = useState({});
  //28-02-2022
  useEffect(()=>{
      fetchAvailability();
      checkAvailability();
  },[])
  
  const fetchAvailability = ()=>{
    console.log(bookData.date)
    fetch(`https://jj6eksvjm6vppixjgmuyjizbma0qqxjm.lambda-url.us-east-1.on.aws/?startDate=${bookData.date}&noOfDays=${bookData.days}&roomType=${bookData.type}`,{
      method:'GET'
    }).then(response=>response.json()).then(result=>{
      setAvailability(result.availability)
      console.log("Rooms:",result.availability)})
  }

  const checkAvailability=()=>{
    
  }

  const data = [
    {
      roomNo: 101,
      rate: 500,
      bed: 2,
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      roomNo: 102,
      rate: 500,
      bed: 2,
      url: "https://images.unsplash.com/photo-1552858725-2758b5fb1286?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      roomNo: 103,
      rate: 500,
      bed: 2,
      url: "https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      roomNo: 104,
      rate: 500,
      bed: 2,
      url: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJlZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
    },
  ];

  return (
    <div style={{"display":"flex","justifyContent":"space-evenly","flexWrap":"wrap"}}>
      {data.map((room,index) => {
        return <RoomCard key={index} data={room} bookData={bookData} />;
      })}
    </div>
  );
};

export default DisplayAvailability;
