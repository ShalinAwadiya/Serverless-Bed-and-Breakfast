import React from "react";

const Services = () => {
  return (
    <div style={{ "display": "flex", "justifyContent": "space-evenly" }}>
      <div
        className="card text-center"
        style={{ width: "20%", margin: "2rem" }}
      >
        <img
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
          className="card-img-top"
          alt="..."
          style={{ height: "30vh", maxWidth: "100%", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">Book a Room</h5>
          <p className="card-text">
            View available rooms and book as per your convenience
          </p>
          <a href="/bookroom" className="btn btn-primary" style={{ width: "50%" }}>
            Book
          </a>
        </div>
      </div>
      {/* ======== */}
      <div
        className="card text-center"
        style={{ width: "20%", margin: "2rem" }}
      >
        <img
          src="https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
          className="card-img-top"
          alt="..."
          style={{ height: "30vh", maxWidth: "100%", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">Order Food</h5>
          <p className="card-text">
            Order breakfast from the Kitchen
          </p>
          <a href="/food" className="btn btn-primary" style={{ width: "50%" }}>
            Order
          </a>
        </div>
      </div>
      {/* ============= */}
      <div
        className="card text-center"
        style={{ width: "20%", margin: "2rem" }}
      >
        <img
          src="https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dG91cnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
          className="card-img-top"
          alt="..."
          style={{ height: "30vh", maxWidth: "100%", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">Book a Tour</h5>
          <p className="card-text">
            Request a Tour from the Tour Operator
          </p>
          <a href="/displaytour" className="btn btn-primary" style={{ width: "50%" }}>
            Book
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;
