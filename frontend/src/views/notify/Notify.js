import React, { useEffect, useState } from "react";
import "./notify.css";
import { getEmail } from "../../localStorage/index";
const Notify = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (getEmail()) {
      fetch(
        `https://xldvx2k4buvuhyy4pawwz2lz2m0gxcvh.lambda-url.us-east-1.on.aws?email=${getEmail()}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result.message);
          setLoad(true);
        });
    }
  }, []);

  if (load) {
    return (
      <div className="notify">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const newDate = new Date(
                parseFloat(item.timeStamp.replace(".", ""))
              );

              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{newDate.toDateString()}</td>
                  <td>{item.message}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default Notify;
