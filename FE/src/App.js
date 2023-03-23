import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './admin/Components/Product/index.js';
import Register from './user/Components/User/Register';
import Bill from './user/Components/Bill/Bill';
import User from './user/Components/User/User';
import Profiles from './user/Components/Profile/index';
import AddProfile from './user/Components/Profile/AddProfile';
import Login from './user/Components/User/Login';
import Error from './user/Error';
import Cart from './user/Components/Cart/Cart';
import Success from './user/Components/Cart/Success';
import AddUser from './admin/Components/User/AddUser';
// import Icons from './Icons';

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path='/bill' element={<Bill />} />
          <Route path='/user' element={<User />} />
          <Route path="/profile" element={<Profiles />} />
          <Route path='/editProfile' element={<AddProfile />} />
          <Route path='*' element={<Error />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/success' element={<Success />} />
          <Route path='/adduser' element={<AddUser />} />
        </Routes>
      </BrowserRouter>
      {/* <Icons/> */}
    </>
  )
}

export default App