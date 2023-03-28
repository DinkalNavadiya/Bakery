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
import { injectStyle } from "react-toastify/dist/inject-style";
import Order from './user/Components/Bill/Order';
import Code from './user/Components/User/verfiy.js';
import Password from './user/Components/User/ChangePass';

const App = () => {
  injectStyle()
  return (
    <>
      <ToastContainer
        autoClose={3000}
      />
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
          <Route path='/order' element={<Order />} />
          <Route path="/verify" element={<Code />} />
          <Route path='/password' element={<Password />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App