import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import "./style.css";
function AdminPannel() {
  return (
    <Grid>
      <Grid className="grid-card">
        <Card>
          <CardContent
            sx={{ maxWidth: "70vw", maxHeight: "55vh" }}
            className={"card_seperator"}
          >
            <Typography gutterBottom variant="h5" component="div">
              Booking Data
            </Typography>
            <CardMedia
              align="center"
              component="iframe"
              image="https://datastudio.google.com/embed/reporting/d1f0edb3-56e6-43ab-9e61-b582e07e0242/page/T2yxC"
              width="100vw"
              height="450"
            />
          </CardContent>
        </Card>
      </Grid>
      <Divider className="divider-color"></Divider>
      <Grid className="grid-card">
        <Card>
          <CardContent
            sx={{ maxWidth: "70vw", maxHeight: "55vh" }}
            className={"card_seperator"}
          >
            <Typography gutterBottom variant="h5" component="div">
              Revenue Data
            </Typography>
            <CardMedia
              align="center"
              component="iframe"
              image="https://datastudio.google.com/embed/reporting/465dee35-9fe3-4e3f-a18a-582d7497efd5/page/Nx4xC"
              width="100vw"
              height="450"
            />
          </CardContent>
        </Card>
      </Grid>

      <Divider className="divider-color"></Divider>
      <Grid className="grid-card">
        <Card>
          <CardContent
            sx={{ maxWidth: "70vw", maxHeight: "55vh" }}
            className={"card_seperator"}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              display={"flex"}
              margin={"auto"}
            >
              Login Statistics
            </Typography>
            <CardMedia
              align="center"
              component="iframe"
              image="https://datastudio.google.com/embed/reporting/26925589-1e1c-4af1-ac82-c9a8b8297d6c/page/nAzxC%22"
              width="100vw"
              height="450"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default function Admin() {
  return (
    <>
      <Grid alignContent={"center"} display="flex">
        <h1>Admin Page</h1>
      </Grid>
      <br></br>
      <AdminPannel></AdminPannel>
    </>
  );
}
