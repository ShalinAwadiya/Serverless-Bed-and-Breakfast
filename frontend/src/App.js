import './App.css';
import Navbar from './views/components/navbar/Navbar';
import {Outlet, BrowserRouter, Route,Routes} from 'react-router-dom';
import Home from './views/home/Home';
import Profile from './views/Profile/Profile';
import Login from './views/authentication/Login';
import Register from './views/authentication/Register';

const MainLayout = () =>(
  <>
  <Navbar />
  <main>
    <div>
      <Outlet />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
