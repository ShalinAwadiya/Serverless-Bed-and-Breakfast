import React, { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import { CognitoUserPool } from "amazon-cognito-identity-js";
let data = {};

const Registration = () => {
  const [nameError, setnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ques1, setques1] = useState("");
  const [ques2, setques2] = useState("");
  const [ques3, setques3] = useState("");

  const poolData = {
    UserPoolId: "us-east-1_2HN2aV7XN",
    ClientId: "1qbtml9gmqclhmic14lp6g0nec",
  };
  const userPool = new CognitoUserPool(poolData);

  let navigate = useNavigate();

  const nameChangeHandler = (event) => {
    setname(event.target.value);
  };
  const ques1ChangeHandler = (event) => {
    setques1(event.target.value);
  };
  const ques2ChangeHandler = (event) => {
    setques2(event.target.value);
  };
  const ques3ChangeHandler = (event) => {
    setques3(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let nameCheck = !/[^a-zA-Z]/.test(name);
    if (nameCheck === false) {
      console.log("First Name in check");
      setnameError("Please enter only letters.");
    } else {
      if (name === "") {
        nameCheck = false;
        console.log("First Name in check");
        setnameError("Please enter only letters.");
      } else {
        setnameError("");
        console.log("First Name validated.");
      }
    }

    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    if (emailCheck === false) {
      console.log("Email in check");
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
      console.log("Email validated.");
    }

    const passwordCheck =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    if (passwordCheck === false) {
      console.log("Password in check");
      setPasswordError(
        "At least 8 characters with one upper, lower,number and special character."
      );
    } else {
      setPasswordError("");
      console.log("Password validated.");
    }

    if (password !== confirmPassword) {
      console.log("Confirm Password in check.");
      setConfirmPasswordError("Passwords must match.");
    } else {
      setConfirmPasswordError("");
      console.log("Confirm password Validated");
    }
    if (
      nameCheck &&
      emailCheck &&
      passwordCheck &&
      password === confirmPassword
    ) {
      console.log("All fields validated.");
      console.log(ques1, ques2, ques3);
      userPool.signUp(email, password, [], null, (error, data) => {
        if (error) console.error(error);
        console.log(data);
      });
      let register_info = {
        email: email,
        ans1: ques1,
        ans2: ques2,
        ans3: ques3,
      };
      let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(register_info),
      };
      const postResponse = await fetch(
        "https://tsmo2zazrd72otu3zc7t4x35eq0jujkg.lambda-url.us-east-1.on.aws/",
        requestOptions
      );
      const result = await postResponse.json();
      console.log("Result", result);
      navigate("/profile");
    }
  };

  return (
    <div className="form-center">
      <label className="label1 heading">Registration Page</label>
      <form onSubmit={submitHandler}>
        <table>
          <tbody>
            <tr>
              <td align="right">
                <label className="fonts" htmlFor="name">
                  Name:
                </label>
                <br />
                <br />
              </td>
              <td>
                <input
                  className="input1"
                  type="text"
                  id="fname"
                  name="fname"
                  onChange={nameChangeHandler}
                  style={{ fontStyle: "italic" }}
                  placeholder="Enter First Name"
                />
                <br />
                <span className="Error" style={{ fontSize: "10px" }}>
                  {nameError}
                </span>
                <br />
              </td>
            </tr>

            <tr>
              <td align="right">
                <label className="fonts" htmlFor="email">
                  Email:
                </label>
                <br />
                <br />
              </td>
              <td>
                <input
                  className="input1"
                  type="text"
                  id="fname"
                  name="fname"
                  onChange={emailChangeHandler}
                  style={{ fontStyle: "italic" }}
                  placeholder="Enter Email"
                />
                <br />
                <span className="Error" style={{ fontSize: "10px" }}>
                  {emailError}
                </span>
                <br />
              </td>
            </tr>
            <tr>
              <td>
                <label className="fonts" htmlFor="subject">
                  Password:
                </label>
                <br />
                <br />
              </td>
              <td>
                <input
                  className="input1"
                  type="password"
                  id="fname"
                  name="fname"
                  onChange={passwordChangeHandler}
                  style={{ fontStyle: "italic" }}
                  placeholder="Enter Password"
                />
                <br />
                <span className="Error" style={{ fontSize: "10px" }}>
                  {passwordError}
                </span>
                <br />
              </td>
            </tr>
            <tr>
              <td>
                <label className="fonts" htmlFor="subject">
                  Confirm:
                </label>
                <br />
                <br />
              </td>
              <td>
                <input
                  className="input1"
                  type="password"
                  id="fname"
                  name="fname"
                  onChange={confirmPasswordChangeHandler}
                  style={{ fontStyle: "italic" }}
                  placeholder="Enter Confirm Password"
                />
                <br />
                <span className="Error" style={{ fontSize: "10px" }}>
                  {confirmPasswordError}
                </span>
                <br />
              </td>
            </tr>
            <tr>
              <td align="right">
                <label className="fonts" htmlFor="name">
                  Mother?:
                </label>
                <br />
                <br />
              </td>
              <td>
                <input
                  className="input1"
                  type="text"
                  id="fname"
                  name="fname"
                  onChange={ques1ChangeHandler}
                  style={{ fontStyle: "italic" }}
                  placeholder="Enter First Name"
                />
                <br />
                <span className="Error" style={{ fontSize: "10px" }}>
                  {nameError}
                </span>
                <br />
              </td>
            </tr>
            <tr>
              <td align="right">
                <label className="fonts" htmlFor="name">
                  Father?:
                </label>
                <br />
                <br />
              </td>
              <td>
                <input
                  className="input1"
                  type="text"
                  id="fname"
                  name="fname"
                  onChange={ques2ChangeHandler}
                  style={{ fontStyle: "italic" }}
                  placeholder="Enter First Name"
                />
                <br />
                <span className="Error" style={{ fontSize: "10px" }}>
                  {nameError}
                </span>
                <br />
              </td>
            </tr>
            <tr>
              <td align="right">
                <label className="fonts" htmlFor="name">
                  City?:
                </label>
                <br />
                <br />
              </td>
              <td>
                <input
                  className="input1"
                  type="text"
                  id="fname"
                  name="fname"
                  onChange={ques3ChangeHandler}
                  style={{ fontStyle: "italic" }}
                  placeholder="Enter First Name"
                />
                <br />
                <span className="Error" style={{ fontSize: "10px" }}>
                  {nameError}
                </span>
                <br />
              </td>
            </tr>

            <tr align="left">
              <td></td>
              <td>
                <button
                  type="submit"
                  className="fonts"
                  style={{
                    backgroundColor: "rgb(95, 148, 241)",
                    color: "white",
                  }}
                  value="Submit"
                >
                  Submit
                </button>
                &nbsp;
                <button type="cancel" className="fonts" value="Cancel">
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export { Registration, data };
