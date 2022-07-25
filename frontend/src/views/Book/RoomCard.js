import React from "react";
import "./Room.css";
import { useNavigate } from "react-router-dom";
import { getEmail } from "../../localStorage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RoomCard = ({ data, bookData, price }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const yesHandler = () => {
    navigate("/displaytour", { state: { bookData: bookData } });
  };
  const noHandler = () => {
    navigate("/summary");
  };
  const url =
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60";
  const navigate = useNavigate();
  const bookIdgenerator = () => {
    return Math.floor(Math.random() * 10000);
  };

  const dateFormat = (date) => {
    var newDate = date.split("-");
    return (
      newDate[2].toString() +
      "-" +
      newDate[1].toString() +
      "-" +
      newDate[0].toString()
    );
  };
  const bookRoomHanlder = () => {
    handleOpen();
    fetch(
      "https://us-central1-authentic-codex-352820.cloudfunctions.net/HotelManagementTopic",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: getEmail().toString(), //taking from localstorage
          roomNo: parseInt(data.room), //from data
          price: price, // from data
          bookingDate: bookData.date, // from bookData
          bookingDays: parseInt(bookData.days), //from bookdata
          bookingId: parseInt(bookIdgenerator()),
          RoomType: bookData.type,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => console.log("Result::", result));
    //navigate("/summary", { state: { data: data, type: "room" } });
  };
  return (
    <div class="height d-flex justify-content-center align-items-center">
      <div class="card p-3">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="mt-2">
            <h4 class="text-uppercase">{data.room}</h4>
            <div class="mt-5">
              <h5 class="text-uppercase mb-0">Beds : 5</h5>
              <h1 class="main-heading mt-0">${price}</h1>
              <div class="d-flex flex-row user-ratings">
                <div class="ratings">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>
                <h6 class="text-muted ml-1">4/5</h6>
              </div>
            </div>
          </div>
          <div class="image">
            <img src={url} width="200" alt="..." />
          </div>
        </div>

        <p>A great option weather you are at office or at home. </p>
        {/* () => bookRoomHanlder() */}
        <button class="btn btn-danger" onClick={() => bookRoomHanlder()}>
          Book
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Do you want to book a tour?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button variant="outlined" onClick={() => yesHandler()}>
                Yes
              </Button>
              <Button variant="outlined" onClick={() => noHandler()}>
                No
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default RoomCard;
