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

        console.log(getSession().idToken.payload.sub);
        axios({
            method: 'get',
            url: 'https://zxl63mr6rydydqbnkwbe3ccuzq0cssfg.lambda-url.us-east-1.on.aws?userSub=' + (getSession().idToken.payload.sub),
        }).then((res) => {
            console.log({ res });
            const item = res.data.user.Item;
            if (data.get('answer1') === item.answer1 &&
                data.get('answer2') === item.answer2 &&
                data.get('answer3') === item.answer3) {
                console.log('Security Question and Answers Successful');
                navigate('/caesar-cipher')
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