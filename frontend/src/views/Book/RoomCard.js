import React from "react";
import "./Room.css";
import { useNavigate } from "react-router-dom";
import { getEmail } from "../../localStorage";

const RoomCard = ({ data, bookData, price }) => {
  const url = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60";
  const navigate = useNavigate();
  console.log(bookData);
  const bookIdgenerator = () => {
    return Math.floor(Math.random() * 10000);
  };

  const dateFormat = (date) =>{
    var newDate = date.split('-');
    console.log(date);
    return newDate[2].toString()+'-'+newDate[1].toString()+'-'+newDate[0].toString()
  }
  const bookRoomHanlder = () => {
    console.log("started..");
    
    fetch('https://us-central1-authentic-codex-352820.cloudfunctions.net/HotelManagementTopic',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "email":getEmail().toString(), //taking from localstorage
        "roomNo":parseInt(data.room), //from data
        "price": price, // from data
        "bookingDate": bookData.date, // from bookData
        "bookingDays":parseInt(bookData.days), //from bookdata
        "bookingId": parseInt(bookIdgenerator()),
        "RoomType":"delux"
      })
    }).then(response=>response.json()).then(result=>console.log("Result::",result))
    console.log("SESSION:",getEmail())
    navigate("/summary", { state: { data: data, type: "room" } });
  };
  return (
    <div class="height d-flex justify-content-center align-items-center">
      <div class="card p-3">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="mt-2">
            <h4 class="text-uppercase">{data.room}</h4>
            <div class="mt-5">
              <h5 class="text-uppercase mb-0">Beds : 5</h5>
              <h1 class="main-heading mt-0">${price}</h1>
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
            <img src={url} width="200" alt="..." />
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
