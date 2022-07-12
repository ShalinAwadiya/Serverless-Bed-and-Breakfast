import './App.css';
import Navbar from './views/components/navbar/Navbar';
import {Outlet, BrowserRouter, Route,Routes} from 'react-router-dom';
import Home from './views/home/Home';

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
        <Route element={<MainLayout />}>
          <Route exact path='/' element={<Home />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
