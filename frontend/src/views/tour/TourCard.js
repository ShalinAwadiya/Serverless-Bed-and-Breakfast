import React from "react";
import './Tour.css';
import { useNavigate } from "react-router-dom";
import { getEmail } from "../../localStorage";

const TourCard = ({ data, date }) => {
  const navigate = useNavigate();
  const tourIdgenerator = () => {
    return Math.floor(Math.random() * 10000);
  };
  const bookTourHandler = ()=>{
    console.log(data)
    fetch('https://us-central1-authentic-codex-352820.cloudfunctions.net/TourOperatorTopicFunction',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:getEmail(),
        tourName:data.tour_name,
        price: parseInt(data.price_per_person),
        bookingDate: date.toString(),
        bookingId: parseInt(tourIdgenerator())
      })
    }).then(response=>response.json()).then(result=>console.log(result))
    navigate('/summary',{state:{data:data,type:'tour'}})
  }

  return (
    <div className="height d-flex justify-content-center align-items-center">
      <div className="card p-3">
        <div className="d-flex justify-content-between align-items-center ">
          <div className="mt-2">
            <h4 className="text-uppercase">{data.tour_name}</h4>
            <div className="mt-5">
              <h1 className="main-heading mt-0">${data.price_per_person}{" "}/ person</h1>
              <p>{data.destination}</p>
              
            </div>
          </div>
          <div className="image">
            <img src={data.tour_details} width="200" alt="..." />
          </div>
        </div>

        

        {/* <p>A great option weather you are at office or at home. </p> */}

        <button className="btn btn-danger" onClick={()=>bookTourHandler()} >Book</button>
      </div>
    </div>
  );
};

export default TourCard;
