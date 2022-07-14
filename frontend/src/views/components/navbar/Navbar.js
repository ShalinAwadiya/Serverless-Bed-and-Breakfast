import React from "react";
import '../../../assets/css/styles.css'
import Guest from "./Guest";
const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light static-top">
      <div className="container">
        <a className="navbar-brand" href="/">Bed & Breakfast</a>
        <Guest isRegistered={false} />
      </div>
    </nav>
  );
};

export default Navbar;
