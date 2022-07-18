import React,{useEffect, useState} from "react";
import {
  Button,
  Container,
  getListItemAvatarUtilityClass,
  Toolbar,
} from "@mui/material";
import Box from "@mui/material/Box";
import UserPool from "../authentication/UserPool";
import {useNavigate} from 'react-router-dom';
import {getEmail} from '../../localStorage/index';

const Profile = () => {
  const [data,setData] = useState([]);
  useEffect(()=>{
      fetch(`https://lffyvdvm5hquei7oi7w37fz44u0efnfp.lambda-url.us-east-1.on.aws/?email=V2Check@dal.ca`,{
        method:'GET'
      }).then(response=>response.json()).then(result=>console.log(result))
  },[])
  
  const navigate = useNavigate()
  const logoutHandler = ()=>{
    const congnitoUser = UserPool.getCurrentUser()
    if(congnitoUser != null){
      congnitoUser.signOut();
      localStorage.removeItem("session");
      localStorage.removeItem("email");
      localStorage.removeItem("user_id");
      console.log("logged out.")
      navigate('/login')
    }
  }

  return (
    <section class="vh-100" style={{ "background-color": "#ddd" }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-12 col-xl-4">
            <div class="card" style={{ "border-radius": "15px" }}>
              <div class="card-body text-center">
                <div class="mt-3 mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    class="rounded-circle img-fluid"
                    style={{ width: "100px" }}
                    alt = "..."
                  />
                </div>
                <h4 class="mb-2">Julie L. Arsenault</h4>
                <Box sx={{ display: { xs: "none", md: "flex", flexGrow: 1 } }}>
                  <Button
                    key="Bot"
                    component="a"
                    variant="outlined"
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontSize: 15,
                    }}
                    onClick={()=>logoutHandler()}
                  >
                    Logout
                  </Button>
                </Box>
                {/* <div class="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <p class="mb-2 h5">8471</p>
                    <p class="text-muted mb-0">Wallets Balance</p>
                  </div>
                  <div class="px-3">
                    <p class="mb-2 h5">8512</p>
                    <p class="text-muted mb-0">Income amounts</p>
                  </div>
                  <div>
                    <p class="mb-2 h5">4751</p>
                    <p class="text-muted mb-0">Total Transactions</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
