import React from "react";
import '../authentication/Auth.css'
import { useNavigate } from "react-router-dom";
const RoomBook = () => {
  const navigate = useNavigate()
  return (
    <div className="main-section">
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Number of Guest</label>
          <input
            type="email"
            className="form-control"
            id="name"
            placeholder="Enter name"
            style={{ margin: "0.75rem 0 0.75rem 0" }}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Number of Rooms</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            style={{ margin: "0.75rem 0 0.75rem 0" }}
          />
        </div>
        
        <div id="date-picker-example" class="md-form md-outline input-with-post-icon datepicker" inline="true">
            <input placeholder="Select date" type="date" id="example" class="form-control" style={{ margin: "0.75rem 0 0.75rem 0" }} />
            <i class="fas fa-calendar input-prefix"></i>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "0.75rem", width: "100%" }}
            onClick={()=>{
              navigate('/displayroom')
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
