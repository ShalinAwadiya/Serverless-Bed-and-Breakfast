import React, { useEffect, useState } from "react";
// import config from "./config";
// import ActionProvider from "./ActionProvider";
// import MessageParser from "./MessageParser";
// import Chatbot from "react-chatbot-kit";
import {FiSend} from 'react-icons/fi';
import "./chatbot.css";
import Message from "./Message";
const Chat = () => {
  //const url = "https://qrwib4asrm354mgmiaofbjxqyq0jifzu.lambda-url.us-east-1.on.aws/?message=Hello&CurrentBot=None&UserId=dhruv";
  const [message,setMessage] = useState("Hello");
  const [currentBot,setCurrentBot] = useState("None");

  useEffect(() => {
    var url = "https://qrwib4asrm354mgmiaofbjxqyq0jifzu.lambda-url.us-east-1.on.aws/?";
    var finalUrl = url+"message="+message+"&CurrentBot="+currentBot+"&UserId=dhruv";
    fetch(finalUrl,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "Content-Length": "147",
        Connection: "keep-alive",
        "x-amzn-RequestId": "9d142cb5-81f3-4fb6-a79b-5b002e313d5c",
        "X-Amzn-Trace-Id": "root=1-62cee054-323272d9694ee1fe02e1e295;sampled=0",
      }
    }).then(response=>response.json()).then(result=>console.log(result))
    // fetch(
    //   // "https://qrwib4asrm354mgmiaofbjxqyq0jifzu.lambda-url.us-east-1.on.aws/?message=Hello&CurrentBot=None&UserId=dhruv",
    //   {
    //     method: "GET",
    //     headers: {
          // "Content-Type": "application/json",
          // "Content-Length": "147",
          // Connection: "keep-alive",
          // "x-amzn-RequestId": "9d142cb5-81f3-4fb6-a79b-5b002e313d5c",
          // "X-Amzn-Trace-Id":
          //   "root=1-62cee054-323272d9694ee1fe02e1e295;sampled=0",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("RESULT", result);
    //     setData(result);
    //   });
  }, [message]);
  return (
    <div className="chat">
      {/* <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}/> */}
      <div className="messages">
        {
          // messages.map(message=>{
          //   return(
          //     <Message message={message}  />
          //   )
          // })
        }
      </div>
      <div className="user-input">
        <input type="text" placeholder="Enter message" onChange={(e)=>setMessage(e.target.value)} />
        <button type="submit"><FiSend /></button> 
      </div>
    </div>
  );
};

export default Chat;
