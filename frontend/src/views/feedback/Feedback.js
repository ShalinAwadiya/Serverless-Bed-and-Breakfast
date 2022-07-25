import React, { useState } from "react";

const Feedback = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const submitHandler = () => {
    fetch(
      `https://3qwyo2v2zndgcc7nszre7ac6c40xphzb.lambda-url.us-east-1.on.aws/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: email,
          feedback,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => console.log(result));
  };
  return (
    <>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Feedback</label>
        <textarea
          class="form-control"
          id="feedback"
          rows="3"
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        onClick={() => submitHandler()}
      >
        Submit
      </button>
    </>
  );
};

export default Feedback;
