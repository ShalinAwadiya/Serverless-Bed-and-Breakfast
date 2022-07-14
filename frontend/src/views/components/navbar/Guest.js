import React, { useEffect } from "react";
import { CgProfile } from 'react-icons/cg';
const Guest = ({ isRegistered }) => {
    if (isRegistered) {
        return (
            <a href="/profile" style={{ "color": "grey" }}>
                <CgProfile style={{ "fontSize": "2.5rem" }} />
            </a>
        )
    } else {
        return (
            <a className="btn btn-primary" href="/register">REGISTER</a>
        )
    }
}

export default Guest;