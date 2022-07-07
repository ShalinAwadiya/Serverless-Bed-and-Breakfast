import React from "react";
import { data } from "./Registration";

const Profile = () => {
  return (
    <span>
      <br />
      First Name:{data.FIRST_NAME}
      <br />
      Last Name:{data.LAST_NAME}
      <br />
      Email:{data.EMAIL}
      <br />
    </span>
  );
};
export default Profile;
