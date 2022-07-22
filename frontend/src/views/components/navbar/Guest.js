import { Button } from "@mui/material";
import React from "react";
import { CgProfile } from 'react-icons/cg';
const Guest = ({ isRegistered }) => {
    return (
        isRegistered
            ?
            <a href="/profile" style={{ "color": "grey" }}>
                <CgProfile style={{ "fontSize": "2.5rem" }} />
            </a>
            :
            <Button
                key="login"
                component="a"
                href='/login'
                variant='outlined'
                sx={{ my: 2, color: 'black', display: 'block', fontSize: 15 }}
            >
                LOGIN
            </Button>
    )
}
export default Guest;