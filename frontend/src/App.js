import './App.css';
import Navbar from './views/components/navbar/Navbar';
import { Outlet, BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import Profile from './views/Profile/Profile';
import Login from './views/authentication/Login';
import Register from './views/authentication/Register';
import RoomBook from './views/Book/RoomBook';
import DisplayAvailability from './views/Book/DisplayAvailability';
import { Authentication } from './views/authentication/AuthContext';
import LoginStage2 from './views/authentication/Login-2';
import { Protected } from './views/authentication/Protected';
import LoginStage3 from './views/authentication/Login-3';
import Summary from './views/Summary/Summary';
import Food from './views/Food/Food';
import Admin from './views/admin/adminPage';
import Cart from "./views/Food/Cart";
import DisplayTour from './views/tour/DisplayTour';
import Notify from './views/notify/Notify';
import Invoices from './views/admin/Invoices';
import AdminNav from './views/admin/Admin';
import Invoice from './views/admin/Invoice';
import DisplayFeedback from './views/admin/DisplayFeedback';
import Feedback from './views/feedback/Feedback';
const MainLayout = () => (
  <>
    <div className="App">
      <Navbar />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  </>
)

const AdminLayout = () => (
  <>
    <div className="App">
      <AdminNav />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  </>
)

const ProtectedRoutes = () => {
  return (
    <Routes>
      {/* Define routes here that need login */}
      <Route exact path='/food' element={<Food />} />
      <Route exact path='/food-cart' element={<Cart />} />
      <Route exact path="/displaytour" element={<DisplayTour />}></Route>
      <Route exact path="/feedback" element={<Feedback />}></Route>
      <Route exact path='/notify' element={<Notify />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Authentication>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route element={<AdminLayout />} >
            <Route exact path='/invoices' element={<Invoices />} />
            <Route exact path='/charts' element={<Admin />} />
            <Route exact path='/invoice' element={<Invoice />} />
            <Route exact path='/dfeedback' element={<DisplayFeedback />} />
          </Route>

          {/* <Route exact path='/bot' element={<ChatSupport />} />  */}
          <Route element={<MainLayout />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/displayroom' element={<DisplayAvailability />} />
            <Route exact path='/security-questions' element={<LoginStage2 />} />
            <Route exact path='/caesar-cipher' element={<LoginStage3 />} />
            <Route exact path='/summary' element={<Summary type='room ' />} />
            <Route exact path='/bookroom' element={<RoomBook />} />

            {/* Routes that require login */}
            <Route
              path="*"
              element={
                <Protected>
                  <ProtectedRoutes />
                </Protected>
              }
            />
          </Route>
        </Routes>
      </Authentication>
    </BrowserRouter >
  );
}

export default App;
