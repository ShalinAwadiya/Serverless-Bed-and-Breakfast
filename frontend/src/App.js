import './App.css';
import Navbar from './views/components/navbar/Navbar';
import { Outlet, BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import Profile from './views/Profile/Profile';
import Login from './views/authentication/Login';
import Register from './views/authentication/Register';
import Chatbot from 'react-chatbot-kit'
import RoomBook from './views/Book/RoomBook';
import DisplayAvailability from './views/Book/DisplayAvailability';
import { Authentication } from './views/authentication/AuthContext';
import LoginStage2 from './views/authentication/Login-2';
import { Protected } from './views/authentication/Protected';
import LoginStage3 from './views/authentication/Login-3';

const MainLayout = () => (
  <>
    <Navbar />
    <main>
      <div>
        <Outlet />
        {/* <Chatbot /> */}
      </div>
    </main>
  </>
)

const ProtectedRoutes = () => {
  return (
    <Routes>
      {/* Define routes here that need login */}
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
          <Route element={<MainLayout />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/bookroom' element={<RoomBook />} />
            <Route exact path='/displayroom' element={<DisplayAvailability />} />
            <Route exact path='/security-questions' element={<LoginStage2 />} />
            <Route exact path='/caesar-cipher' element={<LoginStage3 />} />
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
    </BrowserRouter>
  );
}

export default App;
