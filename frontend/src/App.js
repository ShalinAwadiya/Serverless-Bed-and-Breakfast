import './App.css';
import Navbar from './views/components/navbar/Navbar';
import {Outlet, BrowserRouter, Route,Routes} from 'react-router-dom';
import Home from './views/home/Home';
import Profile from './views/Profile/Profile';
import Login from './views/authentication/Login';
import Register from './views/authentication/Register';
import RoomBook from './views/Book/RoomBook';
import DisplayAvailability from './views/Book/DisplayAvailability';
import Summary from './views/Summary/Summary';
import Food from './views/Food/Food';

import Chat from './views/chatbot/Chat';

const MainLayout = () =>(
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



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      
        <Route exact path='/bot' element={<Chat/>} />
        <Route element={<MainLayout />}>
          <Route exact path='/' element={<Home />} /> 
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/bookroom' element={<RoomBook />} />
          <Route exact path='/displayroom' element={<DisplayAvailability />} />
          <Route exact path='/food' element={<Food />} />
          <Route exact path='/summary' element={<Summary type='room ' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
