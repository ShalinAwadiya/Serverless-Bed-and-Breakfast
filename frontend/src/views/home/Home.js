import React, { useEffect } from "react";
import Header from "./components/Header";
import Services from "./components/Services";
import Support from "../support/Support";
const Home = () => {
  // useEffect(() => {
  //   fetch(
  //     "https://us-east1-serverlessbb.cloudfunctions.net/updateBookingRecords",
  //     {
  //       method: "POST",
  //       headers: {
  //         "access-control-allow-origin": "*",
  //         "content-type": "application/json",
  //         "function-execution-id": "14n2gnrq3ah8",
  //         "X-Cloud-Trace-Context": "3054db186d29f24249a708e576d74187;o=1",
  //         "Content-Encoding": "gzip",
  //         Date: "Thu, 14 Jul 2022 20:22:46 GMT",
  //         Server: "Google Frontend",
  //         "Cache-Control": "private",
  //         "Alt-Svc":
  //           'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
  //         "Transfer-Encoding": "chunked",
  //       },
  //       body: JSON.stringify({
  //         payload: {
  //           bookingId: "111",
  //           customerId: "111",
  //           roomType: "Delux",
  //           bookingDate: "20-12-2021",
  //           bookingDayPeriod: "11",
  //         },
  //       }),
  //     }
  //   )
  //     .then((resp) => resp.json())
  //     .then((result) => {
  //       console.log("DATA", result);
  //     });
  // }, []);
  return (
    <>
      <Header />
      <Services />
          <Support />

    </>
  );
};

export default Home;
