import React, { useState } from "react";
import "../authentication/Auth.css";
import { useNavigate } from "react-router-dom";
const RoomBook = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState(0);
  const [date, setDate] = useState("");
  const [type,setType] = useState("")
  
  
  return (
    <div className="main-section">
      <form>
        
        <div className="form-group">
          <label for="days">Booking Days</label>
          <input
            type="number"
            className="form-control"
            id="days"
            aria-describedby="emailHelp"
            placeholder="number of days of stay"
            style={{ margin: "0.75rem 0 0.75rem 0" }}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="rooms">Type of Room</label>
          <select className="form-select" name="rooms" id="rooms"  onChange={(e)=>setType(e.target.value)}>
            <option>--Select one--</option>
            <option value="delux,200">delux</option>
            <option value="semidelux,150">semidelux</option>
            <option value="skyview,500">skyview</option>
            <option value="general,50">general</option>
          </select>
        </div>

        <div
          id="date-picker-example"
          class="md-form md-outline input-with-post-icon datepicker"
          inline="true"
        >
          <input
            placeholder="Select date"
            type="date"
            id="example"
            class="form-control"
            
            style={{ margin: "0.75rem 0 0.75rem 0" }}
            onChange={(e) =>{
              var newDate = e.target.value.split('-');

              setDate(newDate[2].toString()+"-"+newDate[1].toString()+"-"+newDate[0].toString())
            } }
          />
          <i class="fas fa-calendar input-prefix"></i>
        </div>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "0.75rem", width: "100%" }}
            onClick={() => {
              navigate("/displayroom", { state: { days: days, date: date, type:type } });
              //thisis()
            }}
          >
            Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomBook;
