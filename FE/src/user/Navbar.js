import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../Contexts/authContext';
import { Badges } from '../Graphql/Cart';
import Google from './Components/User/Google';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate()
  const onLogout = () => {
    logout();
    navigate('/');
  }
  // const [quantityId, setQuantityId] = useState(0);
  const UserData = JSON.parse(localStorage.getItem("UserData"))
  const error = () => {
    toast("Login to see your order")
  }
  const [totalCart, setTotalCart] = useState('')
  const { data: badge } = useQuery(Badges
    , {
      variables: { userId: UserData?.id }, onCompleted: () => setTotalCart(badge?.Badge?.count)
    }
  )

  return (
    <>
      <div key="">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="navbar-brand">🍞 Bakery</div>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link>About</Link></li>
              {user ?
                // <li><Link to="/bill">Orders</Link></li> 
                <>
                  {UserData?.role === "admin" || UserData?.role === "superAdmin" ? <li><Link to="/orders">Orders</Link></li> : <li><Link to="/bill">Order</Link></li>}
                </>
                :
                <li onClick={error}><a href='#'>Orders</a></li>}
              {UserData?.role === "admin" || UserData?.role === "superAdmin" ? <li><Link to="/user">Account</Link></li> : null}
              <li><Link to="/subscription">Subscription</Link></li>
            </ul>
            <ul className="nav navbar-nav">
              {user ?
                <>
                  <label className="cart-btn">
                    <Link to="/cart"> <i className="fa fa-shopping-cart"></i></Link>
                    <span className='badge badge-warning' id='lblCartCount'>{totalCart}</span>
                  </label>
                  {/* <ItemContext.Provider value={{ cartSelectedId, cartSetSelectedId, quantityId, setQuantityId }}>
                    <Cart />
                  </ItemContext.Provider> */}
                  <input className="prf-btn" type="checkbox" />
                  <label htmlFor="prf-btn">
                    <Link to="/profile">
                      <i className="fa fa-user-circle" />
                    </Link>
                  </label>
                  <button className='btn btn-outline-success' type='submit' onClick={onLogout}>
                    Logout
                  </button>
                </>
                :
                <>
                  <li className='right'>
                    <button className="btn btn-outline-success m-1" type="submit"><Link to="/login">Login</Link></button>
                  </li>
                  <li>
                    <button className="btn btn-outline-success m-1" type="submit"><Link to="/register">Signup</Link></button>
                  </li>
                  <li><Google /></li>
                </>
              }
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
