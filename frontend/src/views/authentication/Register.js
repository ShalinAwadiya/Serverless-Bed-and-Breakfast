import React from "react";
import './Auth.css'
const Register = () => {
  return (
    <div className="main-section">
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="email"
            className="form-control"
            id="name"
            placeholder="Enter name"
            style={{ margin: "0.75rem 0 0.75rem 0" }}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            style={{ margin: "0.75rem 0 0.75rem 0" }}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            style={{ margin: "0.75rem 0 0.75rem 0" }}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            placeholder="Confirm Password"
            style={{ margin: "0.75rem 0 0.75rem 0" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "0.75rem", width: "100%" }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
