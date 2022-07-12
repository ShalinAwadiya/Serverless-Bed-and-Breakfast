import React, {useEffect} from "react";
import {CgProfile} from 'react-icons/cg';
const Guest = ({isRegistered})=>{
    if(isRegistered){
        return(
            <a href="#" style={{"color":"grey"}}>
                <CgProfile style={{"fontSize":"2rem"}}/>   
            </a>
        )
    } else{
        return(
            <a class="btn btn-primary" href="#signup">Sign Up</a>
        )
    }
}

export default Guest;