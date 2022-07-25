import React, { useEffect } from "react";
import Header from "./components/Header";
import Services from "./components/Services";
import Support from "../support/Support";
const Home = () => {
  return (
    <>
      <Header />
      <Services />
      <Support />
    </>
  );
};

export default Home;
