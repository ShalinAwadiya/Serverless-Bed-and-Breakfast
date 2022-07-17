import React from "react";
import './Tour.css';
import { useNavigate } from "react-router-dom";

const TourCard = ({ data }) => {
  const navigate = useNavigate();

  const bookTourHandler = ()=>{
    fetch('https://us-central1-authentic-codex-352820.cloudfunctions.net/TourOperatorTopicFunction',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:"ks@dal.ca",
        tourName:data.tourName,
        price:data.price,
        bookingDate: "18-08-2022"
      })
    }).then(response=>response.json()).then(result=>console.log(result))
    navigate('/summary',{state:{data:data,type:'tour'}})
  }

  return (
    <div className="height d-flex justify-content-center align-items-center">
      <div className="card p-3">
        <div className="d-flex justify-content-between align-items-center ">
          <div className="mt-2">
            <h4 className="text-uppercase">{data.tourName}</h4>
            <div className="mt-5">
              <h1 className="main-heading mt-0">${data.price}</h1>
              <div className="d-flex flex-row user-ratings">
                <div className="ratings">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="image">
            <img src={data.url} width="200" alt="..." />
          </div>
        </div>

        

        {/* <p>A great option weather you are at office or at home. </p> */}

        <button className="btn btn-danger" onClick={()=>bookTourHandler()} >Book</button>
      </div>
    </div>
  );
};

export default TourCard;
