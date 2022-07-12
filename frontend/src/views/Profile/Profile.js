import React from "react";

const Profile = () => {
  return (
    <section class="vh-100" style={{"background-color": "#ddd"}}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-12 col-xl-4">
            <div class="card" style={{"border-radius": "15px"}}>
              <div class="card-body text-center">
                <div class="mt-3 mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    class="rounded-circle img-fluid"
                    style={{"width": "100px"}}
                  />
                </div>
                <h4 class="mb-2">Julie L. Arsenault</h4>
                {/* <p class="text-muted mb-4">
                  @Programmer <span class="mx-2">|</span>{" "}
                  <a href="#!">mdbootstrap.com</a>
                </p>  */}
                {/* <div class="mb-4 pb-2">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-floating"
                  >
                    <i class="fab fa-facebook-f fa-lg"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-floating"
                  >
                    <i class="fab fa-twitter fa-lg"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-floating"
                  >
                    <i class="fab fa-skype fa-lg"></i>
                  </button>
                </div> */}
               
                <div class="d-flex justify-content-between text-center mt-5 mb-2">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
