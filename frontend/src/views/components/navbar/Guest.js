import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authentication/AuthContext';

const Guest = ({ isRegistered, setIsRegistered }) => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    if (isRegistered) {
        return (
            <>
                <Button
                    key='logout'
                    component="a"
                    href="/profile"
                    variant='outlined'
                    sx={{ mr: 5, my: 2, color: 'black', display: 'block', fontSize: 15 }}
                >
                    <CgProfile style={{ "fontSize": "1.7rem" }} />
                </Button>
                <Button
                    key='logout'
                    component="a"
                    variant='outlined'
                    sx={{ my: 2, color: 'black', display: 'block', fontSize: 15 }}
                    onClick={() => {
                        logout()
                        setIsRegistered(false);
                        navigate('/')
                    }}
                >
                    LOGOUT
                </Button>
            </>
        )
    } else {
        return (
            <Button
                key='login'
                component="a"
                variant='outlined'
                sx={{ my: 2, color: 'black', display: 'block', fontSize: 15 }}
                onClick={() => {
                    navigate('/login')
                }}
            >
                LOGIN
            </Button>
        )
    }
}

export default Guest;
