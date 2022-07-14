import React, { useEffect } from "react";
import Header from "./components/Header";
import Services from "./components/Services";

const Home = () => {
  useEffect(() => {
    fetch(
      "https://qrwib4asrm354mgmiaofbjxqyq0jifzu.lambda-url.us-east-1.on.aws/?message=Hello&CurrentBot=None&UserId=dhruv",
      {
        method: "GET",
        headers: {
          // 'Access-Control-Allow-Origin':'*',
          // 'Access-Control-Allow-Credentials':'true',
          // 'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT',
          // 'Access-Control-Allow-Headers':'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
          "Content-Type": "application/json",
          "Content-Length": "147",
          "Connection": "keep-alive",
          "x-amzn-RequestId": "9d142cb5-81f3-4fb6-a79b-5b002e313d5c",
          "X-Amzn-Trace-Id":
            "root=1-62cee054-323272d9694ee1fe02e1e295;sampled=0",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("RESULT", result);
      });
  }, []);
  return (
    <>
      <Header />
      <Services />
    </>
  );
};

export default Home;
