import { Box, Button, Container, Grid, Paper, StepContext, Typography } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import randomWords from "random-words";
import { getSession } from "../../localStorage";

const LoginStage3 = () => {
    const navigate = useNavigate();

    const [text, setText] = useState(randomWords({ exactly: 1, maxLength: 15 }));
    const [error, setError] = useState(null);
    var [count, setCount] = useState(1);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios({
            method: 'get',
            url: 'https://us-east1-csci-5410-s22-352404.cloudfunctions.net/Caesar-Cipher?text=' + text + '&userSub=' + getSession().idToken.payload.sub,
        }).then((res) => {
            if (res.data.solution === data.get('caesarKey').toUpperCase()) {
                console.log('Caesar Cipher authentication successful');
                setError(null);

                //Access Details Report
                updateAccessDetails();
            } else {
                setCount(parseInt(count + 1));
                setError('Please try again');

                //Change the challenge text after 3 attempts
                if (count > 3) {
                    setText(randomWords({ exactly: 1, maxLength: 15 }));
                    setError(null);
                    setCount(1);
                }
            }
        });
    }

    //Add an entry in access details report
    const updateAccessDetails = () => {
        const session = getSession();
        console.log({ session });

        const payload = {
            userId: session.idToken.payload.sub,
            email: session.idToken.payload.email,
            action: 'LOGIN',
            timestamp: new Date(session.idToken.payload.auth_time * 1000).toLocaleString('en-GB').replace(',', '')
        }
        console.log({ payload });

        axios({
            method: 'post',
            url: 'https://us-east1-csci-5410-s22-352404.cloudfunctions.net/upload-access-details-v2',
            data: {
                payload: payload
            }
        }).then((res) => {
            console.log({ res });
            navigate('/profile');
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography textAlign={'center'} variant={'h6'}>
                    CAESAR CIPHER
                </Typography>
                <hr />

                <Box component="form" noValidate onSubmit={handleSubmit}>
                    <Grid item xs={12}>
                        <>
                            <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                Apply Caesar Cipher Algorithm to the following text in blue
                            </Typography>
                            <Typography variant="body1" sx={{ textTransform: 'uppercase', color: 'blue', textAlign: 'center' }}>
                                {text}
                            </Typography>
                        </>
                        <input
                            className="form-control"
                            type="text"
                            id="caesarKey"
                            name="caesarKey"
                            required
                            placeholder="Caesar Cipher Text"
                            style={{ margin: "0.75rem 0 0.75rem 0" }}
                        />
                    </Grid>
                    <Typography color="red" variant="body2">{error}</Typography>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            LOGIN
                        </Button>
                    </div>
                </Box>
            </Paper>
        </Container >
    );
}

export default LoginStage3;