import './App.css';
import Navbar from './views/components/navbar/Navbar';
import {Outlet, BrowserRouter, Route,Routes} from 'react-router-dom';
import Home from './views/home/Home';
import Profile from './views/Profile/Profile';
import Login from './views/authentication/Login';
import Register from './views/authentication/Register';
import Chatbot from 'react-chatbot-kit'
import RoomBook from './views/Book/RoomBook';
import DisplayAvailability from './views/Book/DisplayAvailability';

const MainLayout = () =>(
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



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route element={<MainLayout />}>
          <Route exact path='/' element={<Home />} /> 
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/bookroom' element={<RoomBook />} />
          <Route exact path='/displayroom' element={<DisplayAvailability />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
