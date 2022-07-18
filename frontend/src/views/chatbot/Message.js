import React,{useEffect} from "react";
import './chatbot.css';
const Message = ({ message })=>{
    
    return(
        <div className="message-box">
            <p>{message}</p>
        </div>
    )
}

export default Message;