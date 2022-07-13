import React, { useState } from "react";
import './Auth.css'
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography, Box, Container } from "@mui/material";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const registration = {
  given_name: {
    required: true
  },
  family_name: {
    required: true
  },
  email: {
    required: true,
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  },
  password: {
    required: true,
    minLength: 8,
    regex: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  },
  answer1: {
    required: true
  },
  answer2: {
    required: true
  },
  answer3: {
    required: true
  },
  caesar_key: {
    required: true
  }
};

const poolData = {
  UserPoolId: "us-east-1_3OS37kCap",
  ClientId: "168i1e0hfjj7nueiul3ikqbe16"
};
const userPool = new CognitoUserPool(poolData);

const Register = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [sub, setSub] = useState('');

  const onFormChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
    validateRegistrationData(event.target.name, event.target.value);
  }

  const validateRegistrationData = (property, value) => {
    let isValid = true;
    if (registration[property] && registration[property].required) {
      setFormErrors({
        ...formErrors,
        [property]: {
          required: (!value || value.trim() === ''),
          valid: false,
          minLength: false,
        }
      });
      isValid = isValid && !(!value || value.trim() === '');
    }

    if (isValid && registration[property] && registration[property].minLength) {
      setFormErrors({
        ...formErrors,
        [property]: {
          required: false,
          valid: false,
          minLength: !!(value.length < registration[property].minLength)
        }
      });
      isValid = isValid && !(value.length < registration[property].minLength);
    }

    if (isValid && registration[property] && registration[property].regex) {
      setFormErrors({
        ...formErrors,
        [property]: {
          required: false,
          valid: !value.match(registration[property].regex),
          minLength: false,
        }
      });
      isValid = isValid && value.match(registration[property].regex);
    }
    return isValid;
  }

  const handleSubmit = async (event) => {
    console.log('here')
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    for (const value in registration) {
      if (!validateRegistrationData(value, data.get(value))) {
        return;
      }
    }

    const UserAttributes = [{
      Name: "email",
      Value: data.get('email'),
    },
    {
      Name: "given_name",
      Value: data.get('given_name'),
    },
    {
      Name: "family_name",
      Value: data.get('family_name'),
    }
    ];

    console.log({ UserAttributes })

    userPool.signUp(data.get('email'), data.get('password'), UserAttributes, null, (err, data) => {
      if (err) {
        console.log({ err })
      } else {
        console.log({ data })
        setSub(data.userSub);
      }
    });

    //Insert user registration details in DynamoDB
    let registration_request = {
      userSub: sub,
      email: data.get('email'),
      answer1: data.get('answer1'),
      answer2: data.get('answer2'),
      answer3: data.get('answer3'),
      caesarKey: data.get('caesar_key'),
    };

    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration_request),
    };

    const postResponse = await fetch(
      "https://gvffgsiagmdonodt6d4zi4cssa0bmuzm.lambda-url.us-east-1.on.aws/",
      requestOptions
    );

    console.log({ postResponse });
  }

  return (
    <Container component="main" maxWidth="xs" sx={{
      marginTop: 4,
      marginBottom: 4
    }}>
      <Typography textAlign={'center'} variant={'h6'}>
        REGISTRATION
      </Typography>
      <hr />

      {/* <div className="form-group"> */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column'
        }}
        component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              id="given_name"
              name="given_name"
              label="First Name"
              required
              fullWidth
              onChange={onFormChange}
            />
            {formErrors?.given_name?.required && <Typography color="red" variant="body2">First name is required!</Typography>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              id="family_name"
              name="family_name"
              label="Last Name"
              required
              fullWidth
              onChange={onFormChange}
            />
            {formErrors?.family_name?.required && <Typography color="red" variant="body2">Last name is required!</Typography>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              id="email"
              name="email"
              label="Email"
              required
              fullWidth
              onChange={onFormChange}
            />
            {formErrors?.email?.required && <Typography color="red" variant="body2">Email is required!</Typography>}
            {formErrors?.email?.valid && <Typography color="red" variant="body2">Email is invalid!</Typography>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              id="password"
              name="password"
              label="Password"
              required
              fullWidth
            />
            {formErrors?.password?.required && <Typography color="red" variant="body2">Password is required!</Typography>}
          </Grid>

          <Grid item xs={12}>
            <Typography textAlign={'center'} variant={'h6'}>
              SECURITY QUESTIONS
            </Typography>
            <hr />
          </Grid>
        </Grid>
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

        <Grid item xs={12}>
          <Typography textAlign={'center'} variant={'h6'}>
            CAESAR CIPHER KEY
          </Typography>
          <hr />
        </Grid>
        <Grid item xs={12}>
          <label for="exampleInputEmail1">Enter a caesar cipher key</label>
          <input
            type="number"
            className="form-control"
            id="caesar_key"
            name="caesar_key"
            placeholder="Caesar Cipher Key"
            style={{ margin: "0.75rem 0 0.75rem 0" }}
          />
        </Grid>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </div>
      </Box>
    </Container >
  );
};

export default Register;
