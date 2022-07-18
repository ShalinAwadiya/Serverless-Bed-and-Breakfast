import React from "react";
import "./support.css";
const Avatar = (props) => {
  return (
    <div style={props.style}>
      <div className="chat-wrapper" onClick={()=> props.onClick && props.onClick()} />
    </div>
  );
};

export default Avatar;
