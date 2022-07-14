import React, { useEffect, useState } from "react";
import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import Chatbot from "react-chatbot-kit";
import {FiSend} from 'react-icons/fi';
import "./chatbot.css";
const Chat = () => {
  const [data, setData] = useState({});
//   useEffect(() => {
//     fetch(
//       "https://qrwib4asrm354mgmiaofbjxqyq0jifzu.lambda-url.us-east-1.on.aws/?message=Hello&CurrentBot=None&UserId=dhruv",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Content-Length": "147",
//           Connection: "keep-alive",
//           "x-amzn-RequestId": "9d142cb5-81f3-4fb6-a79b-5b002e313d5c",
//           "X-Amzn-Trace-Id":
//             "root=1-62cee054-323272d9694ee1fe02e1e295;sampled=0",
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         console.log("RESULT", result);
//         setData(result);
//       });
//   }, []);
  return (
    <div className="chat">
      {/* <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}/> */}
      <div className="messages"></div>
      <div className="user-input">
        <input type="text" />
        <button type="submit"><FiSend /></button> 
      </div>
    </div>
  );
};

export default Chat;
