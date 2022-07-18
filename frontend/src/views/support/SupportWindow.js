import React from "react";
import './support.css';
import ChatSupport from "./ChatSupport";
// import { Scrollbars } from 'react-custom-scrollbars';
const SupportWindow = (props)=>{
    return(
        // <Scrollbars style={{ width: 500, height: 300 }}>
        <div className="support-window" style={{ 'opacity': props.visible? '1':'0'}}>
            <ChatSupport />
        </div>
        // </Scrollbars>
    )
}

export default SupportWindow;