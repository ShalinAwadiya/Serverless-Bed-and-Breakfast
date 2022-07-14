import React from "react";
import '../../../assets/css/styles.css'
import Guest from "./Guest";
const Navbar = () => {
  return (
  
        <nav class="navbar navbar-light bg-light static-top">
            <div class="container">
                <a class="navbar-brand" href="/">Bed & Breakfast</a>
                <a class="navbar-brand" href="/bot">Chatbot</a>
              
                <Guest isRegistered={false} />
            </div>
        </nav>
  );
};

export default Navbar;
