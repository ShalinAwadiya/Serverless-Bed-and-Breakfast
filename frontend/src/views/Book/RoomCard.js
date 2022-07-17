import React from "react";
import "./Room.css";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ data, bookData }) => {
  const navigate = useNavigate();
  console.log(bookData);
  const bookIdgenerator = () => {
    return Math.floor(Math.random() * 10000);
  };

  const dateFormat = (date) =>{
    var newDate = date.split('-');
    return newDate[2].toString()+newDate[1].toString()+newDate[0].toString()
  }
  const bookRoomHanlder = () => {
    console.log("started..");
    
    fetch('https://us-central1-authentic-codex-352820.cloudfunctions.net/HotelManagementTopic',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "email":"ks@dal.ca", //taking from localstorage
        "roomNo":"301", //from data
        "price": "120", // from data
        "bookingDate": dateFormat(bookData.date), // from bookData
        "bookingDays":10, //from bookdata
        "bookingId": parseInt(bookIdgenerator()),
      })
    }).then(response=>response.json()).then(result=>console.log("Result::",result))
    navigate("/summary", { state: { data: data, type: "room" } });
  };
  return (
    <div class="height d-flex justify-content-center align-items-center">
      <div class="card p-3">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="mt-2">
            <h4 class="text-uppercase">{data.name}</h4>
            <div class="mt-5">
              <h5 class="text-uppercase mb-0">Beds : {data.bed}</h5>
              <h1 class="main-heading mt-0">${data.rate}</h1>
              <div class="d-flex flex-row user-ratings">
                <div class="ratings">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>
                <h6 class="text-muted ml-1">4/5</h6>
              </div>
            </div>
          </div>
          <div class="image">
            <img src={data.url} width="200" alt="..." />
          </div>
        </div>

        <p>A great option weather you are at office or at home. </p>

        <button class="btn btn-danger" onClick={() => bookRoomHanlder()}>
          Book
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
