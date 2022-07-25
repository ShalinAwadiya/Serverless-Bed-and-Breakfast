import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Invoices = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      "https://pkb6dynapyezmc3spejz6cd4x40ydcok.lambda-url.us-east-1.on.aws/",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => setData(result.Items));
  }, []);
  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">INVOICE ID</th>
          <th scope="col">EMAIL</th>
          <th scope="col">Invoice</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.Id}</td>
              <td>{item.email}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={() =>
                    navigate("/invoice", {
                      state: { invoice: item, index: index },
                    })
                  }
                >
                  Invoice
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Invoices;
