import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import UserPool from "./UserPool";

const registration = {
  given_name: {
    required: true,
  },
  family_name: {
    required: true,
  },
  email: {
    required: true,
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  password: {
    required: true,
    minLength: 8,
    regex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/,
  },
  answer1: {
    required: true,
  },
  answer2: {
    required: true,
  },
  answer3: {
    required: true,
  },
  caesar_key: {
    required: true,
  },
};

const Register = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const onFormChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    validateRegistrationData(event.target.name, event.target.value);
  };

  const validateRegistrationData = (property, value) => {
    let isValid = true;
    if (registration[property] && registration[property].required) {
      setFormErrors({
        ...formErrors,
        [property]: {
          required: !value || value.trim() === "",
          valid: false,
          minLength: false,
        },
      });
      isValid = isValid && !(!value || value.trim() === "");
    }

    if (isValid && registration[property] && registration[property].minLength) {
      setFormErrors({
        ...formErrors,
        [property]: {
          required: false,
          valid: false,
          minLength: value.length < registration[property].minLength,
        },
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
        },
      });
      isValid = isValid && value.match(registration[property].regex);
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    for (const value in registration) {
      if (!validateRegistrationData(value, formData.get(value))) {
        return;
      }
    }

    const UserAttributes = [
      {
        Name: "email",
        Value: formData.get("email"),
      },
      {
        Name: "given_name",
        Value: formData.get("given_name"),
      },
      {
        Name: "family_name",
        Value: formData.get("family_name"),
      },
    ];

    console.log({ UserAttributes });

    UserPool.signUp(
      formData.get("email"),
      formData.get("password"),
      UserAttributes,
      null,
      async (err, data) => {
        if (err) {
          console.log({ err });
        } else {
          console.log({ data });
          //Insert user registration details in DynamoDB
          let registration_request_AWS = {
            userSub: data.userSub,
            email: formData.get("email"),
            answer1: formData.get("answer1"),
            answer2: formData.get("answer2"),
            answer3: formData.get("answer3"),
          };

          let requestOptionsAWS = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registration_request_AWS),
          };

          const postResponseAWS = await fetch(
            "https://jj26hhy7hq67n4juo64ogoow7i0nxbiu.lambda-url.us-east-1.on.aws/",
            requestOptionsAWS
          );
          //Insert user registration details in Fire Store
          let registration_request_GCP = {
            userSub: data.userSub,
            caesarKey: formData.get("caesar_key"),
          };

          let requestOptionsGCP = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registration_request_GCP),
          };
          const postResponseGCP = await fetch(
            "https://us-east1-csci-5410-s22-352404.cloudfunctions.net/registration",
            requestOptionsGCP
          );
          if (postResponseAWS && postResponseGCP) {
            navigate("/login");
          }
          console.log({ postResponseAWS });
          console.log({ postResponseGCP });
        }
      }
    );
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      <Paper sx={{ p: 2, mt: 2, borderBlockColor: "blue", border: 1 }}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
          }}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography
              textAlign={"center"}
              variant={"h6"}
              sx={{ backgroundColor: "lightblue" }}
            >
              REGISTRATION
            </Typography>
            <hr />
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
                {formErrors?.given_name?.required && (
                  <Typography color="red" variant="body2">
                    First name is required!
                  </Typography>
                )}
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
                {formErrors?.family_name?.required && (
                  <Typography color="red" variant="body2">
                    Last name is required!
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  required
                  fullWidth
                  onChange={onFormChange}
                />
                {formErrors?.email?.required && (
                  <Typography color="red" variant="body2">
                    Email is required!
                  </Typography>
                )}
                {formErrors?.email?.valid && (
                  <Typography color="red" variant="body2">
                    Email is invalid!
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  required
                  fullWidth
                  onChange={onFormChange}
                />
                {formErrors?.password?.required && (
                  <Typography color="red" variant="body2">
                    Password is required!
                  </Typography>
                )}
                {formErrors?.password?.valid && (
                  <Typography color="red" variant="body2">
                    Password must contain numbers, special characters, uppercase
                    letters and lowercase letters
                  </Typography>
                )}
                {formErrors?.password?.minLength && (
                  <Typography color="red" variant="body2">
                    Password length must be 8 characters
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 2, mt: 2 }}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography
                  textAlign={"center"}
                  variant={"h6"}
                  sx={{ backgroundColor: "lightblue" }}
                >
                  SECURITY QUESTIONS
                </Typography>
                <hr />
              </Grid>
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
          </Paper>

          <Paper sx={{ p: 2, mt: 2 }}>
            <Grid item xs={12}>
              <Typography
                textAlign={"center"}
                variant={"h6"}
                sx={{ backgroundColor: "lightblue" }}
              >
                CAESAR CIPHER KEY
              </Typography>
              <hr />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="exampleInputEmail1">
                Enter a caesar cipher key
              </label>
              <input
                type="number"
                className="form-control"
                id="caesar_key"
                name="caesar_key"
                placeholder="Caesar Cipher Key"
                style={{ margin: "0.75rem 0 0.75rem 0" }}
              />
            </Grid>
          </Paper>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </div>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
