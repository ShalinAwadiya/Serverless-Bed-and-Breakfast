import './Auth.css';
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { getSession, setSession } from '../../localStorage';

const Login = () => {
  const navigate = useNavigate();
  const { authenticate } = useContext(AuthContext)
  const [error, setError] = React.useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    authenticate(data.get('email'), data.get('password'))
      .then(CognitoUserSession => {
        setSession(CognitoUserSession);
        console.log(getSession());
        if (getSession().idToken.payload.email === 'admin@dal.ca') {
          navigate('/charts')
        } else {
          navigate('/security-questions')
        }
      })
      .catch(err => {
        setError(err.message)
        console.error('Failed to login!!!', err)
      })
  };

  return (
    <div className="main-section">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          type="text"
          id="email"
          name="email"
          label="Email"
          required
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          type="password"
          id="password"
          name="password"
          label="Password"
          required
          fullWidth
          sx={{ mt: 2 }}
        />
        <Typography color="red" variant="body2" sx={{ mt: 1 }}>{error}</Typography>

        <Grid item>
          <Link href="/register" variant="body2">
            {"Don't have an account? Register"}
          </Link>
        </Grid>

        <div style={{ "display": "flex", "justifyContent": "space-evenly" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
          >
            NEXT
          </Button>
        </div>
      </Box>
    </div >
  );
};

export default Login;
