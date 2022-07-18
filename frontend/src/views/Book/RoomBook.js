import React, { useState } from "react";
import "../authentication/Auth.css";
import { useNavigate } from "react-router-dom";
const RoomBook = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState(0);
  const [date, setDate] = useState(new Date());
  const [type,setType] = useState("")
  return (
    <div className="main-section">
      <form>
        {/* <div className="form-group">
          <label for="exampleInputEmail1">Number of Guest</label>
          <input
            type="email"
            className="form-control"
            id="name"
            placeholder="Enter name"
            style={{ margin: "0.75rem 0 0.75rem 0" }}
          />
        </div> */}
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
            <option value="delux">delux</option>
            <option value="semidelux">semidelux</option>
            <option value="skyview">skyview</option>
            <option value="general">general</option>
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
            onChange={(e) => setDate(e.target.value)}
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
