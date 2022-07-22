import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { CgProfile } from 'react-icons/cg';
import {useNavigate} from 'react-router-dom';
const Guest = ({ isRegistered }) => {
    const navigate = useNavigate();
    if (isRegistered) {
        return (
            <a href="/profile" style={{ "color": "grey" }}>
                <CgProfile style={{ "fontSize": "2.5rem" }} />
            </a>
        )
    } else {
        return (
            // <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button
                    key='Bot'
                    component="a"
                    variant='outlined'
                    sx={{ my: 2, color: 'black', display: 'block', fontSize: 15 }}
                    onClick={()=>{
                        navigate('/login')
                    }}
                >
                    LOGIN
                </Button>
            // </Box>
        )
    }
}

export default Guest;