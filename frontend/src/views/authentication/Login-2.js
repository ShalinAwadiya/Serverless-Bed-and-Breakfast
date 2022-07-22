import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { getSession } from "../../localStorage";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginStage2 = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        //Call the validateSecurityAnswers Lambda
        axios({
            method: 'get',
            url: 'https://xn2s5fwwbmnucawsewwwbrymxi0bwkio.lambda-url.us-east-1.on.aws/?'
                + 'userSub=' + getSession().idToken.payload.sub
                + '&answer1=' + data.get('answer1')
                + '&answer2=' + data.get('answer2')
                + '&answer3=' + data.get('answer3')
        }).then((res) => {
            console.log({ res });
            if (Boolean(res.data.validated) === Boolean(true)) {
                navigate('/caesar-cipher');
            } else {
                setError('Some of the answers might be incorrect. Please recheck your answers.');
            }
        });
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 2 }}>
            <Typography textAlign={'center'} variant={'h6'}>
                SECURITY QUESTIONS AND ANSWERS
            </Typography>
            <hr />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
                component="form" noValidate onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <label>What is the name of your favorite color?</label>
                    <input
                        className="form-control"
                        type="text"
                        id="answer1"
                        name="answer1"
                        required
                        placeholder="Favorite Color"
                        style={{ margin: "0.75rem 0 0.75rem 0" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <label>Who is your role model?</label>
                    <input
                        className="form-control"
                        type="text"
                        id="answer2"
                        name="answer2"
                        required
                        placeholder="Role Model"
                        style={{ margin: "0.75rem 0 0.75rem 0" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <label>Who is your favorite player?</label>
                    <input
                        className="form-control"
                        type="text"
                        id="answer3"
                        name="answer3"
                        required
                        placeholder="Favorite Player"
                        style={{ margin: "0.75rem 0 0.75rem 0" }}
                    />
                </Grid>
                <Typography color="red" variant="body2">{error}</Typography>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        NEXT
                    </Button>
                </div>
            </Box>
        </Container >
    );
}

export default LoginStage2;