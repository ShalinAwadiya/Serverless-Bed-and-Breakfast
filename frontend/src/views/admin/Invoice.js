import { Container, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Invoice = () => {
  const location = useLocation();
  const item = location.state.invoice;
  const index = location.state.index;
  const [total, setTotal] = useState(0);
  useEffect(() => {
    console.log(location.state)
    setTotal(item.totalPrice)
  }, [])
  return (
    <div class="container">
      <p class="my-4 mx-5" style={{ "font-size": "30px" }}>
        Thank for your purchase
      </p>
      <div class="row">
        <Stack direction={'column'} spacing={2}>
          <Stack>
            <Typography>{item.email}</Typography>
          </Stack>
          <Stack>
            <Typography>{item.date}</Typography>
          </Stack>
        </Stack>
        <hr />
        {item.food.map((element) => {
          return (
            <Container maxWidth="xs" sx={{ p: 4 }}>
              <Paper sx={{ p: 2 }}>
                <Stack direction={'column'} spacing={2}>
                  <Stack direction={'row'} spacing={30}> <Stack>
                    <p>{element.name}</p>
                  </Stack>
                    <Stack>
                      <p>${element.price}</p>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Container>
          );
        })}
        <hr />
        <Stack direction={'row'} spacing={10} sx={{ display: 'flex', justifyContent: 'right' }}>
          <Stack>
            <p>Total Cart Price</p>
          </Stack>
          <Stack>
            ${total}
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default Invoice;
